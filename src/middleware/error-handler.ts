import { z } from "zod";
import { RouteHandler } from "../routes/model.js";

export const errorHandler: RouteHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500);
    }
  }
};
