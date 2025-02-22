"use client";
/* eslint-disable @next/next/no-img-element */
import { useSubscribeProfile } from "@/api/useProfile";
import {
  useGetRelatedVideos,
  useGetVideo,
  useLikeVideo,
} from "@/api/useVideos";
import Comments from "@/components/Comments";
import CommentBox from "@/components/Comments/CommentBox";
import Breadcumb from "@/components/Shared/Breadcumb";
import EditVideo, { MobileEditVideo } from "@/components/Shared/EditVideo";
import VideoPlayer from "@/components/Shared/VideoPlayer";
import ShortVideo, {
  ShortVideoLoading,
} from "@/components/ShortVideos/ShortVideo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CustomButton from "@/components/ui/custom-button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ImageSkeleton from "@/components/ui/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Video, { VideoLoading } from "@/components/Videos/Video";
import { Orientation } from "@/contants";
import { cn, formatNumbers } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Edit,
  Play,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import WatchPageLoading from "./_components/Loading";

const WatchPage = () => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const { id } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [openMobileEdit, setOpenMobileEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const router = useRouter();

  // get orientation
  const searchParams = useSearchParams();
  const orientationData = searchParams.get("orientation");
  const [orientation, setOrientation] = useState(orientationData);

  const { data: session } = useSession();

  // get video
  const {
    data: video,
    isLoading,
    isError,
    refetch,
  } = useGetVideo({
    id: id as string,
    queryKey: `get-video-${id}`,
  });

  // update local state
  useEffect(() => {
    if (video?.id) {
      setTitle(video?.title || "");
      setDescription(video?.description || "");
      setTag(video?.tag || "");
      setViews(video?.views || 0);
      setLikes(video?.likes?.length || 0);
      setIsLiked(
        video?.likes ? video.likes.includes(session?.user?.id || "") : false
      );
      setOrientation(video?.orientation || "");
    }

    // check subscribe or not
    if (video?.channel) {
      const isSubscribed = video?.channel?.subscribers.some(
        (subscriber) => subscriber.id === session?.user?.id
      );

      setTotalSubscribers(video?.channel?.subscribers.length);

      if (isSubscribed) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    }
  }, [session, video]);

  // handle update video
  const handleUpdateVideo = (
    title?: string,
    tag?: string,
    description?: string
  ) => {
    setTitle(title || "");
    setDescription(description || "");
    setTag(tag || "");
  };

  // get releated videos
  const { data: releatedVideos, isLoading: isReleatedVideoLoading } =
    useGetRelatedVideos({
      queryKey: `get-related-videos-${id}`,
      id: id as string,
      limit: 5,
    });

  // set comments
  useEffect(() => {
    if (video?.comments) {
      setComments(
        video.comments.map((comment) => ({
          ...comment,
          createdAt: new Date(comment.createdAt),
          updatedAt: new Date(comment.updatedAt),
        }))
      );
    }

    if (video?.id && session && video?.creatorId === session?.user?.id) {
      setIsAuthor(true);
    }
  }, [session, video]);

  // handle delete comment
  const handleDeleteComment = (id: string) => {
    const newComments = comments?.filter((comment) => comment?.id !== id);

    setComments(newComments);
  };

  // handle add comment
  const handleAddComment = (comment: CommentWithAuthor) => {
    const newComments = [comment, ...comments];
    setComments(newComments);
  };

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
        if (data && "isSubscribed" in data) {
          setIsSubscribed(data?.isSubscribed || false);
          setTotalSubscribers((total) =>
            data?.isSubscribed ? total + 1 : total - 1
          );
        }

        refetch();
      }
    }
  }, [data, isSubscribeSuccess, refetch]);

  // like video
  const { mutate: likeVideo, data: likeVideoData } = useLikeVideo();

  useEffect(() => {
    if (likeVideoData) {
      setIsLiked(likeVideoData?.isLiked);
    }
  }, [likeVideoData]);

  const likeVideoHandler = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      setLikes((prevLikes) => prevLikes + 1);
    }

    likeVideo({
      json: { userId: session?.user?.id || "" },
      param: { id: video?.id || "" },
    });
  };

  // download video
  const downloadVdieo = () => {
    const link = document.createElement("a");
    link.href = video?.url || "";
    link.download = `${video?.title?.replace(" ", "-").toLowerCase()}.mp4`; // Suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isLoading && isError) {
    return notFound();
  }
  return (
    <main className="relative">
      <Breadcumb page={"Watch"} />

      {(!orientation || orientation === Orientation.longVideos) && (
        <div className="mt-3 flex flex-col md:flex-row justify-between gap-8">
          {isLoading ? (
            <WatchPageLoading />
          ) : (
            <div className="flex-1">
              <div>
                <VideoPlayer
                  setViews={setViews}
                  thumbnail={video?.thumbnail}
                  src={video?.url}
                />
              </div>

              <div className="mt-8 pb-10 border-b border-white/10">
                <div className="flex items-center justify-between gap-5 flex-wrap">
                  <h2 className="text-[20px] leading-[18px] md:text-[26px] md:leading-[18px] font-semibold">
                    {title}
                  </h2>
                  <div className="flex items-center gap-[10px]">
                    {tag && (
                      <span className="inline-block py-4 px-5 bg-white/5 rounded-lg">
                        {tag}
                      </span>
                    )}
                    <button
                      className="!w-11 !h-11 rounded-full flex items-center justify-center cursor-pointer bg-[#d1f561]/5 transition-all hover:bg-primary hover:text-black text-primary"
                      onClick={downloadVdieo}
                    >
                      <Download className="size-6" />
                    </button>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-[#e24988] bg-[#e24988]/5 cursor-pointer"
                        onClick={likeVideoHandler}
                      >
                        {/* <Heart className="size-6" /> */}
                        <img
                          src="/images/icons/heart.svg"
                          alt="heart"
                          className={cn(
                            "size-6",
                            !isLiked && "invert brightness-0 hue-rotate-180"
                          )}
                        />
                      </div>
                      <span>{formatNumbers(likes)}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm md:text-base mt-6">{description}</p>

                <div className="flex items-center gap-2 mt-6">
                  <div className="flex items-center gap-1 pr-2 border-r border-white/20">
                    <Play className="size-[18px]" />
                    <span>{formatNumbers(views)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-[18px]" />
                    <span>58m</span>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between gap-5 flex-wrap">
                  <Link
                    href={`/profile/${video?.creatorId}`}
                    className="flex items-center gap-2 w-fit p-1 pr-10 transition-all cursor-pointer hover:bg-primary/40 rounded-xl"
                  >
                    {video?.creator?.image ? (
                      <img
                        src={video?.creator?.image}
                        alt="profile"
                        className="size-[50px] rounded-xl object-cover"
                      />
                    ) : (
                      <ImageSkeleton className="size-[50px] rounded-xl" />
                    )}
                    <div>
                      <h4 className="text-xl font-medium">
                        {video?.creator?.name}
                      </h4>
                      <span className="text-white/50">
                        {formatNumbers(totalSubscribers)}{" "}
                        {totalSubscribers < 2 ? "subscriber" : "subscribers"}
                      </span>
                    </div>
                  </Link>

                  {!isAuthor ? (
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
                                channelId: video?.channelId
                                  ? video?.channelId
                                  : "",
                                userId: session?.user?.id || "",
                              },
                            })
                          }
                        >
                          <User />{" "}
                          <span>
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                          </span>
                        </CustomButton>
                      </TooltipTrigger>
                      {!session && (
                        <TooltipContent>Please Login</TooltipContent>
                      )}
                    </Tooltip>
                  ) : (
                    <>
                      <div className="hidden lg:block">
                        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                          <DialogTrigger>
                            <button className="hidden lg:flex items-center gap-[10px] py-2 px-4 rounded-md text-sm bg-white/5 transition-all hover:scale-105 hover:bg-primary hover:text-black duration-300">
                              <Edit className="size-4" /> <span>Edit</span>
                            </button>
                          </DialogTrigger>

                          <EditVideo
                            setOpen={setOpenEdit}
                            title={title}
                            description={description || ""}
                            id={video?.id || ""}
                            tag={tag || ""}
                            handleUpdate={handleUpdateVideo}
                          />
                        </Dialog>
                      </div>
                      <button
                        className="flex lg:hidden items-center gap-[10px] py-2 px-4 rounded-md text-sm bg-white/5 transition-all hover:scale-105 hover:bg-primary hover:text-black duration-300"
                        onClick={() => setOpenMobileEdit(true)}
                      >
                        <Edit className="size-4" /> <span>Edit Video</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-[30px] md:mt-[60px]">
                <button
                  className="flex md:hidden items-center justify-between gap-2 w-full px-5 py-6 bg-white-2 rounded-lg mb-4 text-lg cursor-pointer"
                  onClick={() => setOpenCommentBox(!openCommentBox)}
                >
                  <span className="font-extrabold">
                    Comments{" "}
                    <span className="font-normal">({comments?.length})</span>
                  </span>
                  <motion.span
                    animate={{ rotate: openCommentBox ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.span>
                </button>

                {/* mobile */}
                <div className="block md:hidden">
                  <AnimatePresence>
                    {openCommentBox && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <CommentBox
                          handleAddComment={handleAddComment}
                          authorId={video?.creatorId || ""}
                        />

                        <div className="mt-10">
                          <Comments
                            handleDelete={handleDeleteComment}
                            comments={comments}
                          />

                          {!isLoading && comments?.length === 0 && (
                            <p>No comment!</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="hidden md:block">
                  <CommentBox
                    handleAddComment={handleAddComment}
                    authorId={video?.creatorId || ""}
                  />

                  <div className="mt-10">
                    <Comments
                      handleDelete={handleDeleteComment}
                      comments={comments}
                    />

                    {!isLoading && comments?.length === 0 && <p>No comment!</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* you may like */}
          <div className="md:w-[292px]">
            <h3 className="font-semibold text-lg text-white/60 md:text-white md:text-[22px] tracking-tight">
              You May Like
            </h3>

            <div className="mt-[10px] hidden md:flex flex-col gap-[10px]">
              {releatedVideos?.map((video) => (
                <Video
                  key={video?.id}
                  title={video?.title}
                  id={video?.id}
                  thumbnail={video?.thumbnail}
                  views={video?.views}
                />
              ))}

              {isReleatedVideoLoading &&
                Array.from({ length: 5 }).map((_, idx) => (
                  <VideoLoading key={idx} className="!aspect-video h-auto" />
                ))}

              {!isReleatedVideoLoading && releatedVideos?.length === 0 && (
                <p>No Releated Video Found!</p>
              )}
            </div>

            <div className="block md:hidden mt-[10px]">
              <Carousel>
                <CarouselContent>
                  {releatedVideos?.map((video) => (
                    <CarouselItem
                      key={video?.id}
                      className="basis-1/1.3 sm:basis-1/2.5 xl:basis-1/3.5"
                    >
                      <Video
                        key={video?.id}
                        title={video?.title}
                        id={video?.id}
                        thumbnail={video?.thumbnail}
                        views={video?.views}
                      />
                    </CarouselItem>
                  ))}

                  {isReleatedVideoLoading &&
                    Array.from({ length: 5 }).map((_, idx) => (
                      <CarouselItem
                        key={idx}
                        className="basis-1/1.3 sm:basis-1/2.5 xl:basis-1/3.5"
                      >
                        <VideoLoading className="aspect-video h-auto" />
                      </CarouselItem>
                    ))}
                </CarouselContent>
              </Carousel>

              {!isReleatedVideoLoading && releatedVideos?.length === 0 && (
                <p>No Releated Video Found!</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* short video */}
      {video?.orientation === Orientation.shortVideos && (
        <>
          <div className="flex items-start flex-col md:flex-row gap-[30px] mt-[10px]">
            <div className="w-full sm:w-[380px] lg:w-[470px] flex gap-[30px] items-center">
              <div className="flex-1 h-fit">
                <VideoPlayer
                  src={video?.url}
                  thumbnail={video?.thumbnail}
                  setViews={setViews}
                />
              </div>
              <div className="hidden md:flex flex-col gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      className="size-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-black disabled:hover:bg-primary/40 disabled:cursor-not-allowed"
                      onClick={() => {
                        if (video?.previousVideoId) {
                          router.push(
                            `/watch/${video.previousVideoId}?orientation=portrait`
                          );
                        }
                      }}
                      disabled={!video?.nextVideoId}
                    >
                      <ChevronUp />
                    </button>
                    {!video?.previousVideoId && (
                      <TooltipContent>Previous Video Not Found!</TooltipContent>
                    )}
                  </TooltipTrigger>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <button
                      className="size-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-black disabled:hover:bg-primary/40 disabled:cursor-not-allowed"
                      onClick={() => {
                        if (video?.nextVideoId) {
                          router.push(
                            `/watch/${video.nextVideoId}?orientation=portrait`
                          );
                        }
                      }}
                      disabled={!video?.nextVideoId}
                    >
                      <ChevronDown />
                    </button>
                    {!video?.nextVideoId && (
                      <TooltipContent side="bottom">
                        Next Video Not Found!
                      </TooltipContent>
                    )}
                  </TooltipTrigger>
                </Tooltip>
              </div>
            </div>

            <div className="flex-1">
              <div className="pb-10 border-b border-white/10">
                <div className="flex items-center justify-between gap-5 flex-wrap">
                  <h2 className="text-[20px] leading-[18px] md:text-[26px] font-semibold">
                    {title}
                  </h2>
                  <div className="flex items-center gap-[10px]">
                    {tag && (
                      <span className="inline-block py-4 px-5 bg-white/5 rounded-lg">
                        {tag}
                      </span>
                    )}
                    <button
                      className="!w-11 !h-11 rounded-full flex items-center justify-center cursor-pointer bg-[#d1f561]/5 transition-all hover:bg-primary hover:text-black text-primary"
                      onClick={downloadVdieo}
                    >
                      <Download className="size-6" />
                    </button>
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-[#e24988] bg-[#e24988]/5 cursor-pointer"
                      onClick={likeVideoHandler}
                    >
                      {/* <Heart className="size-6" /> */}
                      <img
                        src="/images/icons/heart.svg"
                        alt="heart"
                        className={cn(
                          "size-6",
                          !isLiked && "invert brightness-0 hue-rotate-180"
                        )}
                      />
                    </div>
                    <span>{formatNumbers(likes)}</span>
                  </div>
                </div>

                <p className="mt-6 text-sm md:text-base">{description}</p>

                <div className="flex items-center gap-2 mt-6">
                  <div className="flex items-center gap-1 pr-2 border-r border-white/20">
                    <Play className="size-[18px]" />
                    <span>{formatNumbers(views)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-[18px]" />
                    <span>58m</span>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between gap-5 flex-wrap">
                  <Link
                    href={`/profile/${video?.creatorId}`}
                    className="flex items-center gap-2 w-fit p-1 pr-10 transition-all cursor-pointer hover:bg-primary/40 rounded-xl"
                  >
                    {video?.creator?.image ? (
                      <img
                        src={video?.creator?.image}
                        alt="profile"
                        className="size-[50px] rounded-xl object-cover"
                      />
                    ) : (
                      <ImageSkeleton className="size-[50px] rounded-xl" />
                    )}
                    <div>
                      <h4 className="text-xl font-medium">
                        {video?.creator?.name}
                      </h4>
                      <span className="text-white/50">
                        {formatNumbers(totalSubscribers)}{" "}
                        {totalSubscribers < 2 ? "subscriber" : "subscribers"}
                      </span>
                    </div>
                  </Link>

                  {!isAuthor ? (
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
                                channelId: video?.channelId
                                  ? video?.channelId
                                  : "",
                                userId: session?.user?.id || "",
                              },
                            })
                          }
                        >
                          <User />{" "}
                          <span>
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                          </span>
                        </CustomButton>
                      </TooltipTrigger>
                      {!session && (
                        <TooltipContent>Please Login</TooltipContent>
                      )}
                    </Tooltip>
                  ) : (
                    <>
                      <div className="hidden lg:block">
                        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                          <DialogTrigger>
                            <button className="hidden lg:flex items-center gap-[10px] py-2 px-4 rounded-md text-sm bg-white/5 transition-all hover:scale-105 hover:bg-primary hover:text-black duration-300">
                              <Edit className="size-4" /> <span>Edit</span>
                            </button>
                          </DialogTrigger>

                          <EditVideo
                            setOpen={setOpenEdit}
                            title={title}
                            description={description || ""}
                            id={video?.id || ""}
                            tag={tag || ""}
                            handleUpdate={handleUpdateVideo}
                          />
                        </Dialog>
                      </div>
                      <button
                        className="flex lg:hidden items-center gap-[10px] py-2 px-4 rounded-md text-sm bg-white/5 transition-all hover:scale-105 hover:bg-primary hover:text-black duration-300"
                        onClick={() => setOpenMobileEdit(true)}
                      >
                        <Edit className="size-4" /> <span>Edit Video</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-[30px] md:mt-[60px]">
                <button
                  className="flex xl:hidden items-center justify-between gap-2 w-full px-5 py-6 bg-white-2 rounded-lg mb-4 text-lg cursor-pointer"
                  onClick={() => setOpenCommentBox(!openCommentBox)}
                >
                  <span className="font-extrabold">
                    Comments
                    <span className="font-normal">({comments?.length})</span>
                  </span>
                  <motion.span
                    animate={{ rotate: openCommentBox ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.span>
                </button>

                {/* mobile */}
                <div className="block xl:hidden">
                  <AnimatePresence>
                    {openCommentBox && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <CommentBox
                          handleAddComment={handleAddComment}
                          authorId={video?.creatorId || ""}
                        />
                        <div className="mt-10">
                          <Comments
                            handleDelete={handleDeleteComment}
                            comments={comments}
                          />
                          {/* {!isLoading && comments?.length === 0 && (
                            <p>No comment!</p>
                          )} */}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="hidden xl:block">
                  <div className="mb-10">
                    <Comments
                      handleDelete={handleDeleteComment}
                      comments={comments}
                    />
                    {!isLoading && comments?.length === 0 && <p>No comment!</p>}
                  </div>
                  <CommentBox
                    handleAddComment={handleAddComment}
                    authorId={video?.creatorId || ""}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[60px] mb-10 relative">
            <Carousel>
              <div className="flex items-center justify-between gap-5 flex-wrap">
                <h2 className="text-white/60 text-lg font-semibold">
                  You May Like
                </h2>
                <div className="flex items-center gap-2">
                  <CarouselPrevious className="bg-white/5 size-9 border-none hover:bg-primary" />
                  <CarouselNext className="bg-white/5 size-9 border-none hover:bg-primary" />
                </div>
              </div>

              <div className="mt-3">
                <CarouselContent>
                  {releatedVideos &&
                    releatedVideos?.map((video) => (
                      <CarouselItem
                        key={video?.id}
                        className="basis-1/2.5 sm:basis-1/3.5 xl:basis-1/5.5"
                      >
                        <ShortVideo
                          id={video?.id}
                          title={video?.title}
                          thumbnail={video?.thumbnail}
                          views={video?.views}
                        />
                      </CarouselItem>
                    ))}

                  {isLoading && (
                    <>
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <CarouselItem
                          key={idx}
                          className="basis-1/2.5 sm:basis-1/3.5 xl:basis-1/5.5"
                        >
                          <ShortVideoLoading />
                        </CarouselItem>
                      ))}
                    </>
                  )}
                </CarouselContent>
              </div>
            </Carousel>

            {!isReleatedVideoLoading && releatedVideos?.length === 0 && (
              <h2 className="text-white/60 text-base font-medium">
                No Releated Video Found!!
              </h2>
            )}
          </div>
        </>
      )}

      {/* mobile */}
      <MobileEditVideo
        open={openMobileEdit}
        setOpen={setOpenMobileEdit}
        title={title}
        description={description || ""}
        id={video?.id || ""}
        tag={tag || ""}
        handleUpdate={handleUpdateVideo}
      />
    </main>
  );
};

export default WatchPage;
