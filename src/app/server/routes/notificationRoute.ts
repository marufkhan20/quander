import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import prisma from "../db/prisma";

const app = new Hono()
  .get("/:creatorId", async (c) => {
    const { creatorId } = c.req.param();

    const notifications = await prisma.notification.findMany({
      where: { creatorId },
      take: 15,
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.json(notifications);
  })
  .put(
    "/:id",
    zValidator(
      "json",
      z.object({
        read: z.boolean(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const { read } = await c.req.valid("json");

      const updatedNotification = await prisma.notification.update({
        where: { id },
        data: {
          read,
        },
      });

      return c.json(updatedNotification);
    }
  )
  .delete("/:id", async (c) => {
    const { id } = c.req.param();

    const deletedNotification = await prisma.notification.delete({
      where: { id },
    });

    return c.json(deletedNotification);
  });

export default app;
