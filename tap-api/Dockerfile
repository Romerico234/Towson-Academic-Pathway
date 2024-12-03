# ----------------------------------------------------------------
# Base Stage
# Prepares production dependencies
# ----------------------------------------------------------------
FROM node:18-alpine as base

WORKDIR /app

# Install dumb-init for process management
RUN apk --no-cache add dumb-init

ENV NODE_ENV=production

# Copy package files and install dependencies
COPY package*.json ./
RUN npm i

# ----------------------------------------------------------------
# Development Stage
# For local development
# ----------------------------------------------------------------
FROM base as dev

ENV NODE_ENV=development

# Install development dependencies and tools
RUN npm install --only=development && npm install -g nodemon

# Copy configuration files
COPY tsconfig.json ./

# Bind source code for live reload
COPY . .

# Expose application port
EXPOSE 3000

# Healthcheck for container readiness
HEALTHCHECK --start-period=10s --interval=30s --timeout=10s --retries=5 \
  CMD curl --fail http://localhost:3000 || exit 1

# Start application in development mode
CMD ["dumb-init", "npm", "run", "dev"]


