import StudentAuth from "./students.auth";

const studentAuth = new StudentAuth();

export default class StudentService {
    async login(req, res){
        studentAuth.login(req, res);
    }
    async register(req, res){
        studentAuth.register(req, res);
    }
    async sendResetPasswordRequest(req, res){
        studentAuth.sendResetPasswordRequest(req,res);
    }
    async resetPassword(req, res){
        studentAuth.resetPassword(req, res);
    }
}
