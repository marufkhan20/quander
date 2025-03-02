import prisma from "@/app/server/db/prisma";
import { createNotification } from "@/app/server/services/notificationService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const id = searchParams.get("id");

  try {
    const video = await prisma.video.findUnique({
      where: { id: id as string },
    });

    if (video) {
      if (video?.challengeId) {
        // update challenge submitVideos
        await prisma.challenge.update({
          where: { id: video.challengeId },
          data: {
            submitVideos: {
              push: video?.id,
            },
          },
        });
      }

      // Create a notification after video generation
      const notification = await createNotification({
        creatorId: video?.creatorId,
        title: "Your video is ready! Click Here",
        image: video?.thumbnail,
        icon: "",
        link:
          video?.orientation === "portrait" ? `/shorts/${id}` : `/watch/${id}`,
      });

      return NextResponse.json({ video, notification }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Video not found!! Please send correct video id." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error publishing video:", error);
    return NextResponse.json(
      { error: "Error publishing video" },
      { status: 500 }
    );
  }
}
