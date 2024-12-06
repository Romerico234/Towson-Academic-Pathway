# TAP Backend

This document provides instructions on how to set up the development environment for the TAP backend.

## Prerequisites

- **Node.js**: Version 18.x.x
- **npm**: Comes with Node.js installation
- **MongoDB**: Version 5.x or higher
- **Git**: For version control
- **TypeScript**: Installed globally (optional, but recommended)

## Getting Started

### 1. Go into backend
```bash
cd tap-api
```

### 2. Install Dependencies
```
npm install
```

### 3. Set up Environment Variables
```
MONGODB_URI="your_mongodb_uri"
DB_NAME="your_db_name"
JWT_SECRET="your_jwt_secret_key"
OPENAI_API_KEY="your_openai_api_key"
PORT=your_port_number
```
For Professor Sai, refer to the google drive link that I attached along with our submission to get our environment variables.

### 4. Run the Development Environment
```
npm run dev
```

