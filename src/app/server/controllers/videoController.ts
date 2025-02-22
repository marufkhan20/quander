import { Prisma, VideoType } from "@prisma/client";
import { Context } from "hono";
import prisma from "../db/prisma";

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

  if (targetVideo) {
    const titleKeywords = targetVideo.title.split(" ").slice(0, 2).join(" ");

    const relatedVideos = await prisma.video.findMany({
      where: {
        id: { not: id },
        orientation: targetVideo.orientation,
        type: targetVideo.type,
        published: true,
        OR: [
          { title: { contains: titleKeywords, mode: "insensitive" } },
          ...(targetVideo.tag ? [{ tag: targetVideo.tag }] : []),
        ],
      },
      select: {
        title: true,
        thumbnail: true,
        views: true,
        id: true,
      },
      ...(limit ? { take: Number(limit) } : {}),
      orderBy: {
        views: "desc",
      },
    });

    return c.json(relatedVideos);
  }

  return c.json([]);
};

export const getVideoController = async (c: Context) => {
  const { id } = c.req.param();

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

  let previousVideoId;
  let nextVideoId;

  if (video) {
    const previousVideo = await prisma.video.findFirst({
      where: {
        createdAt: { lt: video.createdAt },
        orientation: video?.orientation,
        published: true,
        generated: true,
      }, // Get the previous video
      orderBy: { createdAt: "desc" },
    });

    const nextVideo = await prisma.video.findFirst({
      where: {
        createdAt: { gt: video.createdAt },
        orientation: video?.orientation,
        published: true,
        generated: true,
      }, // Get the next video
      orderBy: { createdAt: "asc" },
    });

    previousVideoId = previousVideo?.id;
    nextVideoId = nextVideo?.id;

    console.log("previous id", previousVideo?.id);
    console.log("next id", nextVideo?.id);
  }

  return c.json({ ...video, previousVideoId, nextVideoId });
};
