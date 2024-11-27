import { Router } from "express";
import { OpenAIController } from "./openai.controller";
import { authenticateJWT } from "../../middleware/auth-middleware";
import multer from "multer";

const router = Router();
const upload = multer();
const openAIController = new OpenAIController();

router.post(
    "/generate-plan",
    authenticateJWT,
    upload.single("unofficialTranscript"),
    openAIController.generatePlans
);

export default router;
