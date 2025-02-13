/* eslint-disable @next/next/no-img-element */
import {
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowDownToLine, Clock, Ellipsis, Heart, Play } from "lucide-react";
import Link from "next/link";

const FeaturedVideo = () => {
  return (
    <CarouselItem className="basis-1/1.2 lg:basis-full">
      <header className="relative sm:h-[600px] sm:p-[30px] flex flex-col justify-between sm:gap-5 rounded-xl overflow-hidden">
        <img
          src="/images/bg.jpg"
          className="sm:absolute inset-0 w-full h-full sm:rounded-xl object-cover object-bottom -z-20"
          alt=""
        />
        <div className="hidden sm:block bg-[linear-gradient(261.9deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.56)_78.71%,#000_100%)] absolute inset-0 w-full h-full -z-10 rounded-xl" />

        <div className="flex items-center gap-[10px] py-1 px-3 rounded-full bg-white/5 w-fit backdrop-blur-[20px] absolute top-[10px] left-[10px] sm:relative sm:left-0 sm:right-0">
          🔥
          <p className="text-sm">Now Popular</p>
        </div>

        <div className="flex items-end justify-between gap-5 flex-wrap p-5 sm:p-0 bg-white/5 sm:bg-transparent">
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/images/profile.jpg"
                className="size-8 rounded-full"
                alt=""
              />
              <p className="font-medium">Anna R</p>
            </div>
            <h2 className="mt-6 font-extrabold text-[20px] leading-[18px] sm:text-[26px] sm:leading-[18px]">
              Title of the video
            </h2>
            <div className="flex items-center gap-2 mt-[18px]">
              <div className="flex items-center gap-1 pr-2 border-r border-white/20">
                <Play className="size-[18px]" />
                <span>7.5K</span>
              </div>
              <div className="flex items-center gap-1 pr-2 border-r border-white/20">
                <Heart className="size-[18px]" />
                <span>864</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-[18px]" />
                <span>58m</span>
              </div>
            </div>
            <p className="text-sm sm:text-base sm:w-[360px] text-white/80 mt-[18px] leading-[20px]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
              possimus magni vel id recusandae, facilis aliquid suscipit quas
              quo tempore harum perspiciatis velit mollitia dignissimos debitis
              laboriosam doloremque quisquam officiis?
            </p>
            <div className="mt-6 flex items-center flex-wrap gap-[10px]">
              <Link
                href="/watch/video-1"
                className="flex items-center gap-[10px] bg-primary rounded-sm px-4 py-2.5 text-black transition-all hover:scale-105 duration-300"
              >
                <Play className="size-4" />
                <span>Watch Now</span>
              </Link>
              <button className="flex items-center gap-[10px] bg-black/50 rounded-sm px-4 py-2.5 text-primary transition-all hover:scale-105 duration-300 backdrop-blur-[20px]">
                <ArrowDownToLine className="size-4" />
                <span>Download</span>
              </button>
              <button className="flex items-center gap-[10px] bg-black/50 rounded-sm px-4 py-2.5 text-primary transition-all hover:scale-105 duration-300 backdrop-blur-[20px] min-h-10">
                <Ellipsis className="size-[18px]" />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <CarouselPrevious className="bg-white/5 size-9 border-none hover:bg-primary" />
            <CarouselNext className="bg-white/5 size-9 border-none hover:bg-primary" />
          </div>
        </div>
      </header>
    </CarouselItem>
  );
};

export default FeaturedVideo;
