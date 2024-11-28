import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
const userController = new UserController();

router.get("/:userId", (req, res) => userController.getUserById(req, res));
router.get("/email/:email", (req, res) =>
    userController.getUserByEmail(req, res)
);
router.put("/:userId", (req, res) => userController.updateUserById(req, res));
router.put("/email/:email", (req, res) =>
    userController.updateUserByEmail(req, res)
);
router.get("/:email/degreeplans", (req, res) =>
    userController.getDegreePlanByEmail(req, res)
);
router.post("/:email/favorites/degreeplans", (req, res) =>
    userController.addFavoriteDegreePlan(req, res)
);
router.delete("/:email/favorites/degreeplans/:favoriteName", (req, res) =>
    userController.removeFavoriteDegreePlan(req, res)
);
router.get("/:email/favorites/degreeplans", (req, res) =>
    userController.getFavoriteDegreePlansByEmail(req, res)
);

export default router;
