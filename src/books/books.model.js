import mongoose from "mongoose";

export const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  course_code: {
    type: String,
    index: true,
  },
  tought_by: [String],
  image_path: String,
  stars: Number,
  completion_time: String,
  credit_load: Number,
  number_of_registered: Number,
  department: {
    type: Array,
    requird: true
  },
  faculty: {
    type: Array,
    required: true
  }
});

const bookModel = mongoose.model("Books", BookSchema);
export default bookModel;