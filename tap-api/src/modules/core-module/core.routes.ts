import { Router } from "express";
import { CoreController } from "./core.controller";

const router = Router();
const coreController = new CoreController();

router.get("/", coreController.getAllCores);
router.get("/formatted", coreController.getFormattedCores);

export default router;
