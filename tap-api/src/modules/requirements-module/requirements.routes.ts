import { Router } from "express";
import RequirementsController from "./requirements.controller";

const router = Router();
router.get("/", RequirementsController.getRequirements);
export default router;
