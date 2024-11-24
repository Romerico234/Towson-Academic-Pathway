import { Router } from "express";
import MajorController from "./major.controller";

const router = Router();

// Get all majors
router.get("/", MajorController.getAllMajors);

// Get major by name
router.get("/:name", MajorController.getMajorByName);

// Search majors
router.get("/search", MajorController.searchMajors);

export default router;
