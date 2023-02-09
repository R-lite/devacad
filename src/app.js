import cors from "cors";
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from 'helmet';
import mongoose from "mongoose";
import booksRouter from "./books/books.router.js";
// import studentsRouter from "./students/students.router.js";
// import lecturersRouter from "./lecturers/lecturers.router.js";

const app = express();

const { MONGO_URI } = process.env;
// connect database

mongoose.set("strictQuery", true);

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });


// middlewares config

app.use(express.json());
app.use(bodyParser.json({ limit: "40mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "40mb", extended: true }));
app.use(
  morgan(
    "[:date[clf]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms"
  )
);
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());

// routes

app.use("/api/v1/books", booksRouter);
// app.use("/api/v1/students", studentsRouter);
// app.use("/api/v1/lecturers", lecturersRouter);

export default app;
