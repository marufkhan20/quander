import prisma from "@/app/server/db/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
  getRelatedVideosController,
  getVideoController,
  getVideosController,
} from "../controllers/videoController";

const app = new Hono()
  .get("/", getVideosController)
  .get("/related-videos", getRelatedVideosController)
  .get("/:id", getVideoController)
  .put(
    "/:id",
    zValidator(
      "json",
      z.object({
        published: z.boolean(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const { published } = await c.req.valid("json");

      const updatedVideo = await prisma.video.update({
        where: { id },
        data: {
          published,
        },
      });

      return c.json(updatedVideo);
    }
  )
  .delete("/:id", async (c) => {
    const { id } = c.req.param();

    const deletedVideo = await prisma.video.delete({
      where: { id },
    });

    return c.json(deletedVideo);
  });

export default app;
