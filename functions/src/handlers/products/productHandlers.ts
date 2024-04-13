import { Context } from "koa";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { PRODUCTS_MESSAGES } from "~/constants/messages";
import productRepository from "~/database/productRepository";
import { ErrorWithStatus } from "~/models/Errors";
import pick from "~/utils/pick";

async function getProducts(ctx: Context) {
  const { limit, sort } = ctx.query;
  const products = productRepository.getAll(Number(limit), sort as string);
  ctx.body = {
    message: PRODUCTS_MESSAGES.GET_PRODUCTS_SUCCESSFULLY,
    data: products,
  };
}

async function getProduct(ctx: Context) {
  const { id } = ctx.params;
  const getCurrentProduct = productRepository.getOne(id);
  if (getCurrentProduct) {
    return (ctx.body = {
      message: PRODUCTS_MESSAGES.GET_PRODUCT_SUCCESSFULLY,
      data: getCurrentProduct,
    });
  }
  throw new ErrorWithStatus({
    status: HTTP_STATUS.NOT_FOUND,
    message: PRODUCTS_MESSAGES.PRODUCT_NOT_FOUND,
  });
}

async function save(ctx: Context) {
  const postData = ctx.request.body;
  const data = productRepository.add(
    pick(postData, [
      "name",
      "price",
      "description",
      "product",
      "color",
      "image",
    ])
  );
  ctx.status = HTTP_STATUS.CREATED;
  return (ctx.body = {
    message: PRODUCTS_MESSAGES.SAVE_PRODUCT_SUCCESSFULLY,
    data,
  });
}

async function updateProduct(ctx: Context) {
  const { id } = ctx.params;
  const data = ctx.request.body;
  const updatedProduct = productRepository.updateOne(id, pick(data, ctx.pick));
  if (updatedProduct) {
    return (ctx.body = {
      message: PRODUCTS_MESSAGES.UPDATE_PRODUCT_SUCCESSFULLY,
      data: updatedProduct,
    });
  }
  throw new ErrorWithStatus({
    status: HTTP_STATUS.NOT_FOUND,
    message: PRODUCTS_MESSAGES.PRODUCT_NOT_FOUND,
  });
}

async function deleteProduct(ctx: Context) {
  const { id } = ctx.params;
  const deletedProduct = productRepository.deleteOne(id);
  if (deletedProduct) {
    return (ctx.body = {
      message: PRODUCTS_MESSAGES.DELETE_PRODUCT_SUCCESSFULLY,
      data: deletedProduct,
    });
  }
  throw new ErrorWithStatus({
    status: HTTP_STATUS.NOT_FOUND,
    message: PRODUCTS_MESSAGES.PRODUCT_NOT_FOUND,
  });
}

export default { getProducts, getProduct, save, updateProduct, deleteProduct };
