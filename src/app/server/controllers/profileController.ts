import { Context } from "hono";
import prisma from "../db/prisma";

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

  const videos = await prisma.video.findMany({
    where: { creatorId: id },
    select: { likes: true },
  });

  // Calculate total likes by summing up the length of all likes arrays
  const totalLikes = videos.reduce(
    (sum, video) => sum + (video.likes?.length || 0),
    0
  );

  return c.json({ ...creator, totalLikes });
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
