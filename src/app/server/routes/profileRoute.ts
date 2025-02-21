import prisma from "@/app/server/db/prisma";
import { profileSchema } from "@/schemas/profileSchema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getProfileByIdController } from "../controllers/profileController";

const app = new Hono()
  .get("/:id", getProfileByIdController)
  .put("/:id", zValidator("json", profileSchema), async (c) => {
    const { id } = c.req.param();
    const { firstName, lastName, description, image } = await c.req.valid(
      "json"
    );

    const updatedCreator = await prisma.user.update({
      where: { id },
      data: {
        name: firstName + " " + lastName,
        description,
        image,
      },
    });

    return c.json(updatedCreator);
  })
  .put(
    "/subscribe/:id",
    zValidator("json", z.object({ channelId: z.string(), userId: z.string() })),
    async (c) => {
      console.log("hello");
      try {
        const { channelId, userId } = await c.req.valid("json");

        // Find the channel by ID
        const channel = await prisma.channel.findUnique({
          where: { id: channelId },
          include: { subscribers: true },
        });

        if (!channel) {
          return c.json({ error: "Channel not found." }, { status: 404 });
        }

        // Check if the user is already subscribed
        const isSubscribed = channel.subscribers.some(
          (subscriber) => subscriber.id === userId
        );

        if (isSubscribed) {
          // If the user is already subscribed, remove them from the subscribers
          await prisma.channel.update({
            where: { id: channelId },
            data: {
              subscribers: {
                disconnect: { id: userId }, // Remove the user from the subscribers array
              },
            },
            include: { subscribers: true }, // Include updated subscribers in the response
          });

          return c.json({ isSubscribed: false }, { status: 200 });
        } else {
          // If the user is not subscribed, add them to the subscribers
          await prisma.channel.update({
            where: { id: channelId },
            data: {
              subscribers: {
                connect: { id: userId }, // Add the user to the subscribers array
              },
            },
            include: { subscribers: true }, // Include updated subscribers in the response
          });

          return c.json({ isSubscribed: true }, { status: 200 });
        }
      } catch (error) {
        console.error("Subscription error:", error);
        return c.json(
          { error: "An error occurred while updating subscription." },
          { status: 500 }
        );
      }
    }
  );

export default app;
