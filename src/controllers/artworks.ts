import { RouteHandler } from "../routes/model.js";
import { ArtworksOptionsSchema, fetchArtworks } from "../services/artwork.js";

export const getArtworks: RouteHandler = async (ctx) => {
  const query = ArtworksOptionsSchema.parse(ctx.query);
  const data = await fetchArtworks(query);
  if (!data) {
    ctx.throw(404);
  }
  ctx.body = data;
};
