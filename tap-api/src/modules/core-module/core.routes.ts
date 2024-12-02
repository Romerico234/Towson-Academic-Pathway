import { Router } from "express";
import { CoreController } from "./core.controller";

const router = Router();
const coreController = new CoreController();

router.get("/", coreController.getAllCores);

export default router;
