# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Fix for path resolution issues in the build
RUN npm install -g patch-package && \
    npm run postinstall

# Build the application
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy the built app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]