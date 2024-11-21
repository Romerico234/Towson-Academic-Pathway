import { Router } from "express";
import { CourseController } from "../controllers/course-controller";
import { authenticateJWT } from "../middleware/auth-middleware";

const router: Router = Router();
const courseController = new CourseController();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.get("/search", courseController.searchCourses);
router.post("/", authenticateJWT, courseController.createCourse);
router.put("/:id", authenticateJWT, courseController.updateCourse);
router.delete("/:id", authenticateJWT, courseController.deleteCourse);

export default router;
