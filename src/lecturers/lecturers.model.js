import mongoose from "mongoose";

const lecturerSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    phone_number: Number,
    course_list: [String],
    image_path: String,
})

export default mongoose.model("Lecturers", lecturerSchema);