import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { router } from "./routes/index.js";

const port = process.env.PORT || "3000";

const app = new Koa();

app.use(router.routes()).use(router.allowedMethods()).use(bodyParser());

app.listen(port, () => {
  console.log(`App running on port:${port}`);
});
