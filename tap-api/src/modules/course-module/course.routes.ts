import { Router } from "express";
import { CourseController } from "./course-controller";

const router: Router = Router();
const courseController = new CourseController();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.get("/search", courseController.searchCourses);

export default router;
