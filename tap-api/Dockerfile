# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install development dependencies (optional, if needed for dev environment)
RUN npm install --only=dev

# Expose the port defined in the .env file or fallback to 3000
EXPOSE ${PORT:-3000}

# Start the application in development mode
CMD ["npm", "run", "dev"]
