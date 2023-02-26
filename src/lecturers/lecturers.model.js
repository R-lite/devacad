import mongoose from "mongoose";

const lecturerSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        min: 5
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
        max: 50
    },
    phone_number: Number,
    course_list: [String],
    image_path: String,
})

const lecturerModel = mongoose.model("Lecturers", lecturerSchema);
export default lecturerModel;
