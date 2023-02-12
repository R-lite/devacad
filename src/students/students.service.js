import StudentAuth from "./students.auth";

const studentAuth = new StudentAuth();

export default class StudentService {
    async login(req, res){
        studentAuth.login(req, res);
    }
    async register(req, res){
        studentAuth.register(req, res);
    }
}
