import { Heart } from "lucide-react";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const User = () => {
  return (
    <Link
      href="#"
      className="pt-[10px] flex items-center justify-between gap-5 flex-wrap"
    >
      <div className="flex items-center gap-[8px]">
        <img
          src="/images/profile-img.avif"
          alt="profile img"
          className="size-8 rounded-full object-cover"
        />
        <div>
          <h4 className="text-base font-medium leading-[19px]">Anna R</h4>
          <span className="text-white/40 text-[11px]">110 followers</span>
        </div>
      </div>
      <div className="flex gap-[10px]">
        <div className="flex items-center gap-1">
          <div className="size-[5px] bg-[#df3840] rounded-full" />
          <span className="text-xs">4 new videos</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-white/80">
          <Heart className="size-[14px]" /> <span>8K</span>
        </div>
      </div>
    </Link>
  );
};

export default User;
