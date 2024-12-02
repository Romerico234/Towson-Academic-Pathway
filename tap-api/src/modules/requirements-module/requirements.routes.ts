import { Router } from "express";
import { RequirementsController } from "./requirements.controller";

const router = Router();
const requirementsController = new RequirementsController();

router.get("/degreeRequirements", requirementsController.getDegreeRequirements);
router.get(
    "/generalDegreeRequirements",
    requirementsController.getGeneralDegreeRequirementes
);
router.get("/honorsRequirements", requirementsController.getHonorsRequirements);
router.get(
    "/degreeRequirements/:type",
    requirementsController.getDegreeRequirementByType
);

export default router;
