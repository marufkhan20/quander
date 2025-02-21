import prisma from "@/app/server/db/prisma";
import { Context } from "hono";

export const getProfileByIdController = async (c: Context) => {
  const { id } = c.req.param();
  const isOwner = true;

  let creator;

  if (isOwner) {
    creator = await prisma.user.findUnique({
      where: { id },
      include: {
        ownedChannels: {
          include: {
            subscribers: true,
          },
        },
        subscriptions: true,
      },
    });
  } else {
    creator = await prisma.user.findUnique({
      where: { id },
      include: {
        ownedChannels: {
          include: {
            subscribers: true,
          },
        },
        subscriptions: true,
      },
    });
  }

  const totalLikes = await prisma.video.aggregate({
    where: { creatorId: id },
    _sum: { likes: true },
  });

  return c.json({ ...creator, totalLikes: totalLikes._sum.likes || 0 });
};

// export const updateProfileController = async (c: Context) => {
//   const { id } = c.req.param();
//   const { firstName, lastName, description, image } = c.req.valid("json");

//   const updatedCreator = await prisma.user.update({
//     where: { id },
//     data: {
//       name: firstName + " " + lastName,
//       description,
//       image,
//     },
//   });

//   return c.json(updatedCreator);
// };
