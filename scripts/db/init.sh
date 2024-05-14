#!/bin/sh
set -e

# Add privileges to the configured user, so prisma can use a shadow db in development.
# Only needed for devleopment
mysql -uroot -p${MYSQL_ROOT_PASSWORD} <<-EOSQL
  GRANT ALL PRIVILEGES ON *.* TO '${MYSQL_USER}'@'%' WITH GRANT OPTION;
  FLUSH PRIVILEGES;
EOSQL