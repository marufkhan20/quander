"use client";

import { useGetLikesVideos } from "@/api/useVideos";
import ShortVideo, {
  ShortVideoLoading,
} from "@/components/ShortVideos/ShortVideo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Video, { VideoLoading } from "@/components/Videos/Video";
import { Orientation } from "@/contants";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const LikesVideos = () => {
  const { data: session } = useSession();

  // long videos
  const {
    data: videos,
    isLoading,
    refetch,
  } = useGetLikesVideos({
    orientation: Orientation.longVideos,
    queryKey: "get-likes-videos",
    published: true,
    sort: "desc",
    userId: session?.user?.id as string,
  });

  // short videos
  const {
    data: shortVideos,
    isLoading: isShortLoading,
    refetch: refetchShortVideos,
  } = useGetLikesVideos({
    orientation: Orientation.shortVideos,
    queryKey: "get-likes-shorts-videos",
    published: true,
    sort: "desc",
    userId: session?.user?.id as string,
  });

  useEffect(() => {
    if (session?.user?.id) {
      refetch();
      refetchShortVideos();
    }
  }, [session, refetch, refetchShortVideos]);
  return (
    <main className="md:pb-20">
      <section className="mt-6 relative">
        <Carousel>
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <h2 className="text-white/60 text-lg font-semibold">
              Your Likes Videos
            </h2>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="bg-white/5 size-9 border-none hover:bg-primary" />
              <CarouselNext className="bg-white/5 size-9 border-none hover:bg-primary" />
            </div>
          </div>

          <div className="mt-3">
            <CarouselContent>
              {videos &&
                videos?.map((video) => (
                  <CarouselItem
                    key={video?.id}
                    className="basis-1/1.3 sm:basis-1/2.5 xl:basis-1/3.5"
                  >
                    <Video
                      thumbnail={video?.thumbnail}
                      id={video?.id}
                      title={video?.title}
                      views={video?.views}
                    />
                  </CarouselItem>
                ))}

              {isLoading && (
                <>
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <CarouselItem
                      key={idx}
                      className="basis-1/1.3 sm:basis-1/2.5 xl:basis-1/3.5"
                    >
                      <VideoLoading />
                    </CarouselItem>
                  ))}
                </>
              )}
            </CarouselContent>
          </div>
        </Carousel>

        {(!isLoading && !videos) ||
          (videos?.length === 0 && (
            <h2 className="text-white/60 text-base font-medium">
              No Video Found!!
            </h2>
          ))}
      </section>

      <section className="mt-6 mb-10 relative">
        <Carousel>
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <h2 className="text-white/60 text-lg font-semibold">
              Your Likes Short Videos
            </h2>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="bg-white/5 size-9 border-none hover:bg-primary" />
              <CarouselNext className="bg-white/5 size-9 border-none hover:bg-primary" />
            </div>
          </div>

          <div className="mt-3">
            <CarouselContent>
              {shortVideos &&
                shortVideos?.map((video) => (
                  <CarouselItem
                    key={video?.id}
                    className="basis-1/2.5 sm:basis-1/3.5 xl:basis-1/5.5"
                  >
                    <ShortVideo
                      id={video?.id}
                      title={video?.title}
                      thumbnail={video?.thumbnail}
                      views={video?.views}
                    />
                  </CarouselItem>
                ))}

              {isShortLoading && (
                <>
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <CarouselItem
                      key={idx}
                      className="basis-1/2.5 sm:basis-1/3.5 xl:basis-1/5.5"
                    >
                      <ShortVideoLoading />
                    </CarouselItem>
                  ))}
                </>
              )}
            </CarouselContent>
          </div>
        </Carousel>

        {(!isShortLoading && !shortVideos) ||
          (shortVideos?.length === 0 && (
            <h2 className="text-white/60 text-base font-medium">
              No Short Video Found!!
            </h2>
          ))}
      </section>
    </main>
  );
};

export default LikesVideos;
