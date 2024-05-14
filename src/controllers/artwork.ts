import { z } from "zod";
import { RouteHandler } from "../routes/model.js";
import { fetchArtwork } from "../services/artwork.js";

const paramSchema = z.object({
  id: z.string().transform(Number).pipe(z.number().int().positive()),
});

export const getArtwork: RouteHandler = async (ctx) => {
  const params = paramSchema.parse(ctx.params);
  const data = await fetchArtwork(params.id);
  if (!data) {
    ctx.throw(404);
  }
  ctx.body = data;
};
