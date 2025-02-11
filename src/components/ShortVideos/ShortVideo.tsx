/* eslint-disable @next/next/no-img-element */
import { Download, EllipsisVertical, EyeOff, Play, Trash } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface IProps {
  isAuthor?: boolean;
}

const ShortVideo = ({ isAuthor }: IProps) => {
  return (
    <Link
      href="#"
      className="relative hover:scale-105 rounded-lg transition-all block duration-300 overflow-hidden"
    >
      <img src="/images/videos/2.jpg" className="rounded-lg" alt="" />
      <div className="bg-gradient-to-b from-transparent via-transparent rounded-lg to-black absolute inset-0 w-full h-full" />

      <div className="absolute left-0 right-0 bottom-0 w-full p-[10px] flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-sm font-semibold">Title of the video</h3>
        <div className="flex items-center gap-1">
          <Play className="size-[18px]" />
          <span>7.5K</span>
        </div>
      </div>

      {isAuthor && (
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute top-[3px] right-[3px] outline-none">
            <button className="size-6 flex items-center justify-center bg-black/70 rounded-md cursor-pointer z-40 transition-all hover:bg-primary/70 hover:text-black">
              <EllipsisVertical className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-5 bg-black/80 backdrop-blur-[20px] border-none rounded-[10px] flex flex-col gap-3">
            <DropdownMenuItem className="cursor-pointer bg-transparent text-white hover:!bg-primary">
              <EyeOff /> <span>Hide from profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer bg-transparent text-white hover:!bg-primary">
              <Download /> <span>Download video</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer bg-transparent text-red-700 hover:!bg-red-700 hover:!text-white">
              <Trash /> <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Link>
  );
};

export default ShortVideo;
