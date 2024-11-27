import { Router } from "express";
import { StudentController } from "./student.controller";
import { authenticateJWT } from "../../middleware/auth-middleware";

const router = Router();
const studentController = new StudentController();

router.get("/:email", authenticateJWT, (req, res, next) => {
    studentController.getStudentByEmail(req, res, next);
  });
  
  // Update student data by email
  router.put("/:email", authenticateJWT, (req, res, next) => {
    studentController.updateStudentByEmail(req, res, next);
  });
router.get("/:email/favorites", studentController.getFavoritesByEmail);
router.post("/:email/favorites", studentController.addFavoriteByEmail);
router.delete(
    "/:email/favorites/:favoriteName",
    studentController.removeFavoriteByEmail
);

export default router;
