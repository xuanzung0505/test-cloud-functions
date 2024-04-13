import Router from "koa-router";
import booksRouter from "./books.routes";
import productsRouter from "./products.routes";

const router = new Router({
  prefix: "/api",
});
router.use(booksRouter.routes(), booksRouter.allowedMethods());
router.use(productsRouter.routes(), productsRouter.allowedMethods());

export default router;
