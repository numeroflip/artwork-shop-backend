import { z } from "zod";
import { fetchArtwork } from "../services/artwork.js";
import { Middleware } from "koa";

const paramSchema = z.object({
  id: z.string().transform(Number).pipe(z.number().int().positive()),
});

export const getArtwork: Middleware = async (ctx) => {
  const params = paramSchema.parse(ctx.params);

  const data = await fetchArtwork(params.id);
  if (!data) {
    ctx.throw(404);
  }
  ctx.body = data;
};
