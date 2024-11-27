import { Router } from "express";
import { CourseController } from "./course.controller";

const router: Router = Router();
const courseController = new CourseController();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.get("/search", courseController.searchCourses);
router.get(
    "/:subject/:catalogNumber",
    courseController.getCourseBySubjectAndCatalogNumber
);

export default router;
