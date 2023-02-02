import mongoose from "mongoose";

export const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
});

export default mongoose.model("Book", BookSchema);
