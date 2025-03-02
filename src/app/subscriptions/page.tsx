"use client";
import { useGetSubscribersVideos } from "@/api/useVideos";
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
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import User, { UserSkeleton } from "./_components/User";

const Subscriptions = () => {
  const { data: session } = useSession();

  const {
    data: subscriptions,
    refetch,
    isLoading: loading,
    isRefetching,
  } = useGetSubscribersVideos({
    queryKey: "subscribers-videos",
    userId: session?.user?.id as string,
  });

  useEffect(() => {
    if (session) {
      refetch();
    }
  }, [session, refetch]);

  const isLoading = loading || isRefetching;
  return (
    <main className="md:pb-20">
      <section className="p-5 pb-0 relative bg-white-2 rounded-[10px]">
        <Carousel>
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <h2 className="text-white/60 text-lg font-semibold">
              Users You Know
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60">12 of 84</span>
              <div className="hidden md:flex items-center gap-2">
                <CarouselPrevious className="bg-white/5 size-9 border-none hover:bg-primary" />
                <CarouselNext className="bg-white/5 size-9 border-none hover:bg-primary" />
              </div>
            </div>
          </div>

          <div className="mt-3 pb-4">
            <CarouselContent className="gap-5 md:gap-[30px] w-[calc(100vw-100px)] md:w-auto">
              {subscriptions?.subscribers.map((user) => (
                <CarouselItem
                  key={user?.id}
                  className="basis-1/1.2 md:basis-1/2.5 lg:basis-1/3 flex flex-col gap-[10px] divide-y-[1px] divide-white/5 flex-wrap"
                >
                  <User user={user} />
                </CarouselItem>
              ))}

              {isLoading &&
                Array.from({ length: 6 }).map((_, idx) => (
                  <CarouselItem
                    key={idx}
                    className="basis-1/1.2 md:basis-1/2.5 lg:basis-1/3 flex flex-col gap-[10px] divide-y-[1px] divide-white/5 flex-wrap"
                  >
                    <UserSkeleton />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </div>
        </Carousel>
      </section>

      {/* long videos */}
      <section className="mt-6 relative">
        <Carousel>
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <h2 className="text-white/60 text-lg font-semibold">
              Latest Videos From Subscriptions
            </h2>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="bg-white/5 size-9 border-none hover:bg-primary" />
              <CarouselNext className="bg-white/5 size-9 border-none hover:bg-primary" />
            </div>
          </div>

          <div className="mt-3">
            <CarouselContent>
              {subscriptions?.longVideos &&
                subscriptions?.longVideos?.map((video) => (
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

        {!isLoading &&
          (!subscriptions?.longVideos ||
            subscriptions?.longVideos?.length === 0) && (
            <h2 className="text-white/60 text-base font-medium">
              No Video Found!!
            </h2>
          )}
      </section>

      {/* short videos */}
      <section className="mt-6 mb-10 relative">
        <Carousel>
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <h2 className="text-white/60 text-lg font-semibold">
              Latest Shorts From Subscriptions
            </h2>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="bg-white/5 size-9 border-none hover:bg-primary" />
              <CarouselNext className="bg-white/5 size-9 border-none hover:bg-primary" />
            </div>
          </div>

          <div className="mt-3">
            <CarouselContent>
              {subscriptions?.shortVideos &&
                subscriptions?.shortVideos?.map((video) => (
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

              {isLoading && (
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

        {!isLoading &&
          (!subscriptions?.shortVideos ||
            subscriptions?.shortVideos?.length === 0) && (
            <h2 className="text-white/60 text-base font-medium">
              No Short Video Found!!
            </h2>
          )}
      </section>
    </main>
  );
};

export default Subscriptions;
