/* eslint-disable @next/next/no-img-element */
"use client";
import Character from "@/app/profile/[id]/_components/Character";
import ShortVideo from "@/components/ShortVideos/ShortVideo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Video from "@/components/Videos/Video";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDownIcon,
  Clock,
  Coins,
  CreditCard,
  Trophy,
  User,
} from "lucide-react";
import { useState } from "react";

const tabs = ["Videos (37)", "Shorts (8)", "Characters (3)"];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Videos (37)");
  const isAuthor = true;
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  return (
    <main>
      {/* profile details */}
      <section className="bg-white-2 p-[30px] rounded-[10px] flex items-center justify-between gap-5 flex-wrap">
        <div className="flex items-center gap-5">
          <img
            src="/images/profile-img.avif"
            className="size-[120px] rounded-[10px]"
            alt="profile img"
          />
          <div>
            <h3 className="text-[22px] font-semibold">Vincent Blackwell</h3>
            <ul className="mt-3 mb-4 flex items-center gap-[10px] divide-x-[1px] divide-white/20">
              <li className="text-white/80">
                <span className="font-semibold text-white">6K</span> subscribers
              </li>
              <li className="pl-[10px] text-white/80">
                <span className="font-semibold text-white">247</span>{" "}
                subscriptions
              </li>
              <li className="pl-[10px] text-white/80">
                <span className="font-semibold text-white">17K</span> likes
              </li>
            </ul>
            <p className="w-[70%] text-white/80">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              excepturi quo iure, ea obcaecati minus.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between h-[120px] items-end">
          <p className="flex items-center gap-1 text-sm text-white/80">
            <Trophy className="size-4 text-[#fdac00]" />
            <span>
              Daily Challenges Wins:{" "}
              <span className="text-white font-semibold">3</span>
            </span>
          </p>

          {isAuthor ? (
            // <Dialog>
            //   <DialogTrigger>
            //     <button className="flex items-center gap-[10px] py-2 px-4 rounded-md text-sm bg-white/5 transition-all hover:scale-105 hover:bg-primary hover:text-black duration-300">
            //       <Edit className="size-4" /> <span>Edit Profile</span>
            //     </button>
            //   </DialogTrigger>

            //   <EditProfile />
            // </Dialog>
            <></>
          ) : (
            <button className="flex w-fit items-center gap-[10px] py-2 px-4 rounded-md text-black text-sm bg-primary transition-all hover:scale-105 duration-300">
              <User /> <span>Subscribe</span>
            </button>
          )}
        </div>
      </section>

      {/* profile info */}
      {isAuthor && (
        <section className="bg-white-2 mt-[10px] p-6 rounded-[10px] flex items-center justify-between text-center">
          <div className="flex-1 flex items-center justify-center">
            <p className="flex items-center font-semibold gap-1 text-sm text-white/80">
              <Coins className="size-4" />
              <span>Credits:</span>
              <span className="text-white font-medium">2634</span>
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <p className="flex items-center font-semibold gap-1 text-sm text-white/80">
              <Clock className="size-4" />
              <span>Available Video Time:</span>
              <span className="text-white font-medium">250m 20s</span>
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <p className="flex items-center gap-1 font-semibold text-sm text-white/80">
              <CreditCard className="size-4" />
              <span>Credit Value:</span>
              <span className="text-white font-medium">$205.99</span>
            </p>
          </div>
        </section>
      )}

      {/* videos and characters */}
      <section>
        {/* tabs and filter */}
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <div className="w-fit p-1 bg-white/5 rounded-[10px] mt-6 flex items-center">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "py-[10px] px-9 relative rounded-md transition-all",
                  activeTab === tab && "text-primary"
                )}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`tabpanel-${index}`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary/5 rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 mix-blend-normal">{tab}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-[10px]">
            {isAuthor && (
              <DropdownMenu open={statusOpen} onOpenChange={setStatusOpen}>
                <DropdownMenuTrigger
                  onClick={() => setStatusOpen(!statusOpen)}
                  className="outline-none py-[14px] px-6 bg-white/5 rounded-lg font-normal text-base flex items-center gap-4"
                >
                  Public
                  <ChevronDownIcon
                    className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${statusOpen ? "rotate-180" : ""}`}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-5 bg-black/80 backdrop-blur-[20px] border-none rounded-[10px] flex flex-col gap-3">
                  <DropdownMenuItem className="cursor-pointer bg-transparent text-white hover:!bg-primary">
                    Public
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer bg-transparent text-white hover:!bg-primary">
                    Private
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

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

        {/* tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            className="mt-5"
          >
            {activeTab === tabs[0] && (
              <div className="grid grid-cols-4 gap-[10px]">
                <Video isAuthor={isAuthor} />
                <Video isAuthor={isAuthor} />
                <Video isAuthor={isAuthor} />
                <Video isAuthor={isAuthor} />
                <Video isAuthor={isAuthor} />
                <Video isAuthor={isAuthor} />
                <Video isAuthor={isAuthor} />
                <Video isAuthor={isAuthor} />
                <Video isAuthor={isAuthor} />
              </div>
            )}

            {activeTab === tabs[1] && (
              <div className="grid grid-cols-5 gap-[10px]">
                <ShortVideo isAuthor={isAuthor} />
                <ShortVideo isAuthor={isAuthor} />
                <ShortVideo isAuthor={isAuthor} />
                <ShortVideo isAuthor={isAuthor} />
                <ShortVideo isAuthor={isAuthor} />
                <ShortVideo isAuthor={isAuthor} />
                <ShortVideo isAuthor={isAuthor} />
                <ShortVideo isAuthor={isAuthor} />
                <ShortVideo isAuthor={isAuthor} />
              </div>
            )}

            {activeTab === tabs[2] && (
              <div className="grid grid-cols-4 gap-[10px]">
                <Character isAuthor={isAuthor} />
                <Character isAuthor={isAuthor} />
                <Character isAuthor={isAuthor} />
                <Character isAuthor={isAuthor} />
                <Character isAuthor={isAuthor} />
                <Character isAuthor={isAuthor} />
                <Character isAuthor={isAuthor} />
                <Character isAuthor={isAuthor} />
                <Character isAuthor={isAuthor} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
};

export default ProfilePage;
