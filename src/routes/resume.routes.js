import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createResume, deleteResumeById, getResumeById, getResumes, updateResume } from "../controllers/resume.controller.js";

const resumeRouter = Router();
resumeRouter.route("/").post(verifyJWT,createResume)
resumeRouter.route("/").get(verifyJWT,getResumes)

resumeRouter.route("/:id").put(verifyJWT,updateResume)
resumeRouter.route("/:id").get(verifyJWT,getResumeById)
resumeRouter.route("/:id").delete(verifyJWT,deleteResumeById)
export { resumeRouter }