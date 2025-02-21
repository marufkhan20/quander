"use client";
/* eslint-disable @next/next/no-img-element */
import { useGetVideo } from "@/api/useVideos";
import Comments from "@/components/Comments";
import CommentBox from "@/components/Comments/CommentBox";
import Breadcumb from "@/components/Shared/Breadcumb";
import EditVideo from "@/components/Shared/EditVideo";
import VideoPlayer from "@/components/Shared/VideoPlayer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ImageSkeleton from "@/components/ui/image";
import Video from "@/components/Videos/Video";
import { formatNumbers } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Clock,
  Download,
  Edit,
  Heart,
  Play,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import WatchPageLoading from "./_components/Loading";

const WatchPage = () => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const { id } = useParams();

  // get video
  const { data: video, isLoading } = useGetVideo({
    id: id as string,
    queryKey: `get-video-${id}`,
  });
  return (
    <main>
      <Breadcumb page={"Watch"} />

      <div className="mt-3 flex flex-col md:flex-row justify-between gap-8">
        {isLoading ? (
          <WatchPageLoading />
        ) : (
          <div className="flex-1">
            <div>
              <VideoPlayer thumbnail={video?.thumbnail} src={video?.url} />
            </div>

            <div className="mt-8 pb-10 border-b border-white/10">
              <div className="flex items-center justify-between gap-5 flex-wrap">
                <h2 className="text-[20px] leading-[18px] md:text-[26px] md:leading-[18px] font-semibold">
                  {video?.title}
                </h2>
                <div className="flex items-center gap-[10px]">
                  <span className="inline-block py-4 px-5 bg-white/5 rounded-lg">
                    {video?.tag}
                  </span>
                  <div className="!w-11 !h-11 rounded-full flex items-center justify-center cursor-pointer bg-[#d1f561]/5 transition-all hover:bg-primary hover:text-black text-primary">
                    <Download className="size-6" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-[#e24988] bg-[#e24988]/5 cursor-pointer">
                      <Heart className="size-6" />
                    </div>
                    <span>{formatNumbers(video?.likes)}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm md:text-base mt-6">{video?.description}</p>

              <div className="flex items-center gap-2 mt-6">
                <div className="flex items-center gap-1 pr-2 border-r border-white/20">
                  <Play className="size-[18px]" />
                  <span>{formatNumbers(video?.views)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-[18px]" />
                  <span>58m</span>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between gap-5 flex-wrap">
                <div className="flex items-center gap-2 w-fit p-1 pr-10 transition-all cursor-pointer hover:bg-primary/40 rounded-xl">
                  {video?.creator?.image ? (
                    <img
                      src={video?.creator?.image}
                      alt="profile"
                      className="size-[50px] rounded-xl object-cover"
                    />
                  ) : (
                    <ImageSkeleton className="size-[50px] rounded-xl" />
                  )}
                  <div>
                    <h4 className="text-xl font-medium">
                      {video?.creator?.name}
                    </h4>
                    <span className="text-white/50">
                      {formatNumbers(video?.channel?.subscribers?.length)}{" "}
                      subscribers
                    </span>
                  </div>
                </div>

                {!isAuthor ? (
                  <button className="flex items-center gap-[10px] py-2 px-4 rounded-md text-black text-sm bg-primary transition-all hover:scale-105 duration-300">
                    <User /> <span>Subscribe</span>
                  </button>
                ) : (
                  <Dialog>
                    <DialogTrigger>
                      <button className="flex items-center gap-[10px] py-2 px-4 rounded-md text-sm bg-white/5 transition-all hover:scale-105 hover:bg-primary hover:text-black duration-300">
                        <Edit className="size-4" /> <span>Edit</span>
                      </button>
                    </DialogTrigger>

                    <EditVideo />
                  </Dialog>
                )}
              </div>
            </div>

            <div className="mt-[30px] md:mt-[60px]">
              <button
                className="flex md:hidden items-center justify-between gap-2 w-full px-5 py-6 bg-white-2 rounded-lg mb-4 text-lg cursor-pointer"
                onClick={() => setOpenCommentBox(!openCommentBox)}
              >
                <span className="font-extrabold">
                  Comments <span className="font-normal">(10)</span>
                </span>
                <motion.span
                  animate={{ rotate: openCommentBox ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.span>
              </button>

              {/* mobile */}
              <div className="block md:hidden">
                <AnimatePresence>
                  {openCommentBox && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <CommentBox />

                      <div className="mt-10">
                        <Comments />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden md:block">
                <CommentBox />

                <div className="mt-10">
                  <Comments />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* you may like */}
        <div className="md:w-[292px]">
          <h3 className="font-semibold text-lg text-white/60 md:text-white md:text-[22px] tracking-tight">
            You May Like
          </h3>

          <div className="mt-[10px] hidden md:flex flex-col gap-[10px]">
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
          </div>

          <div className="block md:hidden mt-[10px]">
            <Carousel>
              <CarouselContent>
                <CarouselItem className="basis-1/1.3 sm:basis-1/2.5 xl:basis-1/3.5">
                  <Video />
                </CarouselItem>
                <CarouselItem className="basis-1/1.3 sm:basis-1/2.5 xl:basis-1/3.5">
                  <Video />
                </CarouselItem>
                <CarouselItem className="basis-1/1.3 sm:basis-1/2.5 xl:basis-1/3.5">
                  <Video />
                </CarouselItem>
                <CarouselItem className="basis-1/1.3 sm:basis-1/2.5 xl:basis-1/3.5">
                  <Video />
                </CarouselItem>
                <CarouselItem className="basis-1/1.3 sm:basis-1/2.5 xl:basis-1/3.5">
                  <Video />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WatchPage;
