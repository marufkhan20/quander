import prisma from "@/app/server/db/prisma";
import { Video } from "@prisma/client";

export class FeaturedVideoService {
  public async getFeaturedVideos(orientation: string): Promise<Video[] | null> {
    return await prisma.video.findMany({
      where: {
        published: true,
        orientation,
      },
    });
  }
}
