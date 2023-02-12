import studentModel from "./students.model";

export default class StudentsDAO {
    async findStudent(email){
        const student = await studentModel.findOne({email: email});
        return student;
    }
    async createNewStudent(data){
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
            } = data;

            const newStudent = new studentModel({
                email,
                password,
                phone_number,
                full_name,
                image,
                faculty,
                department,
                level,
                semester,
            })

            const savedStudent = await newStudent.save();
            return({created: true, response: savedStudent});

        } catch (err) {
            return({created: false, response: err})
        }
    }

    async updateStudentData(email, body){
        try {
            const updatedStudent = await studentModel.findOneAndUpdate(email, body);

            return ({successful: true, response: updatedStudent})
        } catch (err) {
            return ({successful: false, response: err});
        }
        
    }
}