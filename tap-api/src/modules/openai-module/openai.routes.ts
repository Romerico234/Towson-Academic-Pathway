import { Router } from "express";
import { OpenAIController } from "./openai.controller";
import multer from "multer";

const router = Router();
const upload = multer();
const openAIController = new OpenAIController();

router.post(
    "/generate-plan",
    upload.single("unofficialTranscript"),
    openAIController.generatePlans
);

export default router;
