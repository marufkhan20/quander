import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Video from "./Video";

const Videos = () => {
  return (
    <section className="mt-6 relative">
      <Carousel>
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <h2 className="text-white/60 text-lg font-semibold">
            Discover Their Stories
          </h2>
          <div className="flex items-center gap-2">
            <CarouselPrevious className="bg-white/5 size-9 border-none hover:bg-primary" />
            <CarouselNext className="bg-white/5 size-9 border-none hover:bg-primary" />
          </div>
        </div>

        <div className="mt-3">
          <CarouselContent>
            <CarouselItem className="basis-1/3">
              <Video />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <Video />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <Video />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <Video />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <Video />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <Video />
            </CarouselItem>
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
};

export default Videos;
