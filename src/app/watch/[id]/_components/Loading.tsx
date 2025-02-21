"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function WatchPageLoading() {
  return (
    <div className="flex-1 bg-white-2 p-5 rounded-lg flex flex-col md:flex-row justify-between gap-8">
      <div className="flex-1">
        {/* Video Player Skeleton */}
        <div>
          <Skeleton className="w-full aspect-video rounded-[10px] bg-black/40" />
        </div>

        {/* Video Info Section */}
        <div className="mt-8 pb-10 border-b border-white/10">
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <Skeleton className="h-7 w-[300px] bg-black/40" />
            <div className="flex items-center gap-[10px]">
              <Skeleton className="h-[52px] w-[100px] rounded-lg bg-black/40" />
              <Skeleton className="size-11 rounded-full bg-black/40" />
              <div className="flex items-center gap-1">
                <Skeleton className="size-11 rounded-full bg-black/40" />
                <Skeleton className="h-6 w-[60px] bg-black/40" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 space-y-2">
            <Skeleton className="h-4 w-[90%] bg-black/40" />
            <Skeleton className="h-4 w-[85%] bg-black/40" />
            <Skeleton className="h-4 w-[80%] bg-black/40" />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-[10px] mt-6">
            <Skeleton className="h-5 w-[100px] bg-black/40" />
            <Skeleton className="h-5 w-[100px] bg-black/40" />
          </div>

          {/* Author Section */}
          <div className="mt-10 flex items-center justify-between gap-5 flex-wrap">
            <div className="flex items-center gap-2">
              <Skeleton className="size-[50px] rounded-xl bg-black/40" />
              <div>
                <Skeleton className="h-6 w-[120px] bg-black/40" />
                <Skeleton className="h-4 w-[100px] bg-black/40 mt-2" />
              </div>
            </div>
            <Skeleton className="h-9 w-[120px] rounded-md bg-black/40" />
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-[30px] md:mt-[60px]">
          {/* Mobile Comment Header */}
          <Skeleton className="flex md:hidden h-[72px] w-full rounded-lg bg-black/40 mb-4" />

          {/* Comment Box */}
          <div className="hidden md:block space-y-4">
            <Skeleton className="h-[120px] w-full rounded-lg bg-black/40" />

            {/* Comments */}
            <div className="mt-10 space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4">
                  <Skeleton className="size-10 rounded-full bg-black/40" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[120px] bg-black/40" />
                    <Skeleton className="h-4 w-full bg-black/40" />
                    <Skeleton className="h-4 w-[90%] bg-black/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Empty space for "You May Like" */}
      {/* <div className="md:w-[292px]" /> */}
    </div>
  );
}
