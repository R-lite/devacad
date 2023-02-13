import StudentService from "./students.service";

const studentService = new StudentService();

export default class StudentController {
    async login(req, res) {
        studentService.login(req, res);
    }
    async register(req, res) {
        studentService.register(req, res);
    }
    async sendResetPasswordRequest(req, res){
        studentService.sendResetPasswordRequest(req, res);
    }
    async resetPassword(req, res){
        studentService.resetPassword(req, res);
    }
}