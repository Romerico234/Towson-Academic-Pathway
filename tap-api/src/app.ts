import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";

// Import routes
import authRoutes from "./routes/auth-routes";

// Initialize dotenv to load environment variables from .env file
dotenv.config();

// Get environment variables
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "db";

// Create a new Express application instance
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database client
let dbClient: MongoClient;
let db: Db;

// Connect to MongoDB
MongoClient.connect(MONGODB_URI)
  .then((client) => {
    dbClient = client;
    db = client.db(DB_NAME); // Use the database specified in the environment variable

    // Make the db accessible to the routers
    app.locals.db = db;

    // Routes
    app.use("/api/auth", authRoutes);

    // Default route for testing
    app.get("/", (req, res) => {
      res.send("Welcome to the TAP API!");
    });

    // Handle 404 errors
    app.use((req, res) => {
      res.status(404).send("Route not found");
    });

    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with an error code
  });

// Export app for testing or other purposes
export default app;
