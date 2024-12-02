import { Router } from "express";
import { MajorController } from "./major.controller";

const router = Router();
const majorController = new MajorController();

router.get("/", majorController.getAllMajors);
router.get("/:name", majorController.getMajorByName);
router.get(
    "/:name/no-concentration",
    majorController.getMajorByNameWithNoConcentration
);
router.get(
    "/:name/concentrations",
    majorController.getAllConcentrationsForAMajor
);
router.get(
    "/:majorName/concentrations/:concentrationName",
    majorController.getConcentrationByMajorAndName
);

export default router;
