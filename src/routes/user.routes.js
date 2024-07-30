import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secured route

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/current-user").get(verifyJWT,getCurrentUser)

export default router;