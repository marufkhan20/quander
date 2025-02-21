"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <main>
      {/* Profile Section Loading */}
      <section className="bg-white-2 p-5 sm:p-[30px] rounded-[10px] flex items-center justify-between gap-5 flex-col lg:flex-row">
        <div className="flex w-full md:flex-1 md:items-center gap-5">
          <Skeleton className="size-[60px] sm:size-[80px] md:size-[120px] rounded-[10px] bg-black/40" />
          <div className="flex-1">
            <Skeleton className="h-7 w-[200px] bg-black/40" />
            <div className="mt-3 mb-4 flex items-center gap-[10px] flex-wrap">
              <Skeleton className="h-6 w-[100px] bg-black/40" />
              <Skeleton className="h-6 w-[120px] bg-black/40" />
              <Skeleton className="h-6 w-[80px] bg-black/40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[90%] md:w-[70%] bg-black/40" />
              <Skeleton className="h-4 w-[75%] md:w-[60%] bg-black/40" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto flex lg:flex-col justify-between lg:h-[120px] lg:items-end flex-wrap gap-y-4">
          <Skeleton className="h-6 w-[180px] bg-black/40" />
          <Skeleton className="h-9 w-[120px] bg-black/40" />
        </div>
      </section>

      {/* Credits Section Loading */}
      <section className="bg-white-2 mt-[10px] px-3 py-6 lg:p-6 rounded-[10px] flex md:items-center md:justify-between md:text-center flex-col md:flex-row gap-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex-1 flex md:items-center justify-between md:justify-center w-full"
          >
            <div className="flex items-center justify-between w-full md:justify-center gap-4">
              <Skeleton className="h-5 w-[120px] bg-black/40" />
              <Skeleton className="h-5 w-[60px] bg-black/40" />
            </div>
          </div>
        ))}
      </section>

      {/* Tabs and Filters Loading */}
      <div className="flex items-center justify-between gap-5 flex-wrap mt-6">
        <div className="w-full md:w-fit p-1 bg-white/5 rounded-[10px] flex items-center">
          {["Videos", "Shorts", "Characters"].map((tab) => (
            <div key={tab} className="py-[10px] px-4 sm:px-6 md:px-9">
              <Skeleton className="h-5 w-[80px] bg-black/40" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 md:flex-none items-center gap-[10px]">
          <Skeleton className="h-[52px] w-[120px] rounded-lg bg-black/40" />
          <Skeleton className="h-[52px] w-[120px] rounded-lg bg-black/40" />
        </div>
      </div>

      {/* Content Grid Loading */}
      <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[10px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="flex bg-blac/40 flex-col gap-3">
            <Skeleton className="aspect-video w-full rounded-lg bg-black/40" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[80%] bg-black/40" />
              <Skeleton className="h-4 w-[60%] bg-black/40" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
