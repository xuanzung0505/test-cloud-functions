import Router from "koa-router";
import bookHandlers from "../handlers/books/bookHandlers";
import { bookInputMiddleware } from "../middlewares/books.middleware";

const booksRouter = new Router();

booksRouter
  .get("/books", bookHandlers.getBooks)
  .post("/books", bookInputMiddleware, bookHandlers.save);
booksRouter.get("/books/:id", bookHandlers.getBook);

export default booksRouter;
