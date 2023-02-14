import nodemailer from "nodemailer";
import StudentsAuth from "./students.auth";
import StudentsDAO from "./students.dao";
import { encryptWithBcrypt } from "./students.auth.js";


const studentsDAO = new StudentsDAO();
const studentAuth = new StudentsAuth();

export default class StudentService {
    async login(req, res){
        studentAuth.login(req, res);
    }

    async register(req, res){
        studentAuth.register(req, res);
    }

    async sendResetPasswordRequest(req, res){
        try {
            const email = req.body;
            const student = await studentsDAO.findStudent(email);

            if (!student){
                res.status(400).json({msg: "The student email provided does not exit in our database"})
            }

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: 'dev-engs.email@gmail.com',
                    auth: process.env.NODEMAILERAUTH,
                }
            })

            const mailOptions = {
                from: 'dev-engs.email@gmail.com',
                to: 'muminraj15@gmail.com',
                subject: 'Reset Your Password',
                Text: 'Click on this link to reset your password'
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    res.status(500).json(err);
                }else {
                    res.status(201).json(info);
                }
            })

        } catch (err) {
            res.status(500).json(err);
        }
    }

    async resetPassword(req, res){
        try {
            const {
                email,
                password
            } = req.body;

            const student = await studentsDAO.findStudent(email);

            if (!student){
                res.status(400).json({msg: 
                    "Coudn't retrieve student from database! Make sure the student email is provided."
                })
            }

            const encryptedPassword = encryptWithBcrypt(password);

            if (typeof(encryptedPassword !== typeof(''))){
                res.status(500).json({msg: "An error occured while hashing password"})
            }

            const {successful, response } = await studentsDAO.updateStudentData(
                {email: email}, {password: encryptedPassword}
                );

            if (!successful){
                res.status(500).json(response)
            }

            res.status(201).json(response);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async getMentorsFullData(req, res){
        try {
            const userId = req.params;

            const student = await studentsDAO.findStudentByID(userId);

            if (!student){
                res.status(400).json({msg: "Student does not exist"})
            }

            const mentorList = student.mentors;

            if (mentorList.length < 1){
                res.status(400).json({msg: "Mentor list is empty"})
            }

            
        } catch (err) {
            
        }
    }
}
