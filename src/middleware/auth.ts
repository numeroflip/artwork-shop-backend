import { Middleware } from "koa";
import jwt from "jsonwebtoken";

export const authMiddleware: Middleware = async (ctx, next) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing env variable: JWT_SECRET");
  }

  if (ctx.path === "/login") {
    return next();
  }

  try {
    const authorizationHeader = ctx.get("Authorization");
    if (authorizationHeader.startsWith("Bearer ")) {
      const token = authorizationHeader.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      ctx.state.user = payload;
      return next();
    } else {
      ctx.throw(401, {
        message: "Protected route, use an Authorization header",
      });
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      ctx.throw(401, { message: "invalid token" });
    }
    throw error;
  }
};
