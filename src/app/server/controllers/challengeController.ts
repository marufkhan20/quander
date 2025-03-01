import prisma from "@/app/server/db/prisma";
import { Context } from "hono";

export const getChallengesController = async (c: Context) => {
  const challenges = await prisma.challenge.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return c.json(challenges);
};

export const getChallengeController = async (c: Context) => {
  const { id } = c.req.param();

  const challenge = await prisma.challenge.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      status: true,
      submitVideos: true, // Array of video IDs
    },
  });

  // Fetch all submitted videos with creator details
  const videos = await prisma.video.findMany({
    where: { id: { in: challenge!.submitVideos } },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      views: true,
      likes: true, // Array of user IDs who liked the video
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
          _count: {
            select: { subscriptions: true }, // Total subscribers
          },
        },
      },
    },
  });

  // Sort videos by likes count and get top 5
  const leaderboards = videos
    .map((video) => ({
      name: video.creator.name,
      image: video.creator.image,
      subscribers: video.creator._count.subscriptions,
      totalLikes: video.likes.length,
    }))
    .sort((a, b) => b.totalLikes - a.totalLikes) // Sort by likes
    .slice(0, 5); // Get only top 5 users

  const { ...cleanChallenge } = challenge;

  return c.json({ ...cleanChallenge, submitVideos: videos, leaderboards });
};
