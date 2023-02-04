import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        min: 5
    },
    email: {
        type: String,
        index: true,
        required: true,
        max: 50,
        unique: true
    },
    phone_number: Number,
    image_path: String,
    faculty: String,
    department: String,
    level: Number,
    course_list: [{
        name: String,
        liked: Boolean,
        progress: Number,
        status: String
    }],
    settings: [settingsSubSchema],
    mentors: {
        type: [String],
        default: []
    }},
    {timestamps: true}
)

const settingsSubSchema = new mongoose.Schema({
    video_playback: {
        type: String,
        default: "AutoPlay"
    },
    download_options: {
        quality: {
            type: Number,
            default: 360
        },
        download_over_wifi: {
            type: Boolean,
            default: false,
        },
    },
    notifications: {
        type: Array,
        default: []
    }
})

export default mongoose.model("Students", studentSchema);