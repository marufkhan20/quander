import prisma from "@/app/server/db/prisma";
import { Prisma, VideoType } from "@prisma/client";
import { Context } from "hono";

export const getVideosController = async (c: Context) => {
  try {
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

    type VideoWithOptionalCreator = Prisma.VideoGetPayload<{
      include: {
        creator?: { select: { name: true; image: true } };
      };
    }>;

    return c.json(videos as VideoWithOptionalCreator[]);
  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
};

export const getRelatedVideosController = async (c: Context) => {
  const { id, limit } = c.req.query();

  // First, find the target video
  const targetVideo = await prisma.video.findUnique({
    where: { id },
    select: {
      title: true,
      tag: true,
      creatorId: true,
      orientation: true,
      type: true,
    },
  });

  console.log("targetVideo", targetVideo);

  if (!targetVideo) {
    return c.json({ message: "Video not found" }, 404);
  }

  // Now, find related videos based on matching attributes
  const relatedVideos = await prisma.video.findMany({
    where: {
      id: { not: id },
      // orientation: targetVideo.orientation,
      // type: targetVideo.type,
      // published: true, // Exclude the given video
      OR: [
        { title: { contains: targetVideo.title, mode: "insensitive" } },
        {
          tag: targetVideo.tag
            ? { contains: targetVideo.tag, mode: "insensitive" }
            : null,
        },
      ],
    },
    ...(limit ? { take: Number(limit) } : {}),
    orderBy: {
      views: "desc",
    },
  });

  return c.json(relatedVideos);
};

export const getVideoController = async (c: Context) => {
  try {
    const { id } = c.req.param();

    console.log("id", id);

    const video = await prisma.video.findUnique({
      where: { id },
      include: {
        creator: true,
        channel: {
          include: {
            subscribers: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc", // Order comments in descending order
          },
        },
      },
    });

    return c.json(video);
  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
};
