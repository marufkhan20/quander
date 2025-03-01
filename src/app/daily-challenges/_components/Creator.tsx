/* eslint-disable @next/next/no-img-element */
import ImageSkeleton from "@/components/ui/image";
import { formatNumbers } from "@/lib/utils";
import { Crown } from "lucide-react";

interface IProps {
  position: number;
  name: string | null;
  image: string | null;
  totalLikes: number;
  subscribers: number;
}

const Creator = ({
  position,
  name,
  image,
  totalLikes,
  subscribers,
}: IProps) => {
  return (
    <div className="pt-[10px] flex justify-between gap-5 flex-wrap items-center">
      <div className="flex items-center gap-2">
        {position === 1 ? (
          <Crown className="size-6 text-[#e89b05]" />
        ) : (
          <span className="font-medium text-white/30">0{position}</span>
        )}
        <div className="flex items-center gap-[6px]">
          {image ? (
            <img src={image} className="size-8 rounded-full" alt="" />
          ) : (
            <ImageSkeleton className="rounded-full size-8" />
          )}
          <div>
            <h4 className="font-medium leading-[18px]">{name}</h4>
            <span className="text-[11px] text-white/40">
              {formatNumbers(subscribers)} followers
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 py-[6px] px-[10px] bg-white-2 rounded-full transition-all">
        <img src="/images/icons/heart.svg" className="size-4" alt="heart" />
        <span className="text-sm">{formatNumbers(totalLikes)}</span>
      </div>
    </div>
  );
};

export default Creator;

export function CreatorLoading() {
  return (
    <div className="pt-[10px] flex justify-between gap-5 flex-wrap items-center">
      <div className="flex items-center gap-2">
        {/* Position/Crown placeholder */}
        <div className="w-6 h-6 bg-white/[0.08] rounded-full animate-pulse" />

        <div className="flex items-center gap-[6px]">
          {/* Avatar placeholder */}
          <div className="size-8 rounded-full bg-white/[0.08] animate-pulse" />

          <div>
            {/* Name placeholder */}
            <div className="h-[18px] w-24 bg-white/[0.08] rounded-md animate-pulse" />
            {/* Followers placeholder */}
            <div className="h-3 w-16 bg-white/[0.08] rounded-md animate-pulse mt-1" />
          </div>
        </div>
      </div>

      {/* Likes counter placeholder */}
      <div className="flex items-center gap-2 py-[6px] px-[10px] bg-white/[0.02] rounded-full">
        <div className="size-4 bg-white/[0.08] rounded-full animate-pulse" />
        <div className="h-4 w-8 bg-white/[0.08] rounded-md animate-pulse" />
      </div>
    </div>
  );
}
