import { cn } from "@/lib/utils";
import {
  ArrowUp,
  Clock,
  Film,
  Gem,
  Plus,
  RectangleHorizontal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CreateVideoForm = () => {
  const [createOpt, setCreateOpt] = useState(false);
  const createVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        createVideoRef.current &&
        !createVideoRef.current.contains(event.target as Node)
      ) {
        setCreateOpt(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div
      className="flex-1 flex items-center gap-2 bg-white/5 rounded-[8px] relative"
      ref={createVideoRef}
    >
      <input
        type="text"
        className="flex-1 px-5 py-[14px] outline-none bg-transparent placeholder:text-white/50"
        placeholder="Give your video a story..."
        onClick={() => setCreateOpt(true)}
      />
      <div className="pr-5">
        <ArrowUp className="cursor-pointer transition-all hover:text-primary text-white/50" />
      </div>

      {/* form */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 w-full z-50 create-video-form rounded-lg p-4 duration-300 transition-all",
          createOpt ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <textarea
          placeholder="Give your video a story..."
          className="bg-transparent outline-none w-full mt-2 text-lg px-[10px]"
          onFocus={() => console.log("Textarea focused")}
          autoFocus
        />

        <div className="mt-6 flex items-center flex-wrap justify-between gap-4">
          <div className="flex items-center gap-[10px] flex-wrap">
            <div className="size-9 rounded-full bg-white/5 flex items-center justify-center text-white cursor-pointer transition-all hover:scale-110">
              <Plus className="w-6 h-6" />
            </div>
            <div className="h-9 rounded-full bg-white/5 items-center text-white cursor-pointer transition-all hover:scale-110 px-4 flex gap-[6px]">
              <Film className="w-[18px] h-[18px]" />
              <p>Fiction AI Film</p>
            </div>
            <div className="h-9 rounded-full bg-white/5 items-center text-white cursor-pointer transition-all hover:scale-110 px-4 flex gap-[6px]">
              <RectangleHorizontal className="w-[18px] h-[18px]" />
              <p>16:9</p>
            </div>
            <div className="h-9 rounded-full bg-white/5 items-center text-white cursor-pointer transition-all hover:scale-110 px-4 flex gap-[6px]">
              <Gem className="w-[18px] h-[18px]" />
              <p>720p</p>
            </div>
            <div className="h-9 rounded-full bg-white/5 items-center text-white cursor-pointer transition-all hover:scale-110 px-4 flex gap-[6px]">
              <Clock className="w-[18px] h-[18px]" />
              <p>15s</p>
            </div>
          </div>
          <div className="size-9 rounded-full bg-primary flex items-center justify-center text-black cursor-pointer transition-all hover:scale-110">
            <ArrowUp className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVideoForm;
