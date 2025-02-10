import { MoveUp } from "lucide-react";

const CommentBox = () => {
  return (
    <div className="p-5 bg-white/5 rounded-lg flex items-center gap-[10px]">
      <input
        type="text"
        className="flex-1 bg-transparent border-b border-white/10 outline-none pb-1"
        placeholder="Add a comment"
      />
      <MoveUp className="size-4 text-white/50 transition-all hover:text-white cursor-pointer" />
    </div>
  );
};

export default CommentBox;
