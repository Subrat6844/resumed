import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';

const app = express();
dotenv.config({
    path: './.env'
});
console.log(process.env.CORS_ORIGIN);
app.use(cors({
    origin: process.env.CORS_ORIGIN || "https://resumed-app.vercel.app",
    allowedHeaders: ["Content-Type", "Authorization","set-cookie"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
import userRouter from "./routes/user.routes.js"
import { resumeRouter } from "./routes/resume.routes.js";


// User route
app.use("/api/v1/users",userRouter)
app.use("/api/v1/resumes",resumeRouter)


export {app} 