import BookModel from "./books.model.js";

const bookModel = BookModel;

export default class BookService {
  async listBooks() {
    return await bookModel.find({});
  }

  async addBook(bookData) {
    return await bookModel.create(bookData);
  }
}
