import { data as books } from "./books.json";
import fs from "fs";

class BookRepository {
  /**
   *
   * @returns {[{author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}]}
   */
  getAll() {
    return books;
  }

  /**
   *
   * @param id
   * @returns {{author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number}}
   */
  getOne(id: string) {
    return books.find((book) => book!.id === parseInt(id));
  }

  /**
   *
   * @param data
   */
  add(data: any) {
    const updatedBooks = [data, ...books];
    return fs.writeFileSync(
      __dirname + "/books.json",
      JSON.stringify({
        data: updatedBooks,
      })
    );
  }
}

const bookRepository = new BookRepository();
export default bookRepository;
