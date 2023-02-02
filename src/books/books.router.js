import { Router } from "express";
import BooksController from "./books.controller.js";

const booksRouter = Router();
const bookController = new BooksController();

booksRouter.get("/books/", bookController.listBooks);
booksRouter.post("/books/", bookController.addBook);

export default booksRouter;
