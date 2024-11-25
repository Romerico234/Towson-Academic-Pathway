import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();
const studentController = new StudentController();

router.get("/:studentId", studentController.getStudentData);
router.put("/:studentId", studentController.updateStudentData);
router.get("/:studentId/favorites", studentController.getFavorites);
router.post("/:studentId/favorites", studentController.addFavorite);
router.delete(
    "/:studentId/favorites/:favoriteName",
    studentController.removeFavorite
);

export default router;
