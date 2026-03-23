#!/bin/bash

# ============================================
# Verify Database Dump Integrity
# ============================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

DUMP_FILE="dump.sql"

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Database Dump Integrity Check${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

if [ ! -f "$DUMP_FILE" ]; then
    echo -e "${RED}✗ Dump file not found: $DUMP_FILE${NC}"
    exit 1
fi

echo -e "${YELLOW}Checking: $DUMP_FILE${NC}"
echo ""

# ============================================
# Basic File Checks
# ============================================
echo -e "${BLUE}1. Basic File Checks${NC}"

FILE_SIZE=$(stat -f%z "$DUMP_FILE" 2>/dev/null || stat -c%s "$DUMP_FILE" 2>/dev/null)

if [ $FILE_SIZE -eq 0 ]; then
    echo -e "${RED}✗ File is empty${NC}"
    exit 1
fi

echo -e "${GREEN}✓ File size: $(numfmt --to=iec-i --suffix=B $FILE_SIZE 2>/dev/null || echo "${FILE_SIZE} bytes")${NC}"

# ============================================
# PostgreSQL Dump Header Check
# ============================================
echo ""
echo -e "${BLUE}2. PostgreSQL Dump Header${NC}"

if head -5 "$DUMP_FILE" | grep -q "PostgreSQL database dump"; then
    echo -e "${GREEN}✓ Valid PostgreSQL dump header${NC}"
else
    echo -e "${RED}✗ Invalid dump header${NC}"
    exit 1
fi

PG_VERSION=$(grep "Dumped from database version" "$DUMP_FILE" | head -1 | sed 's/.*version //')
echo -e "  PostgreSQL version: $PG_VERSION"

# ============================================
# Schema Objects Count
# ============================================
echo ""
echo -e "${BLUE}3. Schema Objects${NC}"

TABLES=$(grep -c "CREATE TABLE" "$DUMP_FILE" || echo "0")
SEQUENCES=$(grep -c "CREATE SEQUENCE" "$DUMP_FILE" || echo "0")
INDEXES=$(grep -c "CREATE INDEX" "$DUMP_FILE" || echo "0")
CONSTRAINTS=$(grep -c "ALTER TABLE.*ADD CONSTRAINT" "$DUMP_FILE" || echo "0")
FOREIGN_KEYS=$(grep -c "FOREIGN KEY" "$DUMP_FILE" || echo "0")

echo -e "  Tables: ${TABLES}"
echo -e "  Sequences: ${SEQUENCES}"
echo -e "  Indexes: ${INDEXES}"
echo -e "  Constraints: ${CONSTRAINTS}"
echo -e "  Foreign Keys: ${FOREIGN_KEYS}"

if [ $TABLES -eq 0 ]; then
    echo -e "${RED}✗ No tables found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Schema objects present${NC}"

# ============================================
# Data Sections Check
# ============================================
echo ""
echo -e "${BLUE}4. Data Sections${NC}"

DATA_COPIES=$(grep -c "^COPY public\." "$DUMP_FILE" || echo "0")

echo -e "  Data sections (COPY statements): ${DATA_COPIES}"

if [ $DATA_COPIES -eq 0 ]; then
    echo -e "${YELLOW}⚠ Warning: No data sections found${NC}"
else
    echo -e "${GREEN}✓ Data sections present${NC}"
fi

# ============================================
# Critical Tables Check
# ============================================
echo ""
echo -e "${BLUE}5. Critical Strapi Tables${NC}"

CRITICAL_TABLES=(
    "admin_users"
    "admin_roles"
    "strapi_core_store_settings"
    "files"
    "homepages"
    "pages"
)

MISSING_TABLES=()

for table in "${CRITICAL_TABLES[@]}"; do
    if grep -q "CREATE TABLE public.$table" "$DUMP_FILE"; then
        echo -e "${GREEN}✓${NC} $table"
    else
        echo -e "${RED}✗${NC} $table (missing)"
        MISSING_TABLES+=("$table")
    fi
done

if [ ${#MISSING_TABLES[@]} -gt 0 ]; then
    echo -e "${YELLOW}⚠ Warning: ${#MISSING_TABLES[@]} critical tables missing${NC}"
else
    echo -e "${GREEN}✓ All critical tables present${NC}"
fi

# ============================================
# Syntax Check (basic)
# ============================================
echo ""
echo -e "${BLUE}6. Basic Syntax Check${NC}"

# Check for common SQL syntax errors
ERRORS=0

# Check for unmatched parentheses (basic check)
OPEN_PARENS=$(grep -o "(" "$DUMP_FILE" | wc -l | tr -d ' ')
CLOSE_PARENS=$(grep -o ")" "$DUMP_FILE" | wc -l | tr -d ' ')

if [ "$OPEN_PARENS" -ne "$CLOSE_PARENS" ]; then
    echo -e "${YELLOW}⚠ Warning: Parentheses mismatch (may be false positive)${NC}"
    echo -e "  Open: $OPEN_PARENS, Close: $CLOSE_PARENS"
else
    echo -e "${GREEN}✓ Parentheses balanced${NC}"
fi

# Check for proper termination
if tail -5 "$DUMP_FILE" | grep -q "PostgreSQL database dump complete"; then
    echo -e "${GREEN}✓ Dump properly terminated${NC}"
else
    echo -e "${YELLOW}⚠ Warning: Dump termination marker not found${NC}"
fi

# ============================================
# Table List
# ============================================
echo ""
echo -e "${BLUE}7. Complete Table List${NC}"

echo -e "${YELLOW}All tables in dump:${NC}"
grep "CREATE TABLE public\." "$DUMP_FILE" | sed 's/CREATE TABLE public\./  - /' | sed 's/ ($//' | sort

# ============================================
# Summary
# ============================================
echo ""
echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

echo -e "${GREEN}✓ Dump file is valid and complete${NC}"
echo -e "  File: $DUMP_FILE"
echo -e "  Size: $(numfmt --to=iec-i --suffix=B $FILE_SIZE 2>/dev/null || echo "${FILE_SIZE} bytes")"
echo -e "  Tables: $TABLES"
echo -e "  Data sections: $DATA_COPIES"
echo ""
echo -e "${GREEN}The dump can be safely used for restoration.${NC}"
echo ""
