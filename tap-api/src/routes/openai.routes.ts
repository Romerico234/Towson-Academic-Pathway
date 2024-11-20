import { Router } from "express";
import { OpenAIController } from "../controllers/openai.controller";
import { authenticateJWT } from "../middleware/auth-middleware";

const router: Router = Router();
const openAIController = new OpenAIController();

router.post(
    "/generate",
    authenticateJWT, // Protects the route
    openAIController.generatePlans
);

export default router;
