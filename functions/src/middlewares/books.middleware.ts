import { Next, ParameterizedContext } from "koa";
import yup from "yup";
import { ErrorWithStatus } from "~/models/Errors";
import { USERS_MESSAGES } from "../constants/messages";
import { HTTP_STATUS } from "../constants/httpStatus";

export async function bookInputMiddleware(
  ctx: ParameterizedContext,
  next: Next
) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      name: yup.string().required(),
      author: yup.string().required(),
    });
    await schema.validate(postData);
    await next();
  } catch (e: any) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.VALIDATION_ERROR,
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    });
  }
}
