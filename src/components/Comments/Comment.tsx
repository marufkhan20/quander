"use client";
/* eslint-disable @next/next/no-img-element */
import { useDeleteComment, useUpdateComment } from "@/api/useComment";
import { cn, timeAgo } from "@/lib/utils";
import {
  Check,
  Edit,
  EllipsisVertical,
  LoaderCircle,
  Trash,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ImageSkeleton from "../ui/image";

interface IProps {
  comment: CommentWithAuthor;
  handleDelete: (id: string) => void;
}

const Comment = ({ comment, handleDelete }: IProps) => {
  const swipeRef = useRef<HTMLDivElement>(null);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [text, setText] = useState("");
  const { data: session } = useSession();
  const [editComment, setEditComment] = useState(false);

  // Trigger animation when component mounts
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComment(true);
    }, 100); // Delay for smooth entry
    return () => clearTimeout(timeout);
  }, []);

  const { author, text: commentText, id, authorId, createdAt } = comment || {};
  const { name, image } = author || {};

  useEffect(() => {
    if (commentText) {
      setText(commentText);
    }
  }, [commentText]);

  // check authority
  useEffect(() => {
    if (session && session?.user?.id === authorId) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }, [authorId, session]);

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

  // update comment
  const {
    mutate: updateComment,
    isPending,
    isSuccess,
    isError,
  } = useUpdateComment();

  useEffect(() => {
    if (!isPending && isSuccess) {
      setEditComment(false);
      toast.success("Comment updated successfully.");
    }

    if (!isPending && isError) {
      toast.error("Comment updated failed.");
    }
  }, [isSuccess, isError, isPending]);

  // delete comment
  const {
    mutate: deleteComment,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeleteComment();

  useEffect(() => {
    if (!isDeletePending && isDeleteSuccess) {
      setEditComment(false);
      toast.success("Comment deleted successfully.");
      handleDelete(id!);
    }

    if (!isDeletePending && isDeleteError) {
      toast.error("Comment delete failed.");
    }
  }, [isDeleteSuccess, isDeleteError, isDeletePending, handleDelete, id]);
  return (
    <div
      className={cn(
        "flex items-center transition-all duration-500 ease-out transform gap-5 justify-between opacity-0 translate-y-4",
        showComment && "opacity-100 translate-y-0"
      )}
      ref={swipeRef}
    >
      <div
        className={cn(
          "flex gap-2 flex-1 transition-all duration-300",
          swipeDirection === "left" && "-ml-[50px]",
          swipeDirection === "right" && "ml-0"
        )}
      >
        {image ? (
          <img
            src={image}
            alt={`profile-${name}`}
            className="size-[50px] rounded-lg object-cover"
          />
        ) : (
          <ImageSkeleton className="size-[50px] rounded-lg" />
        )}
        <div>
          <div className="flex items-center gap-1">
            <h3 className="text-lg font-medium leading-[22px] tracking-tighter">
              {name}
            </h3>
            <span className="text-white/80 text-xs">{timeAgo(createdAt)}</span>
          </div>
          {editComment ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={text || ""}
                placeholder="Comment"
                className="bg-white/5 rounded-md mt-1 py-1 px-3 outline-none"
                onChange={(e) => setText(e.target.value)}
              />

              <button
                className="py-1.5 px-3 bg-primary rounded-md disabled:bg-primary/40"
                disabled={isPending}
                onClick={() =>
                  updateComment({ param: { id: id! }, json: { text } })
                }
              >
                {isPending ? (
                  <LoaderCircle className="text-black animate-spin size-4" />
                ) : (
                  <Check className="text-black size-4" />
                )}
              </button>

              <button
                className="py-1.5 px-3 bg-red-700 rounded-md disabled:bg-red-700/40"
                onClick={() => {
                  setText(commentText || "");
                  setEditComment(false);
                }}
                disabled={isPending}
              >
                <X className="text-white size-4" />
              </button>
            </div>
          ) : (
            <p className="mt-2 text-white/80">{text}</p>
          )}
        </div>
      </div>

      {isAuthor && (
        <>
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="size-6 flex items-center justify-center bg-[#141414] rounded-md cursor-pointer hover:bg-primary hover:text-black transition-all">
                  {isDeletePending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <EllipsisVertical className="size-4" />
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setEditComment(true)}
                >
                  <Edit /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => deleteComment({ param: { id: id! } })}
                >
                  <Trash /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {swipeDirection === "left" && (
            <div className="flex md:hidden items-center rounded-[10px] overflow-hidden">
              <div
                className="size-[60px] flex items-center justify-center bg-white/5 cursor-pointer"
                onClick={() => setEditComment(true)}
              >
                <Edit className="size-4" />
              </div>
              <div className="size-[60px] flex items-center justify-center bg-red-600 cursor-pointer">
                <Trash className="size-4" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
