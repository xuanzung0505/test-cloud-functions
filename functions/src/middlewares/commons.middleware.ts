import { Next, ParameterizedContext } from "koa";
import { number, object, string } from "yup";
import { ErrorWithStatus } from "~/models/Errors";
import { enumToArray } from "~/utils/enumToArray";
import { PAGINATION_MESSAGES, USERS_MESSAGES } from "../constants/messages";
import { SortOrder } from "../constants/enums";
import { HTTP_STATUS } from "../constants/httpStatus";

export async function paginationMiddleware(
  ctx: ParameterizedContext,
  next: Next
) {
  try {
    const query = ctx.query;
    let schema = object({
      limit: number().min(
        1,
        PAGINATION_MESSAGES.LIMIT_MUST_BE_BIGGER_THAN_ZERO
      ),
      sort: string().oneOf(
        enumToArray<string>(SortOrder),
        PAGINATION_MESSAGES.SORT_IS_INVALID
      ),
    });
    await schema.validate(query);
  } catch (error: any) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.VALIDATION_ERROR,
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      error: error.message,
    });
  }
  await next();
}
