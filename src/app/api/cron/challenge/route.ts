import prisma from "@/app/server/db/prisma";
import { subDays } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  const today = new Date();

  const previousDay = subDays(today, 1);

  const startOfPreviousDay = new Date(previousDay.setHours(0, 0, 0, 0));
  const endOfPreviousDay = new Date(previousDay.setHours(23, 59, 59, 999));

  // Query records created on the previous day with a specific status
  const challenge = await prisma.challenge.findFirst({
    where: {
      createdAt: {
        gte: startOfPreviousDay,
        lte: endOfPreviousDay,
      },
    },
  });

  if (challenge) {
    // Fetch all submitted videos with creator details
    const videos = await prisma.video.findMany({
      where: { id: { in: challenge!.submitVideos } },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        views: true,
        likes: true,
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
            _count: {
              select: { subscriptions: true },
            },
          },
        },
      },
    });

    // Sort videos by likes count and get top 5
    const leaderboards = videos
      .map((video) => ({
        creatorId: video.creator.id,
        name: video.creator.name,
        image: video.creator.image,
        subscribers: video.creator._count.subscriptions,
        totalLikes: video.likes.length,
      }))
      .sort((a, b) => b.totalLikes - a.totalLikes)
      .slice(0, 5);

    const leaderboardUsers = leaderboards.map(
      (leaderboard) => leaderboard.creatorId
    );

    const updatedChallenge = await prisma.challenge.update({
      where: {
        id: challenge.id,
      },
      data: {
        status: "close",
        winners: leaderboardUsers,
      },
    });

    return NextResponse.json(
      { challenge: updatedChallenge },
      {
        status: 200,
      }
    );
  }
}
