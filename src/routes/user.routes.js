import { Router } from "express";
import { forgetPassword, getCurrentUser, loginUser, logoutUser, registerUser, resetPassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgetpassword").post(forgetPassword)
router.route("/reset-password").post(resetPassword)
// secured route

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/current-user").get(verifyJWT,getCurrentUser)

export default router;