#!/bin/sh

set -e


# Ensure the migrations directory exists and has correct permissions
mkdir -p prisma/migrations

# Run Prisma 
npm run migrate

# Start the application
exec "$@"