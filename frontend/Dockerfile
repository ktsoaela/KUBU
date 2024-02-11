# Use the official Node.js image
FROM node:20-alpine3.17

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml /app/

# Install pnpm and project dependencies
RUN npm install -g pnpm
RUN pnpm install

# Expose port 3000
EXPOSE 3000

# Start the Vue app using Vite
CMD ["pnpm", "dev:docker"]
