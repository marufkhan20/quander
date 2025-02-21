import { useGetVideos } from "@/api/useVideos";
import { Orientation } from "@/contants";
import { ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ShortVideo, { ShortVideoLoading } from "./ShortVideo";

interface IProps {
  title?: string | ReactNode;
}

const ShortVideos = ({ title }: IProps) => {
  const { data: videos, isLoading } = useGetVideos({
    orientation: Orientation.shortVideos,
    type: "regular",
    queryKey: "get-home-shorts-videos",
    published: true,
    sort: "desc",
  });
  return (
    <section className="mt-6 mb-10 relative">
      <Carousel>
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <h2 className="text-white/60 text-lg font-semibold">
            {title || "Short Form Videos"}
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

      {!isLoading && !videos && (
        <h2 className="text-white/60 text-base font-medium">
          No Video Found!!
        </h2>
      )}
    </section>
  );
};

export default ShortVideos;
