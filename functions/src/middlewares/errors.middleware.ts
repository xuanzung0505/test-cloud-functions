import { Next, ParameterizedContext } from "koa";
import { isErrorWithStatus } from "~/utils/typeAssertion";
import { HTTP_STATUS } from "../constants/httpStatus";
import { COMMON_MESSAGES } from "../constants/messages";

export const defaultErrorHandler = async (
  ctx: ParameterizedContext,
  next: Next
) => {
  try {
    await next();
  } catch (err: any) {
    // will only respond with JSON
    console.log(err);
    if (isErrorWithStatus(err)) {
      ctx.status = err.status;
      ctx.body = {
        message: err.message,
        error: err.error,
      };
    } else {
      ctx.response.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
      ctx.body = {
        message: COMMON_MESSAGES.INTERNAL_SERVER_ERROR,
      };
    }
  }
};
