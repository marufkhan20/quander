import { Heart, Play } from "lucide-react";

/* eslint-disable @next/next/no-img-element */
const VideoItem = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group transition-all">
      <img
        className="size-14 rounded object-cover"
        src="/images/videos/3.jpg"
        alt=""
      />
      <div className="flex-1">
        <h4 className="text-sm transition-all group-hover:text-primary font-semibold text-[#f1f1f1]">
          Title of the video
        </h4>
        <div className="flex items-center mt-2 gap-2">
          <div className="flex items-center gap-1 pr-2 border-r border-white/20">
            <Play className="size-[18px]" />
            <span>7.5K</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="size-[18px]" />
            <span>864</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
