import { Context } from "koa";
import { HTTP_STATUS } from "~/constants/httpStatus";
import bookRepository from "~/database/bookRepository";

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getBooks(ctx: Context) {
  try {
    const books = bookRepository.getAll();

    ctx.body = {
      data: books,
    };
  } catch (e: any) {
    ctx.status = HTTP_STATUS.NOT_FOUND;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{data: {author: string, name: string, id: number}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getBook(ctx: Context) {
  try {
    const { id } = ctx.params;
    const getCurrentBook = bookRepository.getOne(id);
    if (getCurrentBook) {
      return (ctx.body = {
        data: getCurrentBook,
      });
    }

    throw new Error("Book Not Found with that id!");
  } catch (e: any) {
    ctx.status = HTTP_STATUS.NOT_FOUND;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function save(ctx: Context) {
  try {
    const postData = ctx.request.body;
    bookRepository.add(postData);

    ctx.status = HTTP_STATUS.CREATED;
    return (ctx.body = {
      success: true,
    });
  } catch (e: any) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

export default { getBooks, getBook, save };
