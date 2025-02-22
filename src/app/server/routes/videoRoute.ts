import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
  getRelatedVideosController,
  getVideoController,
  getVideosController,
} from "../controllers/videoController";
import prisma from "../db/prisma";
import { createNotification } from "../services/notificationService";

const app = new Hono()
  .get("/", getVideosController)
  .get("/related-videos", getRelatedVideosController)
  .get("/:id", getVideoController)
  .put(
    "/like-video/:id",
    zValidator("json", z.object({ userId: z.string() })),
    async (c) => {
      const { id } = c.req.param();
      const { userId } = c.req.valid("json");

      const video = await prisma.video.findUnique({
        where: { id },
        include: {
          creator: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!video) throw new Error("Video not found");

      const isLiked = video.likes.includes(userId);
      const updatedLikes = isLiked
        ? video.likes.filter((id) => id !== userId) // Remove like
        : [...video.likes, userId]; // Add like

      await prisma.video.update({
        where: { id },
        data: { likes: updatedLikes },
      });

      if (!isLiked) {
        // create notification
        await createNotification({
          creatorId: video?.creatorId,
          title: `${video?.creator?.name} liked your video: ${video?.title}`,
          image: video?.thumbnail,
          icon: "",
          link:
            video?.orientation === "portrait"
              ? `/watch/${video?.id}?orientation=portrait`
              : `/watch/${video?.id}`,
        });
      }

      return c.json({ isLiked: !isLiked });
    }
  )
  .put(
    "/:id",
    zValidator(
      "json",
      z.object({
        published: z.boolean().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        tag: z.string().optional(),
        addView: z.boolean().optional(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const { description, published, tag, title, addView } = await c.req.valid(
        "json"
      );

      const updatedVideo = await prisma.video.update({
        where: { id },
        data: {
          description,
          published,
          tag,
          title,
          ...(addView ? { views: { increment: 1 } } : {}),
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
