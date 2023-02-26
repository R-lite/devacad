import { Router } from "express";
import StudentsController from "./students.controller";

const studentController = new StudentsController();
const studentRouter = Router();

// STUDENT AUTH AND RESET PASSWORD ROUTES
studentRouter.post("/login", studentController.login);
studentRouter.post("/register", studentController.register);

studentRouter.post("/get-reset-password-request", studentController.sendResetPasswordRequest);
studentRouter.patch("/reset-password", studentController.resetPassword);

// STUDENT MENTOR ROUTES
studentRouter.get("/mentors/all/:studentId", studentController.getMentorsFullData);

// STUDENT NOTIFICATIONS ROUTES
studentRouter.get("/notifications/:studentId", studentController.getNotifications);
studentRouter.delete("/notifications/:id", studentController.clearNotifications);

// MY COURSE SECTION ROUTES
studentRouter.get("/my-course/:studentId", studentController.getAllCourse);
studentRouter.get("/my-course/books/:studentId/:courseDetails", studentController.getCourseBooks);
studentRouter.get("/my-course/videos/:studentId/:courseId", studentController.getVideoMaterials);
studentRouter.patch("/my-course/add/:studentId/:courseId", studentController.addCourse);
studentRouter.delete("/my-course/remove/:studentId/:courseId", studentController.removeCourse);
// ! share download mark-as-completed

// STUDENT SETTINGS ROUTES

// STUDENT SEARCH ROUTES



export default studentRouter;