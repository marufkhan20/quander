import prisma from "@/app/server/db/prisma";
import { createNotification } from "@/app/server/services/notificationService";
import { NextResponse } from "next/server";

// update video generate field
export async function PUT(
  req: Request,
  { params }: { params: { videoId: string } }
) {
  const body = await req.json();
  const { videoId } = params;

  try {
    const updatedVideo = await prisma.video.update({
      where: { id: videoId },
      data: body,
    });

    // create notification for video generate
    const notification = await createNotification({
      creatorId: updatedVideo?.creatorId,
      title: "Your video is ready! Click Here",
      image: updatedVideo?.thumbnail,
      icon: "",
      link:
        updatedVideo?.orientation === "portrait"
          ? `/shorts/${videoId}`
          : `/watch/${videoId}`,
    });

    return NextResponse.json({ updatedVideo, notification }, { status: 200 });
  } catch (error) {
    console.error("Error  publishing video:", error);
    return NextResponse.json(
      { error: "Error publishing video" },
      { status: 500 }
    );
  }
}
