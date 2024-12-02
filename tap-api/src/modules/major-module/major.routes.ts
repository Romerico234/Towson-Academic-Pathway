import { Router } from "express";
import { MajorController } from "./major.controller";

const router = Router();
const majorController = new MajorController();

router.get("/", majorController.getAllMajors);
router.get("/:name", majorController.getMajorByName);

export default router;
