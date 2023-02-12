import bcrypt from "brypt";
import jwt from "jsonwebtoken";
import StudentsDAO from "./students.dao";

const studentsDAO = new StudentsDAO();

export default class StudentAuth {
    async login(req, res){
        try {
            const {
                email,
                password
            } = req.body;

            const student = await studentsDAO.findStudent(email);

            if (!student){
                res.status(400).json({msg: "User does not exist"})
            }

            const isMatch = bcrypt.compare(password, student.password);

            if (!isMatch){
                res.status(400).json({msg: "Invalid credentials"});
            }

            const token = await generateToken(student._id);
            delete student.password;
            res.status(200).json({token, student});

        } catch (err) {
            res.statu(500).json(err);
        }
        
        
    }
    async register(req, res){
        try {
            const {
                email,
                password,
                phone_number,
                full_name,
                image,
                faculty,
                department,
                level,
                semester,
            } = req.body;
    
            const encryptedPassword = encryptWithBcrypt(password);

            if (typeof(encryptedPassword !== typeof(''))){
                res.status(500).json({msg: "An error occured while hashing password"})
            }

            // Pass the model creation to students dao

            const {created, response} = await studentsDAO.createNewStudent({
                email,
                password: encryptedPassword,
                phone_number,
                full_name,
                image,
                faculty,
                department,
                level,
                semester,
            })

            if (created){
                const token = await generateToken(response._id);
                delete response.password;
                res.status(201).json({token, response})
            }
            else{res.status(500).json(response)};

        } catch (err) {
            res.status(500).json(err);
        }
    }
    
    async sendResetPasswordRequest(req, res){
        try {
            const email = req.body;
            const student = await studentsDAO.findStudent(email);

            if (!student){
                res.status(400).json({msg: "The student email provided does not exit in our database"})
            }


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
}

const encryptWithBcrypt = async(password) => {
    try {
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(password, salt);

        return encryptedPassword;
    } catch (err) {
        return err;
    }
    
}

const generateToken = async(id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const verifyToken = async(req, res, next) => {
    try {
        const token = req.header("Authorization");
        
        if (!token){
            res.status(403).json({msg: "Accesss Denied"})
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        res.student = verified;
        next()

    } catch (err) {
        res.status(500).json(err);
    }
}

export {verifyToken};