#!/bin/bash
# Run database migrations using dbmate

set -e

echo "Running database migrations..."

# Check if DATABASE_URI is set
if [ -z "$DATABASE_URI" ]; then
  echo "ERROR: DATABASE_URI environment variable is not set"
  exit 1
fi

# Install dbmate if not present
if ! command -v dbmate &> /dev/null; then
  echo "Installing dbmate..."
  if [[ "$OSTYPE" == "darwin"* ]]; then
    brew install dbmate
  else
    curl -fsSL -o /usr/local/bin/dbmate https://github.com/amacneil/dbmate/releases/latest/download/dbmate-linux-amd64
    chmod +x /usr/local/bin/dbmate
  fi
fi

# Run migrations
dbmate --migrations-dir ./migrations --no-dump-schema up

echo "Migrations completed successfully"
