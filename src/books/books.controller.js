import BookService from "./books.service.js";

const bookService = new BookService();

class BooksController {
  async listBooks(req, res) {
    await bookService.listBooks(req.body, res);
  }

  async addBook(req, res) {
    res.status(201).json(
      await bookService.addBook(req.body, res)
    );
  }
}

export default BooksController;
