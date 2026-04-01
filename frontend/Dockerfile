# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage: use Node.js to serve static files
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install a static file server (serve)
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist /app/dist

# Expose port
EXPOSE 3000

# Start nginx
CMD ["serve", "-s", "dist", "-l", "3000"]