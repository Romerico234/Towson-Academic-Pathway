import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
const userController = new UserController();

router.get("/:userId", (req, res) => userController.getUserById(req, res));
router.put("/:userId", (req, res) => userController.updateUserById(req, res));
router.get("/:userId/degreeplan", (req, res) =>
    userController.getDegreePlanById(req, res)
);
router.post("/:userId/favorites/degreeplans", (req, res) =>
    userController.addFavoriteDegreePlan(req, res)
);
router.delete("/:userId/favorites/degreeplans/:favoriteName", (req, res) =>
    userController.removeFavoriteDegreePlan(req, res)
);
router.get("/:userId/favorites/degreeplans", (req, res) =>
    userController.getFavoriteDegreePlansById(req, res)
);

export default router;
