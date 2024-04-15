import { Context, Next } from "koa";
import { number, object, string } from "yup";
import { ErrorWithStatus } from "~/models/Errors";
import { PRODUCTS_MESSAGES, USERS_MESSAGES } from "../constants/messages";
import { HTTP_STATUS } from "../constants/httpStatus";

export async function productAddMiddleware(ctx: Context, next: Next) {
  try {
    const postData = ctx.req.body;
    let schema = object({
      name: string().required(PRODUCTS_MESSAGES.PRODUCT_NAME_IS_REQUIRED),
      price: number().required(PRODUCTS_MESSAGES.PRODUCT_PRICE_IS_REQUIRED),
      description: string().required(
        PRODUCTS_MESSAGES.PRODUCT_DESCRIPTION_IS_REQUIRED
      ),
      product: string().required(PRODUCTS_MESSAGES.PRODUCT_PRODUCT_IS_REQUIRED),
      color: string().required(PRODUCTS_MESSAGES.PRODUCT_COLOR_IS_REQUIRED),
      image: string().required(PRODUCTS_MESSAGES.PRODUCT_IMAGE_IS_REQUIRED),
    });
    await schema.validate(postData);
  } catch (error: any) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.VALIDATION_ERROR,
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    });
  }
  await next();
}

export async function productGetByIDMiddleware(ctx: Context, next: Next) {
  try {
    const params = ctx.params;
    let schema = object({
      id: string()
        .required(PRODUCTS_MESSAGES.PRODUCT_ID_IS_REQUIRED)
        .test(
          "should be a number",
          (d) => `${d}, ${PRODUCTS_MESSAGES.PRODUCT_ID_IS_INVALID}`,
          (value) => !isNaN(parseInt(value))
        ),
    });
    await schema.validate(params);
  } catch (error: any) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.VALIDATION_ERROR,
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    });
  }
  await next();
}

export function ProductPickMiddleware(pick: string[]) {
  return async (ctx: Context, next: Next) => {
    ctx.pick = pick;
    return next();
  };
}
