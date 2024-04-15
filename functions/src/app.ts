import Koa from "koa";
import router from "./routes/routes";
import { bodyParser } from "@koa/bodyparser";
import { defaultErrorHandler } from "./middlewares/errors.middleware";
import views from "@ladjs/koa-views";
import productRepository from "./database/productRepository";

const app = new Koa();
const render = views(__dirname + "/views", {
  map: {
    html: "ejs",
    ejs: "ejs",
  },
});
// app.use(bodyParser());
// Must be used before any router is used
app.use(render);
app.use(defaultErrorHandler);
app.use(async function (ctx, next) {
  await ctx.render("pages/products.ejs", {
    products: productRepository.getAll(),
  });
  return next();
});
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
