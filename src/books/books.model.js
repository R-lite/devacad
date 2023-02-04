import mongoose from "mongoose";

export const BookSchema = new mongoose.Schema({
  title: String,
  tought_by: Array,
  image_path: String,
  stars: Number,
  completion_time: String,
  credit_load: Number,
  number_of_registered: Number,
  department: Array,
  faculty: Array
});

export default mongoose.model("Books", BookSchema);
