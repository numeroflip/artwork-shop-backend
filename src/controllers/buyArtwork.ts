import { Middleware } from "koa";
import { fetchArtwork } from "../services/artwork.js";
import { z } from "zod";
import prisma from "../services/prisma.js";
import { User } from "@prisma/client";

const paramSchema = z.object({
  id: z.string().transform(Number).pipe(z.number().int().positive()),
});

export const buyArtwork: Middleware = async (ctx) => {
  const params = paramSchema.parse(ctx.params);
  const user = ctx.state.user.data as User;

  const [remoteArtwork, localArtwork] = await Promise.all([
    fetchArtwork(params.id),
    prisma.artwork.findFirst({
      where: { id: params.id },
    }),
  ]);

  if (!remoteArtwork) {
    ctx.throw(404);
    return;
  }

  if (localArtwork?.userId) {
    if (user.id === localArtwork.userId) {
      ctx.throw(409, { message: "Artwork is already yours" });
    } else {
      ctx.throw(409, {
        message: "Artwork is already purchased by someone else",
      });
    }
  }

  if (!localArtwork) {
    await prisma.artwork.create({
      data: {
        id: remoteArtwork.id,
        userId: user.id,
        user: undefined,
      },
    });
    ctx.body = { message: "Artwork successfully purchased" };
  }
};
