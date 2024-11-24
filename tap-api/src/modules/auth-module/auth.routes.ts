import { Router } from "express";
import { AuthController } from "./auth.controller";

const router: Router = Router();

router.post("/register", (req, res, next) => {
    const authController = new AuthController();
    authController.register(req, res, next);
});

router.post("/login", (req, res, next) => {
    const authController = new AuthController();
    authController.login(req, res, next);
});

export default router;
