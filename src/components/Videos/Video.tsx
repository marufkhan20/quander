/* eslint-disable @next/next/no-img-element */
import { useDeleteVideo, useUpdateVideo } from "@/api/useVideos";
import { cn, formatNumbers } from "@/lib/utils";
import {
  Download,
  EllipsisVertical,
  Eye,
  EyeOff,
  LoaderCircle,
  Play,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ImageSkeleton from "../ui/image";

interface IProps {
  isAuthor?: boolean;
  title: string;
  thumbnail?: string | null;
  views?: number;
  id: string;
  published?: boolean;
  refetch?: () => void;
}

const Video = ({
  isAuthor,
  title,
  thumbnail,
  views,
  id,
  published,
  refetch,
}: IProps) => {
  const router = useRouter();

  // update video
  const { mutate, isPending, isSuccess } = useUpdateVideo();

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (refetch) refetch();
      toast.success("Video updated successfully.");
    }
  }, [isSuccess, isPending, refetch]);

  // delete video
  const {
    mutate: deleteVideo,
    isPending: isDeleteVideo,
    isSuccess: isDeleteSuccess,
  } = useDeleteVideo();

  useEffect(() => {
    if (!isDeleteVideo && isDeleteSuccess) {
      if (refetch) refetch();
      toast.success("Video deleted successfully.");
    }
  }, [isDeleteSuccess, isDeleteVideo, refetch]);
  return (
    <div
      // href={`/watch/${id}`}
      className="relative cursor-pointer hover:scale-105 rounded-lg transition-all block duration-300 overflow-hidden w-full"
      onClick={() => router.push(`/watch/${id}`)}
    >
      {thumbnail ? (
        <img src={thumbnail} className="rounded-lg" alt="" />
      ) : (
        <ImageSkeleton className="rounded-lg w-full aspect-video" />
      )}
      <div className="bg-gradient-to-b from-transparent via-transparent rounded-lg to-black absolute inset-0 w-full h-full" />

      <div className="absolute left-0 right-0 bottom-0 w-full p-[10px] flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="flex items-center gap-1 p-2 bg-black/50 rounded-lg backdrop-blur-[4px]">
          <Play className="size-[18px]" />
          <span>{formatNumbers(views)}</span>
        </div>
      </div>

      {isAuthor && (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute top-[3px] right-[3px] outline-none">
              <button className="size-6 flex items-center justify-center bg-black/70 rounded-md cursor-pointer z-40 transition-all hover:bg-primary/70 hover:text-black">
                <EllipsisVertical className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-5 bg-black/80 backdrop-blur-[20px] border-none rounded-[10px] flex flex-col gap-3">
              {published ? (
                <DropdownMenuItem
                  className="cursor-pointer bg-transparent text-white hover:!bg-primary"
                  onClick={() =>
                    mutate({
                      json: {
                        published: false,
                      },
                      param: {
                        id: id,
                      },
                    })
                  }
                >
                  <EyeOff /> <span>Hide from profile</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="cursor-pointer bg-transparent text-white hover:!bg-primary"
                  onClick={() =>
                    mutate({
                      json: {
                        published: true,
                      },
                      param: {
                        id: id,
                      },
                    })
                  }
                >
                  <Eye /> <span>Show in profile</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="cursor-pointer bg-transparent text-white hover:!bg-primary">
                <Download /> <span>Download video</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer bg-transparent text-red-700 hover:!bg-red-700 hover:!text-white"
                onClick={() => deleteVideo({ param: { id } })}
              >
                <Trash /> <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 z-50 w-full h-full bg-black/50 flex items-center transition-all duration-300 justify-center",
          isPending || isDeleteVideo
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <LoaderCircle className="animate-spin" />
      </div>
    </div>
  );
};

export default Video;

export const VideoLoading = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative w-full h-[250px] animate-pulse", className)}>
      {/* Skeleton for the image */}
      <div className="bg-white-2 rounded-lg w-full h-full" />
      <div className="absolute left-0 right-0 bottom-0 w-full p-[10px] flex items-center justify-between gap-4 flex-wrap">
        {/* Skeleton for title */}
        <div className="w-32 h-5 bg-black/40 rounded" />
        {/* Skeleton for views */}
        <div className="flex items-center gap-1 p-2 bg-black/40 rounded-lg w-20 h-6" />{" "}
      </div>
    </div>
  );
};
