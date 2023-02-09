import { Router } from "express";
import BooksController from "./books.controller.js";

const booksRouter = Router();
const bookController = new BooksController();

booksRouter.get("/", bookController.listBooks);
booksRouter.post("/", bookController.addBook);

export default booksRouter;
