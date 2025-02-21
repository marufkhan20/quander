/* eslint-disable @next/next/no-img-element */
import { useDeleteVideo, useUpdateVideo } from "@/api/useVideos";
import {
  Download,
  EllipsisVertical,
  Eye,
  EyeOff,
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

interface IProps {
  isAuthor?: boolean;
  title: string;
  thumbnail?: string | null;
  views?: number;
  id: string;
  published?: boolean;
  refetch?: () => void;
}

const ShortVideo = ({
  isAuthor,
  title,
  thumbnail,
  views,
  id,
  refetch,
  published,
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
      onClick={() => router.push(`/watch/${id}`)}
      className="relative hover:scale-105 rounded-lg transition-all block duration-300 overflow-hidden cursor-pointer"
    >
      <img
        src={thumbnail || "/images/videos/2.jpg"}
        className="rounded-lg"
        alt=""
      />
      <div className="bg-gradient-to-b from-transparent via-transparent rounded-lg to-black absolute inset-0 w-full h-full" />

      <div className="absolute left-0 right-0 bottom-0 w-full p-[10px] flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="flex items-center gap-1">
          <Play className="size-[18px]" />
          <span>{views}</span>
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
    </div>
  );
};

export default ShortVideo;

export const ShortVideoLoading = () => {
  return (
    <div className="relative w-full h-[400px] aspect-auto animate-pulse">
      {/* Skeleton for the image */}
      <div className="bg-white-2 rounded-lg w-full h-full" />{" "}
      {/* Skeleton content (title & views) */}
      <div className="absolute left-0 right-0 bottom-0 w-full p-[10px] flex items-center justify-between gap-4 flex-wrap">
        {/* Skeleton for title */}
        <div className="w-20 h-5 bg-black/40 rounded" />{" "}
        {/* Skeleton for views */}
        <div className="flex items-center gap-1 p-2 bg-black/40 rounded-lg w-20 h-6" />{" "}
      </div>
    </div>
  );
};
