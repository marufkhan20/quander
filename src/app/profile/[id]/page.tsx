/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetCharacters } from "@/api/useCharacters";
import { useGetProfile, useSubscribeProfile } from "@/api/useProfile";
import { useGetVideos } from "@/api/useVideos";
import Character from "@/app/profile/[id]/_components/Character";
import ShortVideo from "@/components/ShortVideos/ShortVideo";
import CustomButton from "@/components/ui/custom-button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ImageSkeleton from "@/components/ui/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Video from "@/components/Videos/Video";
import { Orientation } from "@/contants";
import { cn, formatNumbers } from "@/lib/utils";
import { useProfileStore } from "@/store/useProfileStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDownIcon,
  Clock,
  Coins,
  CreditCard,
  Edit,
  Trophy,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditProfile, { MobileEditProfile } from "./_components/EditProfile";
import ProfileLoading from "./_components/Loading";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isAuthor, setIsAuthor] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openMobileEditProfile, setOpenMobileEditProfile] = useState(false);
  const { id } = useParams();
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);
  const [sort, setSort] = useState("desc");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [totalSubscribers, setTotalSubscribers] = useState(0);

  // global store
  const { updateInfo } = useProfileStore();

  // set authority
  useEffect(() => {
    if (session) {
      if (session?.user?.id === id) {
        setIsAuthor(true);
      }
    }
  }, [id, session]);

  // get profile info
  const {
    data: profileInfo,
    isLoading: profileInfoLoading,
    refetch: refetchProfileInfo,
  } = useGetProfile(id as string, `profile-${id}`);

  // set profile info to state
  useEffect(() => {
    if (profileInfo?.id) {
      setName(profileInfo?.name || "");
      setProfilePic(profileInfo?.image || "");
      setDescription(profileInfo?.description || "");

      // check subscribe or not
      if (
        profileInfo?.ownedChannels &&
        profileInfo?.ownedChannels?.length > 0
      ) {
        const isSubscribed = profileInfo?.ownedChannels[0]?.subscribers.some(
          (subscriber) => subscriber.id === session?.user?.id
        );

        setTotalSubscribers(profileInfo?.ownedChannels[0].subscribers.length);

        if (isSubscribed) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      }
    }
  }, [profileInfo, session]);

  // update profile info
  const handleUpdateProfileInfo = (
    name: string,
    profilePic: string,
    description: string
  ) => {
    setName(name);
    setProfilePic(profilePic);
    setDescription(description);

    // update global store
    updateInfo({
      name,
      image: profilePic,
      description,
    });
  };

  // get long videos
  const {
    data: videos,
    refetch,
    isLoading,
  } = useGetVideos({
    queryKey: "long-videos",
    orientation: Orientation.longVideos,
    published,
    sort,
    userId: id as string,
  });

  // get short videos
  const {
    data: shortVideos,
    refetch: shortVideosRefetch,
    isLoading: isShortLoading,
  } = useGetVideos({
    queryKey: "short-videos",
    orientation: Orientation.shortVideos,
    published,
    sort,
    userId: id as string,
  });

  // get characters
  const {
    data: characters,
    refetch: refetchCharacters,
    isLoading: isLoadingCharacters,
  } = useGetCharacters({
    published,
    sort,
    userId: id as string,
  });

  // refetch data when filter update
  useEffect(() => {
    refetch();
    shortVideosRefetch();
    refetchCharacters();
  }, [published, sort, refetch, shortVideosRefetch, refetchCharacters]);

  // subscribe profile
  const {
    mutate: subscribeProfile,
    isPending: isSubscribeLoading,
    isSuccess: isSubscribeSuccess,
    data,
  } = useSubscribeProfile();

  useEffect(() => {
    if (isSubscribeSuccess) {
      if (data) {
        setIsSubscribed(data?.isSubscribed || false);

        setTotalSubscribers((total) =>
          data?.isSubscribed ? total + 1 : total - 1
        );

        refetchProfileInfo();
      }
    }
  }, [data, isSubscribeSuccess, refetchProfileInfo]);

  if (status === "loading" || profileInfoLoading) {
    return <ProfileLoading />;
  }
  return (
    <main>
      {/* profile details */}
      <section className="bg-white-2 p-5 sm:p-[30px] rounded-[10px] flex items-center justify-between gap-5 flex-col lg:flex-row">
        <div className="flex w-full md:flex-1 md:items-center gap-5">
          {profilePic ? (
            <img
              src={profilePic || "/images/profile-img.avif"}
              className="size-[60px] sm:size-[80px] md:size-[120px] rounded-[10px] object-cover"
              alt="profile img"
            />
          ) : (
            <ImageSkeleton className="size-[60px] sm:size-[80px] md:size-[120px] rounded-[10px]" />
          )}
          <div>
            <h3 className="text-lg md:text-[22px] font-semibold">{name}</h3>
            <ul className="mt-3 mb-4 flex items-center gap-[10px] divide-x-[1px] divide-white/20 flex-wrap">
              <li className="text-white/80 text-xs md:text-base">
                <span className="font-semibold text-white">
                  {totalSubscribers}
                </span>{" "}
                subscribers
              </li>
              <li className="pl-[10px] text-white/80 text-xs md:text-base">
                <span className="font-semibold text-white">
                  {profileInfo?.subscriptions?.length}
                </span>{" "}
                subscriptions
              </li>
              <li className="pl-[10px] text-white/80 text-xs md:text-base">
                <span className="font-semibold text-white">
                  {formatNumbers(profileInfo?.totalLikes || null)}
                </span>{" "}
                likes
              </li>
            </ul>
            <p className="md:w-[70%] text-white/80 text-xs md:text-base">
              {description || "No description"}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-auto flex lg:flex-col justify-between lg:h-[120px] lg:items-end flex-wrap gap-y-4">
          <p className="flex items-center gap-1 text-sm text-white/80">
            <Trophy className="size-4 text-[#fdac00]" />
            <span>
              Daily Challenges Wins:{" "}
              <span className="text-white font-semibold">3</span>
            </span>
          </p>

          {isAuthor ? (
            <>
              <div className="hidden lg:block">
                <Dialog
                  open={openEditProfile}
                  onOpenChange={setOpenEditProfile}
                >
                  <DialogTrigger>
                    <button className="hidden lg:flex items-center gap-[10px] py-2 px-4 rounded-md text-sm bg-white/5 transition-all hover:scale-105 hover:bg-primary hover:text-black duration-300">
                      <Edit className="size-4" /> <span>Edit Profile</span>
                    </button>
                  </DialogTrigger>

                  <EditProfile
                    handleUpdate={handleUpdateProfileInfo}
                    name={name}
                    profilePic={profilePic}
                    description={description}
                    setOpen={setOpenEditProfile}
                  />
                </Dialog>
              </div>

              <button
                className="flex lg:hidden items-center gap-[10px] py-2 px-4 rounded-md text-sm bg-white/5 transition-all hover:scale-105 hover:bg-primary hover:text-black duration-300"
                onClick={() => setOpenMobileEditProfile(true)}
              >
                <Edit className="size-4" /> <span>Edit Profile</span>
              </button>
            </>
          ) : (
            <Tooltip>
              <TooltipTrigger>
                <CustomButton
                  className="flex w-fit items-center gap-[10px] py-2 px-4 rounded-md text-black text-sm bg-primary transition-all hover:scale-105 duration-300 disabled:bg-primary/40"
                  disabled={!session}
                  loading={isSubscribeLoading}
                  onClick={() =>
                    subscribeProfile({
                      param: {
                        id: id as string,
                      },
                      json: {
                        channelId: profileInfo?.ownedChannels
                          ? profileInfo?.ownedChannels[0]?.id
                          : "",
                        userId: session?.user?.id || "",
                      },
                    })
                  }
                >
                  <User />{" "}
                  <span>{isSubscribed ? "Subscribed" : "Subscribe"}</span>
                </CustomButton>
              </TooltipTrigger>
              {!session && <TooltipContent>Please Login</TooltipContent>}
            </Tooltip>
          )}
        </div>
      </section>

      {/* profile info */}
      {isAuthor && (
        <section className="bg-white-2 mt-[10px] px-3 py-6 lg:p-6 rounded-[10px] flex md:items-center md:justify-between md:text-center flex-col md:flex-row gap-y-4">
          <div className="flex-1 flex md:items-center justify-between md:justify-center w-full">
            <p className="flex items-center font-semibold gap-1 text-sm text-white/80 justify-between w-full md:justify-center">
              <div className="flex items-center gap-1">
                <Coins className="size-4" />
                <span>Credits:</span>
              </div>
              <span className="text-white font-medium">
                {profileInfo?.credits}
              </span>
            </p>
          </div>

          <div className="flex-1 flex md:items-center justify-between md:justify-center w-full">
            <p className="flex items-center font-semibold gap-1 text-sm text-white/80 justify-between w-full md:justify-center">
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                <span>Available Video Time:</span>
              </div>
              <span className="text-white font-medium">
                {profileInfo?.videoTime}
              </span>
            </p>
          </div>

          <div className="flex-1 flex md:items-center justify-between md:justify-center w-full">
            <p className="flex items-center gap-1 font-semibold text-sm text-white/80 justify-between w-full md:justify-center">
              <div className="flex items-center gap-1">
                <CreditCard className="size-4" />
                <span>Credit Value:</span>
              </div>
              <span className="text-white font-medium">
                ${profileInfo?.creditValue || "00"}
              </span>
            </p>
          </div>
        </section>
      )}

      {/* videos and characters */}
      <section>
        {/* tabs and filter */}
        <div className="flex items-center justify-between gap-5 flex-wrap mt-6">
          <div className="w-full md:w-fit p-1 bg-white/5 rounded-[10px] flex items-center">
            <button
              onClick={() => setActiveTab("videos")}
              className={cn(
                "py-[10px] flex-1 md:flex-none px-4 sm:px-6 md:px-9 relative rounded-md transition-all",
                activeTab === "videos" && "text-primary"
              )}
              role="tab"
              aria-selected={activeTab === "videos"}
              aria-controls={`tabpanel-${"videos"}`}
            >
              {activeTab === "videos" && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary/5 rounded-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 mix-blend-normal">
                Videos ({videos?.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab("Shorts")}
              className={cn(
                "py-[10px] flex-1 md:flex-none px-4 sm:px-6 md:px-9 relative rounded-md transition-all",
                activeTab === "Shorts" && "text-primary"
              )}
              role="tab"
              aria-selected={activeTab === "Shorts"}
              aria-controls={`tabpanel-${"Shorts"}`}
            >
              {activeTab === "Shorts" && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary/5 rounded-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 mix-blend-normal">
                Shorts ({shortVideos?.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab("Characters")}
              className={cn(
                "py-[10px] flex-1 md:flex-none px-4 sm:px-6 md:px-9 relative rounded-md transition-all",
                activeTab === "Characters" && "text-primary"
              )}
              role="tab"
              aria-selected={activeTab === "Characters"}
              aria-controls={`tabpanel-${"Characters"}`}
            >
              {activeTab === "Characters" && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary/5 rounded-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 mix-blend-normal">
                Characters ({characters?.length})
              </span>
            </button>
          </div>

          <div className="flex flex-1 md:flex-none items-center gap-[10px]">
            {isAuthor && (
              <DropdownMenu open={statusOpen} onOpenChange={setStatusOpen}>
                <DropdownMenuTrigger
                  onClick={() => setStatusOpen(!statusOpen)}
                  className="outline-none py-[14px] px-6 bg-white/5 rounded-lg justify-center font-normal text-base flex items-center gap-4 w-full"
                >
                  {published ? "Public" : "Private"}
                  <ChevronDownIcon
                    className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${statusOpen ? "rotate-180" : ""}`}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-5 bg-black/80 backdrop-blur-[20px] border-none rounded-[10px] flex flex-col gap-3">
                  <DropdownMenuItem
                    className="cursor-pointer bg-transparent text-white hover:!bg-primary"
                    onClick={() => setPublished(true)}
                  >
                    Public
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer bg-transparent text-white hover:!bg-primary"
                    onClick={() => setPublished(false)}
                  >
                    Private
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
              <DropdownMenuTrigger
                onClick={() => setFilterOpen(!filterOpen)}
                className="outline-none py-[14px] px-6 bg-white/5 rounded-lg w-full justify-center font-normal text-base flex items-center gap-4"
              >
                {sort === "desc" ? "Latest" : "Oldest"}
                <ChevronDownIcon
                  className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${filterOpen ? "rotate-180" : ""}`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-5 bg-black/80 backdrop-blur-[20px] border-none rounded-[10px] flex flex-col gap-3">
                <DropdownMenuItem
                  className="cursor-pointer bg-transparent text-white hover:!bg-primary"
                  onClick={() => setSort("desc")}
                >
                  Latest
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer bg-transparent text-white hover:!bg-primary"
                  onClick={() => setSort("asc")}
                >
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
            {activeTab === "videos" && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[10px]">
                {!isLoading && videos?.length === 0 ? (
                  <p>No {published ? "Public" : "Private"} Video Found!!</p>
                ) : (
                  videos?.map((video) => (
                    <Video
                      title={video.title}
                      thumbnail={video.thumbnail}
                      views={video.views}
                      id={video.id}
                      key={video?.id}
                      published={video.published}
                      isAuthor={isAuthor}
                      refetch={refetch}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === "Shorts" && (
              <div className="grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-[10px]">
                {!isShortLoading && shortVideos?.length === 0 ? (
                  <p>No {published ? "Public" : "Private"} Video Found!!</p>
                ) : (
                  shortVideos?.map((video) => (
                    <ShortVideo
                      title={video.title}
                      thumbnail={video.thumbnail}
                      views={video.views}
                      id={video.id}
                      key={video?.id}
                      isAuthor={isAuthor}
                      refetch={refetch}
                      published={video.published}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === "Characters" && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[10px]">
                {!isLoadingCharacters && characters?.length === 0 ? (
                  <p>No {published ? "Public" : "Private"} Character Found!!</p>
                ) : (
                  characters?.map((character) => (
                    <Character
                      name={character.name}
                      picture={character.picture}
                      id={character.id}
                      key={character?.id}
                      published={character.published}
                      isAuthor={isAuthor}
                      refetch={refetchCharacters}
                      description={character?.description}
                    />
                  ))
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* mobile */}
      <MobileEditProfile
        open={openMobileEditProfile}
        setOpen={setOpenMobileEditProfile}
        handleUpdate={handleUpdateProfileInfo}
        name={name}
        profilePic={profilePic}
        description={description}
      />
    </main>
  );
};

export default ProfilePage;
