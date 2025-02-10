import { Play } from "lucide-react";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const Video = () => {
  return (
    <Link
      href="#"
      className="relative hover:scale-105 rounded-lg transition-all block duration-300 overflow-hidden"
    >
      <img src="/images/videos/1.jpg" className="rounded-lg" alt="" />
      <div className="bg-gradient-to-b from-transparent via-transparent rounded-lg to-black absolute inset-0 w-full h-full" />

      <div className="absolute left-0 right-0 bottom-0 w-full p-[10px] flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-sm font-semibold">Title of the video</h3>
        <div className="flex items-center gap-1">
          <Play className="size-[18px]" />
          <span>7.5K</span>
        </div>
      </div>
    </Link>
  );
};

export default Video;
