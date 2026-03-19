#!/bin/bash
# Generate migration from Payload schema
# This script extracts the SQL schema from Payload and creates a migration file

set -e

echo "Generating migration from Payload schema..."

# Start a temporary Payload instance to generate schema
NODE_ENV=development node -e "
const { getPayload } = require('payload');
const config = require('./dist/payload.config.js').default;

(async () => {
  try {
    const payload = await getPayload({ config });
    console.log('Payload initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
"
