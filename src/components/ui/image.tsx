import { cn } from "@/lib/utils";
import { Image as ImageIcon } from "lucide-react";

const ImageSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex bg-white/5 items-center justify-center", className)}
    >
      <ImageIcon className="size-7" />
    </div>
  );
};

export default ImageSkeleton;
