import Router from "koa-router";
import productHandlers from "../handlers/products/productHandlers";
import {
  ProductPickMiddleware,
  productAddMiddleware,
  productGetByIDMiddleware,
} from "../middlewares/products.middleware";
import { paginationMiddleware } from "../middlewares/commons.middleware";

const productsRouter = new Router();

productsRouter
  .get("/products", paginationMiddleware, productHandlers.getProducts)
  .post(
    "/products",
    ProductPickMiddleware([
      "name",
      "price",
      "description",
      "product",
      "color",
      "image",
    ]),
    productAddMiddleware,
    productHandlers.save
  );
productsRouter.get(
  "/products/:id",
  productGetByIDMiddleware,
  productHandlers.getProduct
);
productsRouter
  .patch(
    "/products/:id",
    ProductPickMiddleware([
      "name",
      "price",
      "description",
      "product",
      "color",
      "image",
    ]),
    productGetByIDMiddleware,
    productHandlers.updateProduct
  )
  .delete(
    "/products/:id",
    productGetByIDMiddleware,
    productHandlers.deleteProduct
  );

export default productsRouter;
