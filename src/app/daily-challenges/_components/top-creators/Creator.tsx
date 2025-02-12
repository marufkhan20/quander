/* eslint-disable @next/next/no-img-element */
import { Crown, Heart } from "lucide-react";

interface IProps {
  position: number;
}

const Creator = ({ position }: IProps) => {
  return (
    <div className="pt-[10px] flex justify-between gap-5 flex-wrap items-center">
      <div className="flex items-center gap-2">
        {position === 1 ? (
          <Crown className="size-6 text-[#e89b05]" />
        ) : (
          <span className="font-medium text-white/30">0{position}</span>
        )}
        <div className="flex items-center gap-[6px]">
          <img
            src="/images/profile-img.avif"
            className="size-8 rounded-full"
            alt=""
          />
          <div>
            <h4 className="font-medium leading-[18px]">Anna R</h4>
            <span className="text-[11px] text-white/40">110 followers</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 py-[6px] px-[10px] bg-white-2 rounded-full cursor-pointer transition-all hover:bg-primary hover:text-black">
        <Heart className="size-4 text-red-700" />{" "}
        <span className="text-sm">842</span>
      </div>
    </div>
  );
};

export default Creator;
