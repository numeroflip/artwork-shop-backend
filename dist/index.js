import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { router } from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.js";
import { authMiddleware } from "./middleware/auth.js";
const port = process.env.PORT || "3000";
const app = new Koa();
if (!process.env.JWT_SECRET) {
    throw new Error("Missing env variable: JWT_SECRET");
}
app
    .use(bodyParser())
    .use(errorHandler)
    .use(authMiddleware)
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(port, () => {
    console.log(`App running on port:${port}`);
});
