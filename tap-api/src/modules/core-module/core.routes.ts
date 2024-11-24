import { Router } from "express";
import CoreController from "./core.controller";

const router = Router();

router.get("/", CoreController.getAllCores);

router.get("/search", CoreController.searchCores);

export default router;
