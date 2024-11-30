import { Router } from "express";
import { TokenController } from "./token.controller";

const router: Router = Router();
const tokenController = new TokenController();

router.post("/refresh", (req, res, next) =>
    tokenController.refresh(req, res, next)
);
router.post("/logout", (req, res, next) =>
    tokenController.logout(req, res, next)
);
router.post("/get-user-id", (req, res, next) =>
    tokenController.getUserIdFromToken(req, res, next)
);

export default router;
