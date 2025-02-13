"use client";
import { cn } from "@/lib/utils";
import { Edit, EllipsisVertical, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

/* eslint-disable @next/next/no-img-element */
const Comment = () => {
  const swipeRef = useRef<HTMLDivElement>(null);
  const [swipeDirection, setSwipeDirection] = useState("");

  useEffect(() => {
    const element = swipeRef.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        setSwipeDirection(diffX > 0 ? "right" : "left");
      } else {
        setSwipeDirection(diffY > 0 ? "down" : "up");
      }
    };

    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
  return (
    <div className="flex items-center gap-5 justify-between" ref={swipeRef}>
      <div
        className={cn(
          "flex gap-2 flex-1 transition-all duration-300",
          swipeDirection === "left" && "-ml-[50px]",
          swipeDirection === "right" && "ml-0"
        )}
      >
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

      <div className="hidden md:block">
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

      {swipeDirection === "left" && (
        <div className="flex md:hidden items-center rounded-[10px] overflow-hidden">
          <div className="size-[60px] flex items-center justify-center bg-white/5 cursor-pointer">
            <Edit className="size-4" />
          </div>
          <div className="size-[60px] flex items-center justify-center bg-red-600 cursor-pointer">
            <Trash className="size-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
