#!/bin/bash

# ============================================
# Database Dump Summary & Comparison
# ============================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Database Dump Summary${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# ============================================
# LOCAL DATABASE
# ============================================
echo -e "${BLUE}=== LOCAL DATABASE ===${NC}"
echo ""

if [ -f "dump.sql" ]; then
    echo -e "${GREEN}✓ Local dump file exists: dump.sql${NC}"
    
    FILE_SIZE=$(stat -f%z "dump.sql" 2>/dev/null || stat -c%s "dump.sql" 2>/dev/null)
    
    if [ $FILE_SIZE -gt 1048576 ]; then
        SIZE_MB=$(echo "scale=2; $FILE_SIZE / 1048576" | bc)
        echo -e "  Size: ${SIZE_MB} MB"
    elif [ $FILE_SIZE -gt 1024 ]; then
        SIZE_KB=$(echo "scale=2; $FILE_SIZE / 1024" | bc)
        echo -e "  Size: ${SIZE_KB} KB"
    else
        echo -e "  Size: ${FILE_SIZE} bytes"
    fi
    
    TABLES=$(grep -c "CREATE TABLE" "dump.sql" || echo "0")
    SEQUENCES=$(grep -c "CREATE SEQUENCE" "dump.sql" || echo "0")
    INDEXES=$(grep -c "CREATE INDEX" "dump.sql" || echo "0")
    DATA_COPIES=$(grep -c "^COPY public\." "dump.sql" || echo "0")
    
    echo -e "  Tables: ${TABLES}"
    echo -e "  Sequences: ${SEQUENCES}"
    echo -e "  Indexes: ${INDEXES}"
    echo -e "  Data sections: ${DATA_COPIES}"
    
    # Show some table names
    echo -e "${YELLOW}  Sample tables:${NC}"
    grep "CREATE TABLE" "dump.sql" | sed 's/CREATE TABLE /  - /' | sed 's/ ($//' | head -10
    
else
    echo -e "${RED}✗ Local dump file not found${NC}"
fi

echo ""

# ============================================
# REMOTE DATABASE
# ============================================
echo -e "${BLUE}=== REMOTE DATABASE ===${NC}"
echo ""

REMOTE_USER="neurosus"
REMOTE_HOST="100.68.50.41"
REMOTE_PATH="dental-app"

echo -e "${YELLOW}Checking remote database...${NC}"

ssh ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_PATH} && bash -s" << 'ENDSSH'
#!/bin/bash

CONTAINER=$(docker ps --filter "ancestor=postgres:16-alpine" --format "{{.Names}}" | head -1)

if [ -z "$CONTAINER" ]; then
    CONTAINER=$(docker ps --filter "name=postgres" --format "{{.Names}}" | head -1)
fi

if [ -z "$CONTAINER" ]; then
    echo "✗ No PostgreSQL container found"
    exit 1
fi

DB_NAME=$(docker exec $CONTAINER printenv POSTGRES_DB 2>/dev/null || echo "dental_cms_strapi")
DB_USER=$(docker exec $CONTAINER printenv POSTGRES_USER 2>/dev/null || echo "postgres")

echo "Container: $CONTAINER"
echo "Database: $DB_NAME"

# Count tables
TABLE_COUNT=$(docker exec $CONTAINER psql -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | tr -d ' ')

echo "Tables: $TABLE_COUNT"

if [ "$TABLE_COUNT" -gt "0" ]; then
    echo "Sample tables:"
    docker exec $CONTAINER psql -U $DB_USER -d $DB_NAME -t -c "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename LIMIT 10;" 2>/dev/null | sed 's/^/  - /'
fi

# Check if dump file exists
if [ -f "dump-remote.sql" ]; then
    FILE_SIZE=$(stat -c%s "dump-remote.sql" 2>/dev/null)
    echo ""
    echo "Remote dump file: dump-remote.sql"
    echo "  Size: $FILE_SIZE bytes"
fi

ENDSSH

echo ""
echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

if [ -f "dump.sql" ]; then
    echo -e "${GREEN}✓ Local database dumped successfully${NC}"
    echo -e "  File: dump.sql"
    echo -e "  Contains: $(grep -c "CREATE TABLE" "dump.sql" || echo "0") tables with data"
else
    echo -e "${RED}✗ Local database dump missing${NC}"
fi

echo ""
echo -e "${YELLOW}Note: Remote database appears to be empty or initializing.${NC}"
echo -e "${YELLOW}The Strapi container may still be setting up the schema.${NC}"
echo ""
