#Migration/Dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Use the wait-for-db script to wait for the database to be ready, then run migrations
# CMD [ "npx", "sequelize-cli", "db:migrate"]


# Copy the startup script and ensure executable permissions
COPY retry-migrate.sh /app/retry-migrate.sh
RUN chmod +x /app/retry-migrate.sh

# Use a shell to avoid permission errors on ENTRYPOINT
ENTRYPOINT ["/bin/sh", "/app/retry-migrate.sh"]