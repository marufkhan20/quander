/* eslint-disable react-hooks/exhaustive-deps */
import { useAddComment } from "@/api/useComment";
import { LoaderCircle, MoveUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  authorId: string;
  handleAddComment: (comment: CommentWithAuthor) => void;
}

const CommentBox = ({ authorId, handleAddComment }: IProps) => {
  const [comment, setComment] = useState("");
  const { id } = useParams();

  // add new comment
  const {
    mutate: addComment,
    data: newComment,
    isPending,
    isSuccess,
    isError,
  } = useAddComment();

  useEffect(() => {
    if (!isPending && isSuccess) {
      setComment("");
      handleAddComment({
        ...newComment,
        updatedAt: new Date(newComment?.updatedAt),
        createdAt: new Date(newComment?.createdAt),
      });
      toast.success("Comment added successfully.");
    }

    if (!isPending && isError) {
      toast.error("Comment added failed.");
    }
  }, [isSuccess, isError, isPending, newComment]);

  // submit handler
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment) {
      addComment({
        json: {
          text: comment,
          videoId: (id as string) || "",
          authorId,
        },
      });
    }
  };
  return (
    <form
      className="p-5 bg-white/5 rounded-lg flex items-center gap-[10px]"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        className="flex-1 bg-transparent border-b border-white/10 outline-none pb-1"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button disabled={isPending}>
        {isPending ? (
          <LoaderCircle className="size-4 text-white/50 animate-spin" />
        ) : (
          <MoveUp className="size-4 text-white/50 transition-all hover:text-white cursor-pointer" />
        )}
      </button>
    </form>
  );
};

export default CommentBox;
