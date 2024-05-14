import Router from "@koa/router";
import { login } from "../controllers/login.js";
import { getArtwork } from "../controllers/artwork.js";
import { getArtworks } from "../controllers/artworks.js";

export const router = new Router();

router.post("/login", login);
router.get("/artwork/:id", getArtwork);
router.get("/artworks", getArtworks);
