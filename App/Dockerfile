#Frontend/Dcokerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install ngrok globally
RUN npm install -g @expo/ngrok

# Copy the rest of the application code
COPY . .

# Expose the necessary ports
EXPOSE 19000 19001 19002 8081

# Start the Expo project using npx (no need to install expo-cli globally)
CMD ["npx", "expo", "start", "--tunnel"]