import { Router } from "express";
import { OpenAIController } from "./openai.controller";
import { authenticateJWT } from "../../middleware/auth-middleware";

const router: Router = Router();
const openAIController = new OpenAIController();

router.post("/generate-plan", authenticateJWT, openAIController.generatePlans);

export default router;
