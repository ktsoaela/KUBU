# Use the official Node.js image as base
FROM node:21-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Vue CLI globally
RUN npm install -g @vue/cli@next

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose port 8080 (default for Vue.js development server)
EXPOSE 8080

# Command to start the development server
CMD ["npm", "run", "serve"]


# # Use the official Vue.js image as base
# FROM node:14 AS builder

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY frontend/package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the frontend code
# COPY frontend/ .

# # Build the Vue.js app
# RUN npm run build

# # Use Nginx as a lightweight web server to serve the built Vue.js app
# FROM nginx:1.21

# # Copy the built app from the previous stage
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]
