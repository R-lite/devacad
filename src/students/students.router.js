import { Router } from "express";
import StudentController from "./students.controller";

const studentController = new StudentController();
const studentRouter = Router();

studentRouter.post("/login", studentController.login);
studentRouter.post("/register", studentController.register);

studentRouter.post("/get-reset-password-request", studentController.sendResetPasswordRequest);
studentRouter.patch("/reset-password", studentController.resetPassword);

studentRouter.get("/mentors/all/:id", studentController.getMentorsFullData);

studentRouter.get("/notifications/:id", studentController.getNotitifications);
studentRouter.delete("/notifications/:id", studentController.clearNotitifications);

export default studentRouter;