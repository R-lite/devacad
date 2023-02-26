import StudentsAuth from "./students.auth";
import StudentsService from "./students.service";

const studentService = new StudentsService();
const studentAuth = new StudentsAuth();

export default class StudentsController {
    // LOGIN AND REGISTER CONTROLS
    async login(req, res){
        studentAuth.login(req, res);
    }

    async register(req, res){
        studentAuth.register(req, res);
    }

    // RESET PASSWORD CONTROLS
    async sendResetPasswordRequest(req, res){
        studentService.sendResetPasswordRequest(req, res);
    }
    async resetPassword(req, res){
        studentService.resetPassword(req, res);
    }

    // MENTOR OPERATION CONTROLS
    async getMentorsFullData(req, res){
        studentService.getMentorsFullData(req, res);
    }
    
    // STUDENT SETTING CONTROLS

    // GET OR UPDATE NOTIFICATION CONTROLS
    async getNotifications(req, res){
        studentService.getNotifications(req, res);
    }

    async clearNotifications(req, res){
        studentService.clearNotifications(req, res);
    }

    // STUDNETS COURSE CONTROLS
    async getAllCourse(req, res){
        studentService.getAllCourse(req, res);
    }

    async getCourseBooks(req, res){
        studentService.getCourseBooks(req, res);
    }
}