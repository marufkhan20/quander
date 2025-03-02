/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetChallenge, useGetChallenges } from "@/api/useChallenge";
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
import Video, { VideoLoading } from "@/components/Videos/Video";
import { useLayout } from "@/context/LayoutContext";
import { cn } from "@/lib/utils";
import { useNavbarStore } from "@/store/useNavbarStore";
import { ChevronDownIcon, Eye, Info, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ChallengeCardLoading from "./_components/ChallengeCardLoading";
import ChallengeItem, {
  ChallengeItemLoading,
} from "./_components/ChallengeItem";
import Creator, { CreatorLoading } from "./_components/Creator";

const DailyChallenges = () => {
  const { data: session } = useSession();
  const { isCollapsed } = useLayout();

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [yourSubmitVideo, setYourSubmitVideo] = useState<{
    id: string;
    challengeId: string;
  }>({ id: "", challengeId: "" });

  const { updateInfo } = useNavbarStore();

  // format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // get all challenges
  const { data: challenges, isLoading: isChallengesLoading } =
    useGetChallenges();

  useEffect(() => {
    if (challenges && challenges?.length > 0) {
      challenges?.forEach((item) => {
        if (formatDate(item?.createdAt) === formatDate(new Date())) {
          setSelectedChallenge(item?.id);
        }
      });
    }
  }, [challenges]);

  // get selected challenge
  const { data: challenge, isLoading } = useGetChallenge({
    id:
      selectedChallenge ||
      (challenges ? challenges[challenges.length - 1].id : ""),
  });

  useEffect(() => {
    if (challenge?.id) {
      challenge?.submitVideos.forEach((video) => {
        if (video.creator.id === session?.user?.id) {
          setYourSubmitVideo({
            id: video?.id,
            challengeId: challenge?.id,
          });
        }
      });

      if (challenge?.status === "active") {
        updateInfo({
          challengeId: challenge?.id,
          challengeName: challenge?.title,
        });
      }
    }
  }, [challenge, session, updateInfo]);

  // remove challenge detials from create video store
  useEffect(() => {
    return () => {
      updateInfo({
        challengeId: "",
        challengeName: "",
      });
    };
  }, [updateInfo]);

  const loading = isLoading || isChallengesLoading;
  return (
    <main>
      {/* challenges date */}
      <section className="overflow-hidden">
        <Carousel
          className={cn("flex items-center gap-[16px] justify-between")}
        >
          <CarouselPrevious className="hidden md:block size-9 border-none hover:text-primary bg-transparent hover:bg-transparent" />
          <div>
            <CarouselContent
              className={cn(
                isCollapsed
                  ? "w-[calc(100vw-112px)] lg:w-[calc(100vw-242px)]"
                  : "w-[calc(100vw-112px)] lg:w-[calc(100vw-462px)]"
              )}
            >
              {challenges?.map((challenge) => (
                <CarouselItem
                  key={challenge?.id}
                  className="shrink-0 basis-1/2.5 sm:basis-1/3 md:basis-1/4 xl:basis-1/6"
                >
                  <ChallengeItem
                    date={formatDate(challenge?.createdAt)}
                    status={challenge?.status}
                    selectedChallenge={selectedChallenge === challenge?.id}
                    id={challenge?.id}
                    setSelectedChallenge={setSelectedChallenge}
                  />
                </CarouselItem>
              ))}

              {isChallengesLoading &&
                Array.from({ length: 8 }).map((_, idx) => (
                  <CarouselItem
                    key={idx}
                    className="basis-1/2.5 sm:basis-1/3 md:basis-1/5 xl:basis-1/6"
                  >
                    <ChallengeItemLoading />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </div>
          <CarouselNext className="hidden md:block size-9 border-none hover:text-primary bg-transparent hover:bg-transparent" />
        </Carousel>
      </section>

      {/* daily challenges */}
      <section className="mt-[30px] flex flex-col lg:flex-row gap-10 lg:gap-[10px]">
        {loading ? (
          <ChallengeCardLoading />
        ) : (
          <div className="relative min-h-[350px] flex-1 md:p-[30px] flex flex-col justify-between md:gap-5 bg-white/5 md:bg-transparent rounded-xl">
            <img
              src={challenge?.thumbnail || "/images/bg.jpg"}
              className="md:absolute md:inset-0 w-full h-full rounded-xl object-cover -z-20"
              alt=""
            />
            <div className="hidden md:block bg-[linear-gradient(261.9deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.56)_78.71%,#000_100%)] absolute inset-0 w-full h-full -z-10 rounded-xl" />

            <div className="absolute top-[10px] left-[10px] md:relative md:left-0 md:top-0 flex items-center gap-[10px] py-1 px-3 rounded-full bg-white/5 w-fit backdrop-blur-[20px]">
              🔥
              <p className="text-sm">{"Today's"} Daily Challenge Topic</p>
            </div>

            <div className="flex items-end justify-between gap-5 flex-wrap p-5 md:p-0">
              <div>
                <h2 className="mt-6 font-extrabold text-[20px] md:text-[32px] leading-[18px]">
                  {challenge?.title}
                </h2>
                <p className="w-full xl:w-[80%] 2xl:w-[50%] text-white/80 mt-4 md:mt-[30px] leading-[20px] text-sm md:text-base">
                  {challenge?.description}
                </p>
                <div className="mt-6 md:mt-12 flex items-center gap-4 justify-between md:justify-normal">
                  {yourSubmitVideo?.id &&
                  yourSubmitVideo?.challengeId === challenge?.id ? (
                    <Link
                      href={`/watch/${yourSubmitVideo?.id}`}
                      className="flex items-center gap-[10px] bg-primary rounded-sm px-4 py-2.5 text-black transition-all disabled:bg-gray-500 disabled:cursor-not-allowed hover:scale-105 duration-300"
                    >
                      <Eye className="size-4" />
                      <span>Watch Video</span>
                    </Link>
                  ) : (
                    <button
                      className="flex items-center gap-[10px] bg-primary rounded-sm px-4 py-2.5 text-black transition-all disabled:bg-gray-500 disabled:cursor-not-allowed hover:scale-105 duration-300"
                      disabled={challenge?.status !== "active" || !session}
                      onClick={() => updateInfo({ open: true })}
                    >
                      <Plus className="size-4" />
                      <span>Create Now</span>
                    </button>
                  )}
                  <button className="flex items-center justify-center size-12 bg-white-2 rounded-sm text-primary transition-all hover:scale-105 duration-300 backdrop-blur-[20px] min-h-10">
                    <Info />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="lg:w-[380px]">
          <div className="p-5 bg-white-2 rounded-[10px]">
            <h2 className="text-white/60 font-semibold text-lg">
              Top Creators Today
            </h2>

            <div className="mt-[20px] flex flex-col gap-[10px] divide-y-[1px] divide-white/5">
              {challenge?.leaderboards?.map((creator, idx) => (
                <Creator
                  key={creator?.name}
                  position={idx + 1}
                  image={creator?.image}
                  name={creator?.name}
                  totalLikes={creator?.totalLikes}
                  subscribers={creator?.subscribers}
                />
              ))}

              {loading &&
                Array.from({ length: 5 }).map((_, idx) => (
                  <CreatorLoading key={idx} />
                ))}

              {!isLoading && challenge?.leaderboards?.length === 0 && (
                <p className="text-white/60">No creator found.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* popular videos */}
      <section className="mt-8">
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <h2 className="text-white/60 text-lg font-semibold">
            Most Popular Videos
          </h2>
        </div>

        <Carousel>
          <div>
            <CarouselContent>
              {challenge?.submitVideos
                ?.sort((a, b) => b.likes.length - a.likes.length)
                .slice(0, 4)
                .map((video, idx) => (
                  <CarouselItem
                    key={video?.id}
                    className="basis-1/1.2 sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4 "
                  >
                    <div className="flex items-center">
                      <div className="flex-1">
                        <Video
                          id={video?.id}
                          title={video?.title}
                          thumbnail={video?.thumbnail}
                          views={video?.views}
                        />
                      </div>
                      <h2 className="text-[140px] sm:text-[150px] xl:text-[200px] leading-[200px] text-white/20 font-bold font-open-sans -ml-6">
                        {idx + 1}
                      </h2>
                    </div>
                  </CarouselItem>
                ))}

              {loading &&
                Array.from({ length: 5 }).map((_, idx) => (
                  <CarouselItem
                    key={idx}
                    className="basis-1/1.2 sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4 "
                  >
                    <VideoLoading key={idx} className="!aspect-video h-auto" />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </div>
        </Carousel>

        {(!loading && !challenge?.submitVideos) ||
          (challenge?.submitVideos?.length === 0 && (
            <h2 className="text-white/60 text-base font-medium">
              No Video Found!!
            </h2>
          ))}
      </section>

      {/* All Challenge Submissions */}
      <section className="mt-8 relative">
        <div className="flex sm:items-center justify-between gap-5 flex-col sm:flex-row">
          <h2 className="text-white/60 text-lg font-semibold">
            All Challenge Submissions
          </h2>
          <div className="flex items-center gap-2">
            <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
              <DropdownMenuTrigger
                onClick={() => setFilterOpen(!filterOpen)}
                className="outline-none w-full sm:w-auto py-[14px] px-6 bg-white/5 rounded-lg justify-center sm:justify-normal font-normal text-base flex items-center gap-4"
              >
                Latest
                <ChevronDownIcon
                  className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${filterOpen ? "rotate-180" : ""}`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-5 w-[calc(100vw-40px)] sm:w-auto bg-black/80 backdrop-blur-[20px] border-none rounded-[10px] flex flex-col gap-3">
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

        <div className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[10px]">
          {!loading &&
            challenge?.submitVideos?.map((video) => (
              <Video
                key={video?.id}
                id={video?.id}
                title={video?.title}
                thumbnail={video?.thumbnail}
                views={video?.views}
              />
            ))}

          {loading &&
            Array.from({ length: 5 }).map((_, idx) => (
              <VideoLoading key={idx} className="!aspect-video h-auto" />
            ))}
        </div>

        {(!loading && !challenge?.submitVideos) ||
          (challenge?.submitVideos?.length === 0 && (
            <h2 className="text-white/60 text-base font-medium">
              No Submission Video Found!!
            </h2>
          ))}
      </section>
    </main>
  );
};

export default DailyChallenges;
