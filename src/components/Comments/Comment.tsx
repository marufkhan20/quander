import { Edit, EllipsisVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

/* eslint-disable @next/next/no-img-element */
const Comment = () => {
  return (
    <div className="flex items-center gap-5 flex-wrap justify-between">
      <div className="flex gap-2">
        <img
          src="/images/profile.jpg"
          alt="profile"
          className="size-[50px] rounded-lg object-cover"
        />
        <div>
          <div className="flex items-center gap-1">
            <h3 className="text-lg font-medium leading-[22px] tracking-tighter">
              Everett Carlisle
            </h3>
            <span className="text-white/80 text-xs">4h ago</span>
          </div>
          <p className="mt-2 text-white/80">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
            repudiandae fuga nam maiores beatae suscipit?
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="size-6 flex items-center justify-center bg-[#141414] rounded-md cursor-pointer hover:bg-primary hover:text-black transition-all">
            <EllipsisVertical className="size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Edit /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Comment;
