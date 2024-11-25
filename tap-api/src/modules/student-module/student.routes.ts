import { Router } from "express";
import { StudentController } from "./student.controller";
import { authenticateJWT } from "../../middleware/auth-middleware";

const router = Router();
const studentController = new StudentController();

router.get("/profile", authenticateJWT, studentController.getStudentData);
router.put("/profile", authenticateJWT, studentController.updateStudentData);
router.get("/favorites", authenticateJWT, studentController.getFavorites);
router.post("/favorites", authenticateJWT, studentController.addFavorite);
router.delete(
    "/favorites/:favoriteName",
    authenticateJWT,
    studentController.removeFavorite
);

export default router;
