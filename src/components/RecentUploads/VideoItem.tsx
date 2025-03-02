import { formatNumbers } from "@/lib/utils";
import { Heart, Play } from "lucide-react";
import Link from "next/link";
import ImageSkeleton from "../ui/image";

/* eslint-disable @next/next/no-img-element */

interface IProps {
  id: string;
  title: string | null;
  thumbnail: string | null;
  views: number;
  likes: number;
}

const VideoItem = ({ id, title, thumbnail, views, likes }: IProps) => {
  return (
    <Link
      href={`/watch/${id}`}
      className="flex items-center gap-3 cursor-pointer group transition-all"
    >
      {thumbnail ? (
        <img
          className="size-14 rounded object-cover"
          src={thumbnail}
          alt={title || ""}
        />
      ) : (
        <ImageSkeleton className="size-14 rounded" />
      )}
      <div className="flex-1">
        <h4 className="text-sm transition-all group-hover:text-primary font-semibold text-[#f1f1f1]">
          {title}
        </h4>
        <div className="flex items-center mt-2 gap-2">
          <div className="flex items-center gap-1 pr-2 border-r border-white/20">
            <Play className="size-[18px]" />
            <span>{formatNumbers(views)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="size-[18px]" />
            <span>{formatNumbers(likes)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoItem;
