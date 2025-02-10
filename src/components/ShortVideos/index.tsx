import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ShortVideo from "./ShortVideo";

const ShortVideos = () => {
  return (
    <section className="mt-6 mb-10 relative">
      <Carousel>
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <h2 className="text-white/60 text-lg font-semibold">
            Short Form Videos
          </h2>
          <div className="flex items-center gap-2">
            <CarouselPrevious className="bg-white/5 size-9 border-none hover:bg-primary" />
            <CarouselNext className="bg-white/5 size-9 border-none hover:bg-primary" />
          </div>
        </div>

        <div className="mt-3">
          <CarouselContent>
            <CarouselItem className="basis-1/5">
              <ShortVideo />
            </CarouselItem>
            <CarouselItem className="basis-1/5">
              <ShortVideo />
            </CarouselItem>
            <CarouselItem className="basis-1/5">
              <ShortVideo />
            </CarouselItem>
            <CarouselItem className="basis-1/5">
              <ShortVideo />
            </CarouselItem>
            <CarouselItem className="basis-1/5">
              <ShortVideo />
            </CarouselItem>
            <CarouselItem className="basis-1/5">
              <ShortVideo />
            </CarouselItem>
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
};

export default ShortVideos;
