import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();
const studentController = new StudentController();

router.get("/:email", (req, res, next) => {
    studentController.getStudentByEmail(req, res, next);
});
router.put("/:email", (req, res, next) => {
    studentController.updateStudentByEmail(req, res, next);
});
router.get("/:email/degreeplans", (req, res) => {
    studentController.getDegreePlanByEmail(req, res);
});
router.post("/:email/favorites/degreeplans", (req, res) => {
    studentController.addFavoriteDegreePlan(req, res);
});
router.delete("/:email/favorites/degreeplans/:favoriteName", (req, res) => {
    studentController.removeFavoriteDegreePlan(req, res);
});
router.get("/:email/favorites/degreeplans", (req, res) => {
    studentController.getFavoriteDegreePlansByEmail(req, res);
});

export default router;
