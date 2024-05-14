import { z } from "zod";
import { HttpError, Middleware } from "koa";

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      ctx.status = 400;
      ctx.body = { error: error.flatten() };
    } else if (error instanceof HttpError) {
      ctx.status = error.status || 500;
      ctx.body = { message: error.message };
    } else {
      ctx.status = 500;
    }
    console.log(error);
  }
};
