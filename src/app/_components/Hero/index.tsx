import { useGetVideos } from "@/api/useVideos";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Orientation } from "@/contants";
import FeaturedVideo, { FeaturedVideoSkeleton } from "./FeaturedVideo";

const Hero = () => {
  const { data: featuredVideos, isLoading } = useGetVideos({
    orientation: Orientation.longVideos,
    queryKey: "featured-videos",
    published: true,
    sort: "desc",
    type: "regular",
    limit: 2,
    userInfo: true,
  });
  return (
    <>
      <Carousel>
        <CarouselContent>
          {featuredVideos?.map((video) => (
            <FeaturedVideo
              thumbnail={video?.thumbnail || ""}
              description={video?.description || ""}
              id={video?.id}
              likes={video?.likes}
              views={video?.views}
              title={video?.title}
              userImage={video?.creator?.image || ""}
              userName={video?.creator?.name || ""}
              key={video?.id}
            />
          ))}

          {isLoading && (
            <>
              <FeaturedVideoSkeleton />
              <FeaturedVideoSkeleton />
            </>
          )}
        </CarouselContent>
      </Carousel>

      {!isLoading && !featuredVideos && (
        <h2 className="text-white/60 text-base font-medium">
          No Featured Video Found!!
        </h2>
      )}
    </>
  );
};

export default Hero;
