import prisma from "@/app/server/db/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
  getChallengeController,
  getChallengesController,
} from "../controllers/challengeController";

const app = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        title: z.string(),
        description: z.string(),
        thumbnail: z.string().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
    ),
    async (c) => {
      const { description, title, thumbnail, createdAt, updatedAt } =
        c.req.valid("json");

      const newChallenge = await prisma.challenge.create({
        data: {
          title,
          description,
          thumbnail,
          createdAt,
          updatedAt,
        },
      });

      const users = await prisma.user.findMany({
        select: { id: true },
      });

      const notifications = users.map((user) => ({
        creatorId: user.id,
        title: `New challenge available: ${title}!`,
        icon: "trophy",
        link: "/daily-challenges",
        read: false,
      }));

      console.log("notifications", notifications);

      await prisma.notification.createMany({
        data: notifications,
      });

      return c.json(newChallenge);
    }
  )
  .get("/", getChallengesController)
  .get("/:id", getChallengeController)
  .put(
    "/:id",
    zValidator(
      "json",
      z.object({
        published: z.boolean().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        picture: z.string().optional(),
        description: z.string().optional(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const { published, firstName, lastName, picture, description } =
        await c.req.valid("json");

      const updatedCharacter = await prisma.character.update({
        where: { id },
        data: {
          published,
          name: firstName + " " + lastName,
          description,
          picture,
        },
      });

      return c.json(updatedCharacter);
    }
  )
  .delete("/:id", async (c) => {
    const { id } = c.req.param();

    const deletedCharacter = await prisma.character.delete({
      where: { id },
    });

    return c.json(deletedCharacter);
  });

export default app;
