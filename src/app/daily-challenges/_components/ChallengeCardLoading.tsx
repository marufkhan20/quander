"use client";

export default function ChallengeCardLoading() {
  return (
    <div className="relative h-[350px] flex-1 md:p-[30px] flex flex-col justify-between md:gap-5 bg-white/5 md:bg-transparent rounded-xl overflow-hidden">
      {/* Background skeleton */}
      <div className="md:absolute md:inset-0 w-full h-full rounded-xl bg-white/[0.02] animate-pulse -z-20" />

      {/* Daily Challenge Badge */}
      <div className="absolute top-[10px] left-[10px] md:relative md:left-0 md:top-0 flex items-center gap-[10px] py-1 px-3 rounded-full bg-white/5 w-fit backdrop-blur-[20px]">
        <div className="w-4 h-4 rounded-full bg-white/10 animate-pulse" />
        <div className="h-4 w-36 bg-white/10 rounded-full animate-pulse" />
      </div>

      {/* Content Area */}
      <div className="flex items-end justify-between gap-5 flex-wrap p-5 md:p-0">
        <div className="w-full">
          {/* Title */}
          <div className="mt-6 h-[32px] w-3/4 bg-white/10 rounded-md animate-pulse" />

          {/* Description */}
          <div className="w-full xl:w-[80%] 2xl:w-[50%] mt-4 md:mt-[30px] space-y-2">
            <div className="h-4 w-full bg-white/10 rounded-md animate-pulse" />
            <div className="h-4 w-5/6 bg-white/10 rounded-md animate-pulse" />
            <div className="h-4 w-4/6 bg-white/10 rounded-md animate-pulse" />
          </div>

          {/* Buttons */}
          <div className="mt-6 md:mt-12 flex items-center gap-4 justify-between md:justify-normal">
            <div className="h-10 w-32 bg-white/10 rounded-sm animate-pulse" />
            <div className="size-12 bg-white/10 rounded-sm animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
