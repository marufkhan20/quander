/* eslint-disable @next/next/no-img-element */
import ImageSkeleton from "@/components/ui/image";
import { formatNumbers } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";

interface IProps {
  user: {
    id: string;
    name: string;
    image: string | null;
    totalVideos: number;
    totalSubscribers: number;
    totalVideoLikes: number;
  };
}

const User = ({ user }: IProps) => {
  const { id, name, image, totalSubscribers, totalVideoLikes, totalVideos } =
    user || {};
  return (
    <Link
      href={`/profile/${id}`}
      className="pt-[10px] flex items-center justify-between gap-5 flex-wrap"
    >
      <div className="flex items-center gap-[8px]">
        {image ? (
          <img
            src={image}
            alt={name}
            className="size-8 rounded-full object-cover"
          />
        ) : (
          <ImageSkeleton className="size-8 rounded-full" />
        )}
        <div>
          <h4 className="text-base font-medium leading-[19px]">{name}</h4>
          <span className="text-white/40 text-[11px]">
            {formatNumbers(totalSubscribers)}{" "}
            {totalSubscribers > 1 ? "followers" : "follower"}
          </span>
        </div>
      </div>
      <div className="flex gap-[10px]">
        <div className="flex items-center gap-1">
          <div className="size-[5px] bg-[#df3840] rounded-full" />
          <span className="text-xs">
            {formatNumbers(totalVideos)} new videos
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-white/80">
          <Heart className="size-[14px]" />{" "}
          <span>{formatNumbers(totalVideoLikes)}</span>
        </div>
      </div>
    </Link>
  );
};

export default User;

export function UserSkeleton() {
  return (
    <div className="pt-[10px] flex items-center justify-between gap-5 flex-wrap">
      {/* User info section */}
      <div className="flex items-center gap-[8px]">
        {/* Avatar */}
        <div className="size-8 rounded-full bg-white/[0.08] animate-pulse" />

        {/* Name and followers */}
        <div>
          <div className="h-[19px] w-24 bg-white/[0.08] rounded-md animate-pulse" />
          <div className="h-[11px] w-16 bg-white/[0.08] rounded-md animate-pulse mt-1" />
        </div>
      </div>

      {/* Stats section */}
      <div className="flex gap-[10px]">
        {/* Videos count */}
        <div className="flex items-center gap-1">
          <div className="size-[5px] bg-white/[0.08] rounded-full animate-pulse" />
          <div className="h-[14px] w-20 bg-white/[0.08] rounded-md animate-pulse" />
        </div>

        {/* Likes count */}
        <div className="flex items-center gap-1">
          <div className="size-[14px] bg-white/[0.08] rounded-sm animate-pulse" />
          <div className="h-[14px] w-8 bg-white/[0.08] rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}
