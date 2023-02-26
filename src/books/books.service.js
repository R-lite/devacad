import {findBook, addNewBook} from "./books.dao.js";

export default class BookService {
  async listBooks(reqBody, res) {
    await findBook(reqBody, res);
  }

  async addBook(reqBody, res) {
    await addNewBook(reqBody, res);
  }
}
