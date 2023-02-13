import { Router } from "express";
import StudentController from "./students.controller";

const studentController = new StudentController();
const studentRouter = Router();

studentRouter.get("/login", studentController.login);
studentRouter.post("/register", studentController.register);
studentRouter.post("/get-reset-password-request", studentController.sendResetPasswordRequest);
studentRouter.post("/reset-password", studentController.resetPassword);

export default studentRouter;