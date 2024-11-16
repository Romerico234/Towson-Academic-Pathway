# TAP Backend

This document provides instructions on how to set up the development environment for the TAP backend.

## Prerequisites

- **Node.js**: Version 18.x.x
- **npm**: Comes with Node.js installation
- **MongoDB**: Version 5.x or higher
- **Git**: For version control
- **TypeScript**: Installed globally (optional, but recommended)

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/your-repo.git
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
PORT=your_port_number
```

### 4. Run the Development Environment
```
npm run dev
```

