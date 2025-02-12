/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Video from "@/components/Videos/Video";
import { ChevronDownIcon, Info, Plus } from "lucide-react";
import { useState } from "react";
import ChallengeItem from "./_components/ChallengeItem";
import TopCreators from "./_components/top-creators";

const DailyChallenges = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <main>
      {/* challenges date */}
      <section>
        <Carousel className="flex items-center gap-[16px] justify-between">
          <CarouselPrevious className="size-9 border-none hover:text-primary bg-transparent hover:bg-transparent" />
          <CarouselContent className="w-full">
            <CarouselItem className="basis-1/6">
              <ChallengeItem />
            </CarouselItem>
            <CarouselItem className="basis-1/6">
              <ChallengeItem />
            </CarouselItem>
            <CarouselItem className="basis-1/6">
              <ChallengeItem activeVoting />
            </CarouselItem>
            <CarouselItem className="basis-1/6">
              <ChallengeItem activeChallenge />
            </CarouselItem>
            <CarouselItem className="basis-1/6">
              <ChallengeItem />
            </CarouselItem>
            <CarouselItem className="basis-1/6">
              <ChallengeItem />
            </CarouselItem>
            <CarouselItem className="basis-1/6">
              <ChallengeItem />
            </CarouselItem>
          </CarouselContent>
          <CarouselNext className="size-9 border-none hover:text-primary bg-transparent hover:bg-transparent" />
        </Carousel>
      </section>

      {/* daily challenges */}
      <section className="mt-[30px] flex gap-[10px]">
        <div className="relative h-[350px] flex-1 p-[30px] flex flex-col justify-between gap-5">
          <img
            src="/images/bg.jpg"
            className="absolute inset-0 w-full h-full rounded-xl object-cover -z-20"
            alt=""
          />
          <div className="bg-[linear-gradient(261.9deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.56)_78.71%,#000_100%)] absolute inset-0 w-full h-full -z-10 rounded-xl" />

          <div className="flex items-center gap-[10px] py-1 px-3 rounded-full bg-white/5 w-fit backdrop-blur-[20px]">
            🔥
            <p className="text-sm">{"Today's"} Daily Challenge Topic</p>
          </div>

          <div className="flex items-end justify-between gap-5 flex-wrap">
            <div>
              <h2 className="mt-6 font-extrabold text-[32px] leading-[18px]">
                Galactic Odyssey
              </h2>
              <p className="w-[50%] text-white/80 mt-[30px] leading-[20px]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                possimus magni vel id recusandae, facilis aliquid suscipit quas
                quo tempore harum perspiciatis velit mollitia dignissimos
                debitis laboriosam doloremque quisquam officiis?
              </p>
              <div className="mt-12 flex items-center gap-4">
                <button className="flex items-center gap-[10px] bg-primary rounded-sm px-4 py-2.5 text-black transition-all hover:scale-105 duration-300">
                  <Plus className="size-4" />
                  <span>Create Now</span>
                </button>
                <button className="flex items-center justify-center size-12 bg-white-2 rounded-sm text-primary transition-all hover:scale-105 duration-300 backdrop-blur-[20px] min-h-10">
                  <Info />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[380px]">
          <TopCreators />
        </div>
      </section>

      {/* popular videos */}
      <section className="mt-8 relative">
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <h2 className="text-white/60 text-lg font-semibold">
            Most Popular Videos
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="flex items-center">
            <Video />
            <h2 className="text-[200px] leading-[200px] text-white/20 font-bold font-open-sans -ml-6">
              1
            </h2>
          </div>
          <div className="flex items-center">
            <Video />
            <h2 className="text-[200px] leading-[200px] text-white/20 font-bold font-open-sans -ml-6">
              2
            </h2>
          </div>
          <div className="flex items-center">
            <Video />
            <h2 className="text-[200px] leading-[200px] text-white/20 font-bold font-open-sans -ml-6">
              3
            </h2>
          </div>
          <div className="flex items-center">
            <Video />
            <h2 className="text-[200px] leading-[200px] text-white/20 font-bold font-open-sans -ml-6">
              4
            </h2>
          </div>
        </div>
      </section>

      {/* All Challenge Submissions */}
      <section className="mt-8 relative">
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <h2 className="text-white/60 text-lg font-semibold">
            All Challenge Submissions
          </h2>
          <div className="flex items-center gap-2">
            <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
              <DropdownMenuTrigger
                onClick={() => setFilterOpen(!filterOpen)}
                className="outline-none py-[14px] px-6 bg-white/5 rounded-lg font-normal text-base flex items-center gap-4"
              >
                Latest
                <ChevronDownIcon
                  className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${filterOpen ? "rotate-180" : ""}`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-5 bg-black/80 backdrop-blur-[20px] border-none rounded-[10px] flex flex-col gap-3">
                <DropdownMenuItem className="cursor-pointer bg-transparent text-white hover:!bg-primary">
                  Latest
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer bg-transparent text-white hover:!bg-primary">
                  Oldest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-[10px]">
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
        </div>
      </section>
    </main>
  );
};

export default DailyChallenges;
