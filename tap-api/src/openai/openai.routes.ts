import { Router } from "express";
import { OpenAIController } from "./openai.controller";
import { authenticateJWT } from "../middleware/auth-middleware";

const router: Router = Router();
const openAIController = new OpenAIController();

router.post(
    "/generate-plan",
    authenticateJWT, // Protects the route
    openAIController.generatePlans
);

export default router;
