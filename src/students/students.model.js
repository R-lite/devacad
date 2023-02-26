import mongoose from "mongoose";

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
    notification_settings: {
        type: Array,
        default: []
    }
})

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
        password: {
            type: String,
            required: true
        },
        phone_number: String,
        image_path: String,
        faculty: String,
        department: String,
        level: Number,
        course_list: [{
            name: {
                type: String,
                unique: true,
                required: true
            },
            completetion_time: String,
            image_path: String,
            stars: Number,
            progress: Number,
            status: String
        }],
        settings: [settingsSubSchema],
        mentors: {
            type: [String],
            default: []
        },
        notifications: [Strings]
    },
    {timestamps: true}
)


const studentModel = mongoose.model("Students", studentSchema);
export default studentModel;