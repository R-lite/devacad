import nodemailer from "nodemailer";
import StudentsDAO from "./students.dao";
import { encryptWithBcrypt } from "./students.auth.js";


const studentsDAO = new StudentsDAO();

export default class StudentService {
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
                to: `${email}`,
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

    // MENTOR OPERATION SERVICES
    async getMentorsFullData(req, res){
        try {
            const studentId = req.params;

            const student = await studentsDAO.findStudentByID(studentId);

            if (!student){
                res.status(400).json({msg: "Student does not exist"})
            }

            const mentorList = student.mentors;

            if (mentorList.length < 1){
                res.status(400).json({msg: "Mentor list is empty"})
            }

            
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // STUDENT SETTING SERVICE

    // GET OR UPDATE NOTIFICATION SERVICES
    async getNotifications(req, res){
        try {
            const studentId = req.params;
            const studentNotifiacations = await studentsDAO.getNotifiacations(studentId);

            if (!studentNotifiacations){
                res.status(500).json({msg: "Could not retrieve student notifications"})
            }

            res.status(200).json({notifications: studentNotifiacations})
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async clearNotifications(req, res){
        try {
            const studentId = req.params;
            const clearNotifiacations = await studentsDAO.clearNotifiacations(studentId);

            if(!clearNotifiacations.successful){
                res.status(500).json("An internal server error occured!")
            }

            res.status(200).json({msg: "Student Notifiacations has been cleared"})
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
