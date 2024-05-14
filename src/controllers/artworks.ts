import { Middleware } from "koa";
import { fetchArtworks } from "../services/artwork.js";
import { z } from "zod";

const paramSchema = z.object({
  limit: z.string().transform(Number).pipe(z.number().int().positive().gt(0)),
  page: z.string().transform(Number).pipe(z.number().int().positive()),
});
z.string().transform(Number).pipe(z.number().int().positive());
export const getArtworks: Middleware = async (ctx) => {
  const query = paramSchema.parse(ctx.query);
  const data = await fetchArtworks(query);
  if (!data) {
    ctx.throw(404);
  }
  ctx.body = data;
};
