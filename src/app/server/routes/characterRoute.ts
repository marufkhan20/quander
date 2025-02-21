import prisma from "@/app/server/db/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get("/", async (c) => {
    const { userId, sort, published } = c.req.query();

    const characters = await prisma.character.findMany({
      where: {
        creatorId: userId,
        published: published === "true" ? true : false,
      },
      orderBy: {
        createdAt: sort === "desc" ? "desc" : "asc",
      },
    });

    return c.json(characters);
  })
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
