import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
const userController = new UserController();

router.get("/profile", (req, res) => {
    userController.getUserProfile(req, res);
});

router.put("/profile", (req, res) => {
    userController.updateUserProfile(req, res);
});

export default router;
