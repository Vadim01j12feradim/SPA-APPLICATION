#!/bin/bash

# Attempt to run migrations, retry every 2 seconds if it fails
until npx sequelize-cli db:migrate; do
  echo "Migration failed. Retrying in 2 seconds..."
  sleep 2
done

echo "Migration completed successfully."