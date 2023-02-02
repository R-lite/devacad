import cors from "cors";
import "dotenv/config";
import express, { Router } from "express";
import morgan from "morgan";

import mongoose from "mongoose";
import booksRouter from "./books/books.router.js";

const app = express();

const { MONGO_URI } = process.env;
// connect database

mongoose
  .connect(MONGO_URI, {
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
mongoose.set("strictQuery", false);

// middlewares

app.use(express.json());
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

// routes
const rootRouter = Router();

rootRouter.use(booksRouter);

app.use("/api/v1/", rootRouter);

export default app;
