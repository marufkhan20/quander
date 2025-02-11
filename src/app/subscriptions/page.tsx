import ShortVideos from "@/components/ShortVideos";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Videos from "@/components/Videos";
import User from "./_components/User";

const Subscriptions = () => {
  return (
    <main className="pb-20">
      <section className="p-5 pb-0 relative bg-white-2 rounded-[10px]">
        <Carousel>
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <h2 className="text-white/60 text-lg font-semibold">
              Users You Know
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60">12 of 84</span>
              <div className="flex items-center gap-2">
                <CarouselPrevious className="bg-white/5 size-9 border-none hover:bg-primary" />
                <CarouselNext className="bg-white/5 size-9 border-none hover:bg-primary" />
              </div>
            </div>
          </div>

          <div className="mt-3 pb-4">
            <CarouselContent className="gap-[30px]">
              <CarouselItem className="basis-1/3 flex flex-col gap-[10px] divide-y-[1px] divide-white/5">
                <User />
                <User />
                <User />
                <User />
              </CarouselItem>
              <CarouselItem className="basis-1/3 flex flex-col gap-[10px] divide-y-[1px] divide-white/5">
                <User />
                <User />
                <User />
                <User />
              </CarouselItem>
              <CarouselItem className="basis-1/3 flex flex-col gap-[10px] divide-y-[1px] divide-white/5">
                <User />
                <User />
                <User />
                <User />
              </CarouselItem>
              <CarouselItem className="basis-1/3 flex flex-col gap-[10px] divide-y-[1px] divide-white/5">
                <User />
                <User />
                <User />
                <User />
              </CarouselItem>
              <CarouselItem className="basis-1/3 flex flex-col gap-[10px] divide-y-[1px] divide-white/5">
                <User />
                <User />
                <User />
                <User />
              </CarouselItem>
            </CarouselContent>
          </div>
        </Carousel>
      </section>

      <Videos title="Latest Videos From Subscriptions" />
      <ShortVideos title="Latest Shorts From Subscriptions" />
    </main>
  );
};

export default Subscriptions;
