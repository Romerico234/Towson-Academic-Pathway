# TAP Service

## Development Environment

1. **Define Environment Variables**:
   - Create a `.env` file in the `backend` directory.
   - Fill in the following variables:
     ```
     PORT=<Some Port Number>
     ...
     ```

2. **Install Dependencies and Run the Backend**:
   - Navigate to the `tap-service` directory.
   - Use `npm i` to install packages
   - Use `nodemon` to start the server:
     ```
     cd tap-service
     npm i
     nodemon server.js
     ```