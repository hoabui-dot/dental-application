#!/bin/bash

# Check remote database status

REMOTE_USER="neurosus"
REMOTE_HOST="100.68.50.41"
REMOTE_PATH="dental-app"

echo "Checking remote database status..."
echo ""

ssh ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_PATH} && bash -s" << 'ENDSSH'
#!/bin/bash

echo "=== Docker Containers ==="
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"

echo ""
echo "=== PostgreSQL Container Details ==="
CONTAINER=$(docker ps --filter "ancestor=postgres:16-alpine" --format "{{.Names}}" | head -1)

if [ -z "$CONTAINER" ]; then
    # Try to find any postgres container
    CONTAINER=$(docker ps --filter "name=postgres" --format "{{.Names}}" | head -1)
fi

if [ -z "$CONTAINER" ]; then
    echo "No PostgreSQL container found"
    exit 1
fi

echo "Container: $CONTAINER"

DB_NAME=$(docker exec $CONTAINER printenv POSTGRES_DB 2>/dev/null || echo "unknown")
DB_USER=$(docker exec $CONTAINER printenv POSTGRES_USER 2>/dev/null || echo "unknown")

echo "Database: $DB_NAME"
echo "User: $DB_USER"

echo ""
echo "=== All Databases ==="
docker exec $CONTAINER psql -U $DB_USER -l

echo ""
echo "=== Tables in $DB_NAME ==="
docker exec $CONTAINER psql -U $DB_USER -d $DB_NAME -c "\dt"

echo ""
echo "=== Database Size ==="
docker exec $CONTAINER psql -U $DB_USER -d $DB_NAME -c "SELECT pg_size_pretty(pg_database_size('$DB_NAME')) as size;"

ENDSSH
