import { Router } from "express";
import { CourseSectionController } from "../controllers/course-section.controller";
import { authenticateJWT } from "../middleware/auth-middleware";

const router: Router = Router();
const courseSectionController = new CourseSectionController();

router.get("/", courseSectionController.getAllCourseSections);
router.get("/:id", courseSectionController.getCourseSectionById);
router.get(
    "/bridge/:bridgeId",
    courseSectionController.getCourseSectionsByCourseBridgeId
);
router.post("/", authenticateJWT, courseSectionController.createCourseSection);
router.put(
    "/:id",
    authenticateJWT,
    courseSectionController.updateCourseSection
);
router.delete(
    "/:id",
    authenticateJWT,
    courseSectionController.deleteCourseSection
);

export default router;
