# Use an official Node.js image as the base image
FROM node:14 as dev

# Set the working directory in the container
WORKDIR /app

# Copy the entire project to the container
COPY . .

# Change working directory to the Vue.js project
WORKDIR /app/kubu_ui

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies for the Vue.js project
RUN npm install

# Expose the port that the Vue.js app will run on
EXPOSE 8013

# Command to start the Vue.js development server
CMD ["npm", "run", "serve"]





# Use an official Node.js image as the base image
# FROM node:14 as dev

# # Install the Vue CLI globally
# RUN npm install -g @vue/cli

# # Set the working directory in the container
# WORKDIR /app

# # Copy the package.json and package-lock.json to the container
# COPY kubu_ui/package*.json ./

# # Install project dependencies
# RUN npm install

# # Copy the entire project to the container
# COPY . .

# # Expose the port that the Vue.js app will run on
# EXPOSE 8080

# # Command to start the Vue.js app
# CMD ["npm", "run", "serve"]


# # Install vue-cli-service globally
# RUN npm install -g vue-cli-service

# # Set the working directory to the Vue.js project
# WORKDIR /app/kubu_ui

# # Build the Vue.js application
# RUN vue-cli-service build

# # Reset the working directory to the root
# WORKDIR /app

# # Use a lightweight image for serving the application
# FROM nginx:alpine

# # Copy the built Vue.js application from the builder stage
# COPY --from=dev /app/kubu_ui/dist /usr/share/nginx/html

# # Expose port 80 for the application
# EXPOSE 80

# # Start Nginx to serve the application
# CMD ["nginx", "-g", "daemon off;"]


