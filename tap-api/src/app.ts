import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDb } from "./utils/db";

// Import routes
import authRoutes from "./modules/auth/auth.routes";
import openAIRoutes from "./modules/openai/openai.routes";
import courseRoutes from "./modules/course/course.routes";
import coreRoutes from "./modules/core/core.routes";
import majorRoutes from "./modules/major/major.routes";
import requirementsRoutes from "./modules/requirements/requirements.routes";
// import courseSectionRoutes from "./routes/course-section.routes";

// Load environment variables from .env file
dotenv.config();

// Get environment variables
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "db";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDb(MONGODB_URI, DB_NAME)
    .then(() => {
        app.use("/api/auth", authRoutes);
        app.use("/api/openai", openAIRoutes);
        app.use("/api/courses", courseRoutes);
        app.use("/api/cores", coreRoutes);
        app.use("/api/majors", majorRoutes);
        app.use("/api/requirements", requirementsRoutes);

        // app.use("/api/course-sections", courseSectionRoutes);

        // Default route for testing
        app.get("/", (req, res) => {
            res.send("Welcome to the TAP API!");
        });

        // Handle 404 errors
        app.use((req, res) => {
            res.status(404).send("Route not found");
        });

        // Successful database connection
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}/`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    });

export default app;
