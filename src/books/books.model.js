import mongoose from "mongoose";

// const BooksCatalogueingSchema = new mongoose.Schema({
//   faculty: [{
//       name: String,
//       image_path: String,
//       departments: []
//     }]
// })

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
  // MAY NOT BE NEEDED BECAUSE OF BOOKCATALOGUEING SCHEMA
  course: {
    type: Array,
    required: true
  },
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