/* eslint-disable @next/next/no-img-element */
import {
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageSkeleton from "@/components/ui/image";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumbers } from "@/lib/utils";
import { ArrowDownToLine, Clock, Ellipsis, Heart, Play } from "lucide-react";
import Link from "next/link";

interface IProps {
  id: string;
  thumbnail: string;
  userName: string;
  userImage: string;
  title: string;
  description: string;
  likes: number;
  views: number;
}

const FeaturedVideo = ({
  id,
  thumbnail,
  userName,
  userImage,
  title,
  description,
  likes,
  views,
}: IProps) => {
  return (
    <CarouselItem className="basis-1/1.2 lg:basis-full">
      <header className="relative sm:h-[600px] sm:p-[30px] flex flex-col justify-between sm:gap-5 rounded-xl overflow-hidden">
        <img
          src={thumbnail}
          className="sm:absolute inset-0 w-full h-full sm:rounded-xl object-cover object-bottom -z-20"
          alt=""
        />
        <div className="hidden sm:block bg-[linear-gradient(261.9deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.56)_78.71%,#000_100%)] absolute inset-0 w-full h-full -z-10 rounded-xl" />

        <div className="flex items-center gap-[10px] py-1 px-3 rounded-full bg-black/40 w-fit backdrop-blur-[20px] absolute top-[10px] left-[10px] sm:relative sm:left-0 sm:right-0">
          🔥
          <p className="text-sm">Now Popular</p>
        </div>

        <div className="flex items-end justify-between gap-5 flex-wrap p-5 sm:p-0 bg-black/40 sm:bg-transparent">
          <div>
            <div className="flex items-center gap-2">
              {userImage ? (
                <img
                  src={userImage}
                  className="size-8 rounded-full object-cover"
                  alt=""
                />
              ) : (
                <ImageSkeleton className="size-8 rounded-full" />
              )}
              <p className="font-medium">{userName}</p>
            </div>
            <h2 className="mt-6 font-extrabold text-[20px] leading-[18px] sm:text-[26px] sm:leading-[18px]">
              {title}
            </h2>
            <div className="flex items-center gap-2 mt-[18px]">
              <div className="flex items-center gap-1 pr-2 border-r border-white/20">
                <Play className="size-[18px]" />
                <span>{formatNumbers(views)}</span>
              </div>
              <div className="flex items-center gap-1 pr-2 border-r border-white/20">
                <Heart className="size-[18px]" />
                <span>{formatNumbers(likes)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-[18px]" />
                <span>58m</span>
              </div>
            </div>
            <p className="text-sm sm:text-base sm:w-[360px] text-white/80 mt-[18px] leading-[20px]">
              {description}
            </p>
            <div className="mt-6 flex items-center flex-wrap gap-[10px]">
              <Link
                href={`/watch/${id}`}
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
            <CarouselPrevious className="bg-black/40 size-9 border-none hover:bg-primary" />
            <CarouselNext className="bg-black/40 size-9 border-none hover:bg-primary" />
          </div>
        </div>
      </header>
    </CarouselItem>
  );
};

export function FeaturedVideoSkeleton() {
  return (
    <CarouselItem className="basis-1/1.2 lg:basis-full">
      <div className="relative w-full bg-white-2 sm:h-[600px] sm:p-[30px] flex flex-col justify-between sm:gap-5 rounded-xl overflow-hidden">
        {/* Now Popular Badge Skeleton */}
        <div className="flex items-center gap-[10px] rounded-full w-fit backdrop-blur-[20px] absolute top-[10px] left-[10px] sm:relative sm:left-0 sm:right-0">
          <Skeleton className="h-4 w-20 bg-black/40" />
        </div>

        <div className="flex items-end justify-between gap-5 flex-wrap p-5 sm:p-0 bg-black/40 sm:bg-transparent">
          <div>
            {/* Profile Section */}
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full bg-black/40" />
              <Skeleton className="h-4 w-20 bg-black/40" />
            </div>

            {/* Title */}
            <div className="mt-6">
              <Skeleton className="h-7 w-[250px] sm:w-[300px] bg-black/40" />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 mt-[18px]">
              <Skeleton className="h-5 w-20 bg-black/40" />
              <Skeleton className="h-5 w-20 bg-black/40" />
              <Skeleton className="h-5 w-20 bg-black/40" />
            </div>

            {/* Description */}
            <div className="mt-[18px] space-y-2">
              <Skeleton className="h-4 w-[300px] sm:w-[360px] bg-black/40" />
              <Skeleton className="h-4 w-[280px] sm:w-[340px] bg-black/40" />
              <Skeleton className="h-4 w-[260px] sm:w-[320px] bg-black/40" />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex items-center flex-wrap gap-[10px]">
              <Skeleton className="h-10 w-32 bg-black/40" />
              <Skeleton className="h-10 w-32 bg-black/40" />
              <Skeleton className="h-10 w-10 bg-black/40" />
            </div>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}

export default FeaturedVideo;
