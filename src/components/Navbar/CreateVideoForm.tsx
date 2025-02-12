import { cn } from "@/lib/utils";
import {
  ArrowUp,
  Clock,
  Film,
  Gem,
  Plus,
  RectangleHorizontal,
} from "lucide-react";
import { useEffect, useRef } from "react";

interface IProps {
  createForm?: boolean;
  setCreateForm?: (value: boolean) => void;
  mobileCreateForm?: boolean;
  setMobileCreateForm?: (value: boolean) => void;
}

const CreateVideoForm = ({
  createForm,
  setCreateForm,
  mobileCreateForm,
  setMobileCreateForm,
}: IProps) => {
  const createVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        createVideoRef.current &&
        !createVideoRef.current.contains(event.target as Node)
      ) {
        if (setCreateForm) setCreateForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setCreateForm]);

  console.log("kljsd;fjds;fsfs", mobileCreateForm);
  return (
    <>
      <div
        className="flex-1 hidden lg:flex items-center gap-2 bg-white/5 rounded-[8px] relative"
        ref={createVideoRef}
      >
        <input
          type="text"
          className="flex-1 px-5 py-[14px] outline-none bg-transparent placeholder:text-white/50"
          placeholder="Give your video a story..."
          onClick={() => setCreateForm && setCreateForm(true)}
        />
        <div className="pr-5">
          <ArrowUp className="cursor-pointer transition-all hover:text-primary text-white/50" />
        </div>

        {/* form */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 w-full z-50 create-video-form rounded-lg p-4 duration-300 transition-all",
            createForm ? "opacity-100 visible" : "opacity-0 invisible"
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

      {/* mobile */}
      <div
        className={cn(
          "block lg:hidden fixed transition-all duration-300 z-[1000] inset-0 w-full h-full bg-black/40",
          mobileCreateForm ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMobileCreateForm && setMobileCreateForm(false)}
      >
        <div
          className={cn(
            "bg-white/5 block transition-all z-[10000] w-full duration-300 lg:hidden border-none rounded-tl-[28px] rounded-tr-[28px] fixed -bottom-[100%] left-0 right-0",
            mobileCreateForm && "bottom-0"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={cn(
              "w-full z-50 create-video-form rounded-lg p-4 duration-300 transition-all pb-5"
            )}
          >
            <textarea
              placeholder="Give your video a story..."
              className="bg-transparent outline-none w-full mt-2 text-lg px-[10px] min-h-[150px]"
              // autoFocus
              // value="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate provident impedit placeat omnis quos error maiores officia repudiandae consequatur tempora quaerat, illo laboriosam debitis, aliquam, rem nobis recusandae. Quis, inventore!"
            />

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-[10px] flex-wrap">
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
      </div>
    </>
  );
};

export default CreateVideoForm;
