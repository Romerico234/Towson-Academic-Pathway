import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();
const studentController = new StudentController();

router.get("/:email", studentController.getStudentByEmail);
router.put("/:email", studentController.updateStudentByEmail);
router.get("/:email/favorites", studentController.getFavoritesByEmail);
router.post("/:email/favorites", studentController.addFavoriteByEmail);
router.delete(
    "/:email/favorites/:favoriteName",
    studentController.removeFavoriteByEmail
);

export default router;
