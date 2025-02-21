import prisma from "@/app/server/db/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        videoId: z.string(),
        authorId: z.string(),
        text: z.string(),
      })
    ),
    async (c) => {
      const { text, videoId, authorId } = await c.req.valid("json");

      const comment = await prisma.comment.create({
        data: {
          videoId,
          text,
          authorId,
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      console.log("comment", comment);

      return c.json(comment);
    }
  )
  .put(
    "/:id",
    zValidator(
      "json",
      z.object({
        text: z.string(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const { text } = await c.req.valid("json");

      const updatedComment = await prisma.comment.update({
        where: { id },
        data: {
          text,
        },
      });

      return c.json(updatedComment);
    }
  )
  .delete("/:id", async (c) => {
    const { id } = c.req.param();

    const deletedComment = await prisma.comment.delete({
      where: { id },
    });

    return c.json(deletedComment);
  });

export default app;
