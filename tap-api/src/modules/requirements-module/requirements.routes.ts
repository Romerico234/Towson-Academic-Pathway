import { Router } from "express";
import { RequirementsController } from "./requirements.controller";

const router = Router();
const requirementsController = new RequirementsController();

router.get("/", requirementsController.getRequirements);

export default router;
