import { Router } from "express";
import StudentController from "./students.controller";

const studentController = new StudentController();
const studentRouter = Router();

studentRouter.get("/login", studentController.login);
studentRouter.post("/register", studentController.register);

export default studentRouter;