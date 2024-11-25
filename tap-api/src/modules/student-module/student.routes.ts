import { Router } from "express";
import StudentController from "./student.controller";
import { authenticateJWT } from "../../middleware/auth-middleware";

const router = Router();
router.get("/profile", authenticateJWT, StudentController.getStudentData);
router.put("/profile", authenticateJWT, StudentController.updateStudentData);
router.get("/favorites", authenticateJWT, StudentController.getFavorites);
router.post("/favorites", authenticateJWT, StudentController.addFavorite);
router.delete(
    "/favorites/:favoriteName",
    authenticateJWT,
    StudentController.removeFavorite
);

export default router;
