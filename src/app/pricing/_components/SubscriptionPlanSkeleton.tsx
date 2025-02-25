"use client";

import { cn } from "@/lib/utils";

interface SubscriptionPlanSkeletonProps {
  isStandard?: boolean;
}

export default function SubscriptionPlanSkeleton({
  isStandard = false,
}: SubscriptionPlanSkeletonProps) {
  return (
    <div className="rounded-[10px] bg-white/[0.02] h-fit">
      <div
        className={cn(
          "p-[30px] pb-5",
          isStandard ? "bg-primary/5" : "bg-white/[0.02]"
        )}
      >
        {/* Plan name and popular badge */}
        <div className="flex items-center gap-2">
          <div className="h-[22px] w-28 bg-white/[0.08] rounded-[4px] animate-pulse" />
          {isStandard && (
            <div className="px-4 h-[22px] w-[72px] rounded-full bg-black/60 backdrop-blur-[20px] animate-pulse" />
          )}
        </div>

        {/* Price */}
        <div className="flex items-end gap-1 mt-5">
          <div className="h-[47px] md:h-[57px] w-24 bg-white/[0.08] rounded-[4px] animate-pulse" />
          <div className="h-[24px] w-16 mb-[6px] bg-white/[0.08] rounded-[4px] animate-pulse" />
        </div>

        {/* Credits */}
        <div className="mt-5 h-[22px] w-40 bg-white/[0.08] rounded-[4px] animate-pulse" />

        {/* Button */}
        <div className="mt-[30px] w-full h-[48px] bg-[#fafafa]/10 rounded-[10px] animate-pulse" />
      </div>

      <div className="p-[30px]">
        {/* Features header */}
        <div className="h-[18px] w-24 bg-white/[0.08] rounded-[4px] animate-pulse mb-2" />

        {/* Free plan text */}
        <div className="h-[16px] w-56 bg-white/[0.08] rounded-[4px] animate-pulse mb-3" />

        {/* Features list */}
        <ul className="flex flex-col gap-[6px]">
          {[1, 2, 3].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                <div className="size-[14px] bg-white/[0.08] rounded-full animate-pulse" />
              </div>
              <div className="h-[18px] w-36 bg-white/[0.08] rounded-[4px] animate-pulse" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
