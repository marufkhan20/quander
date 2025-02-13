"use client";
/* eslint-disable @next/next/no-img-element */
import Comments from "@/components/Comments";
import CommentBox from "@/components/Comments/CommentBox";
import Breadcumb from "@/components/Shared/Breadcumb";
import EditVideo from "@/components/Shared/EditVideo";
import VideoPlayer from "@/components/Shared/VideoPlayer";
import ShortVideos from "@/components/ShortVideos";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Edit,
  Heart,
  Play,
  User,
} from "lucide-react";
import { useState } from "react";

const ShortsPage = () => {
  const isAuthor = false;
  const [openCommentBox, setOpenCommentBox] = useState(false);
  return (
    <main>
      <Breadcumb page={"Shorts"} />

      <div className="flex items-start flex-col md:flex-row gap-[30px] mt-[10px]">
        <div className="w-full sm:w-[380px] lg:w-[470px] flex gap-[30px] items-center">
          <div className="flex-1 h-fit">
            <VideoPlayer
              src="/videos/short-video.mp4"
              thumbnail="/images/videos/short-thumbnail.avif"
            />
          </div>
          <div className="hidden md:flex flex-col gap-2">
            <button className="size-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-black">
              <ChevronUp />
            </button>
            <button className="size-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-black">
              <ChevronDown />
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="pb-10 border-b border-white/10">
            <div className="flex items-center justify-between gap-5 flex-wrap">
              <h2 className="text-[20px] leading-[18px] md:text-[26px] font-semibold">
                Title of the video
              </h2>
              <div className="flex items-center gap-[10px]">
                <span className="inline-block py-4 px-5 bg-white/5 rounded-lg">
                  Comedy
                </span>
                <div className="!w-11 !h-11 rounded-full flex items-center justify-center cursor-pointer bg-[#d1f561]/5 transition-all hover:bg-primary hover:text-black text-primary">
                  <Download className="size-6" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-[#e24988] bg-[#e24988]/5 cursor-pointer">
                    <Heart className="size-6" />
                  </div>
                  <span>1850</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              quibusdam eius aliquam minima sapiente consequuntur maiores sit,
              rem soluta nemo vitae nesciunt accusamus, repellat laboriosam
              asperiores enim laudantium adipisci officia mollitia iure minus
              atque ut odio deserunt. Iure labore et illum illo beatae? Expedita
              dolorum exercitationem consequuntur est atque debitis tempore
              recusandae maiores, omnis explicabo aspernatur laudantium?
              Dolorum, consequuntur laboriosam!
            </p>

            <div className="flex items-center gap-2 mt-6">
              <div className="flex items-center gap-1 pr-2 border-r border-white/20">
                <Play className="size-[18px]" />
                <span>7.5K</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-[18px]" />
                <span>58m</span>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between gap-5 flex-wrap">
              <div className="flex items-center gap-2 w-fit p-1 pr-10 transition-all cursor-pointer hover:bg-primary/40 rounded-xl">
                <img
                  src="/images/profile.jpg"
                  alt="profile"
                  className="size-[50px] rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-xl font-medium">Anna R</h4>
                  <span className="text-white/50">6K subscribers</span>
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
      </div>

      <div className="mt-[60px]">
        <ShortVideos
          title={
            <h3 className="font-semibold text-lg md:text-[22px] tracking-tight">
              You May Like
            </h3>
          }
        />
      </div>
    </main>
  );
};

export default ShortsPage;
