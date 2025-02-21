import prisma from "@/app/server/db/prisma";
import { VideoType } from "@prisma/client";
import { Context } from "hono";

export const getVideosController = async (c: Context) => {
  const { userId, orientation, type, sort, published, limit, userInfo } =
    c.req.query();

  const videos = await prisma.video.findMany({
    where: {
      creatorId: userId,
      published: published === "true" ? true : false,
      orientation,
      type: type === "challange" ? VideoType.challange : VideoType.regular,
    },
    ...(limit ? { take: Number(limit) } : {}),
    ...(userInfo === "true"
      ? {
          include: {
            creator: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        }
      : {}),
    orderBy: {
      createdAt: sort === "desc" ? "desc" : "asc",
    },
  });

  // console.log("videos", videos);

  return c.json(videos);
};

export const getVideoController = async (c: Context) => {
  const { id } = c.req.param();

  const video = await prisma.video.findUnique({
    where: { id },
    include: {
      creator: true,
      channel: {
        include: {
          subscribers: true, // Include the subscribers of the channel
        },
      },
      comments: {
        include: { author: true }, // Include the author details for each comment
      },
    },
  });

  return c.json(video);
};
