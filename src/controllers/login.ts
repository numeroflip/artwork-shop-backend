import { Middleware } from "koa";

import {
  validatePassword,
  validatePasswordInputSchema,
} from "../services/validatePassword.js";

export const login: Middleware = async (ctx) => {
  if (!ctx.request.body) {
    ctx.throw(400, { message: "Missing body" });
  }
  const body = validatePasswordInputSchema.parse(ctx.request.body);
  const result = await validatePassword(body);

  if (result?.token) {
    ctx.body = result;
  }
};
