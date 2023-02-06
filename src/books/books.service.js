import {findBook, addNewBook} from "./books.dao.js";


export default class BookService {
  async listBooks() {
    return await findBook();
  }

  async addBook(bookData) {
    return await addNewBook(bookData);
  }
}
