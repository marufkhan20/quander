import { TAGS } from "@/contants";
import { cn } from "@/lib/utils";
import { useNavbarStore } from "@/store/useNavbarStore";
import {
  ArrowUp,
  Clock,
  Film,
  Gem,
  Plus,
  RectangleHorizontal,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Tag from "../ui/tag";
import CreateVideoDropdown from "./CreateVideoDropdown";

const CreateVideoForm = () => {
  const [prompt, setPrompt] = useState("");
  const pathname = usePathname();
  const [selectedTag, setSelectedTag] = useState("");
  const [resolution, setResolution] = useState("720p");
  const [duration, setDuration] = useState("15s");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [videoType, setVideoType] = useState("Fiction AI Fild");

  const router = useRouter();

  const { open, updateInfo, challengeId, challengeName } = useNavbarStore();

  // submit handler
  const submitHandler = () => {
    router.push(
      `https://video.quander.ai/chat/generate-fiction?prompt=${prompt}&format=${videoType}&orientation=${
        aspectRatio === "16:9" ? "landscape" : "portrait"
      }&resolution=${resolution}&duration=${duration}&tag=${selectedTag}&challengeId=${challengeId}`
    );
  };
  return (
    <>
      <div className="flex-1 hidden lg:flex items-center gap-2 bg-white/5 rounded-[8px] relative">
        <input
          type="text"
          className="flex-1 px-5 py-[14px] outline-none bg-transparent placeholder:text-white/50"
          placeholder="Give your video a story..."
          onClick={() => updateInfo && updateInfo({ open: true })}
        />
        <div className="pr-5">
          <ArrowUp className="cursor-pointer transition-all hover:text-primary text-white/50" />
        </div>

        {/* form */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 w-full z-50 create-video-form rounded-lg p-4 duration-300 transition-all",
            open ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        >
          <textarea
            placeholder="Give your video a story..."
            className="bg-transparent outline-none w-full mt-2 text-lg px-[10px]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <X
            className="absolute top-2 right-2 cursor-pointer transition-all text-white/40 hover:text-white"
            onClick={() => updateInfo({ open: false })}
          />

          <div
            className="mt-6 flex items-center flex-wrap justify-between gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-[10px] flex-wrap">
              <div className="size-9 rounded-full bg-white/5 flex items-center justify-center text-white cursor-pointer transition-all hover:scale-110">
                <Plus className="w-6 h-6" />
              </div>

              <CreateVideoDropdown
                icon={<Film className="w-[18px] h-[18px]" />}
                label="Vide Type"
                options={["Fiction AI Fild", "Realistic Talking Head"]}
                value={videoType}
                onChange={setVideoType}
              />
              <CreateVideoDropdown
                icon={<RectangleHorizontal className="w-[18px] h-[18px]" />}
                label="Aspect Ratio"
                options={["16:9", "9:16"]}
                value={aspectRatio}
                onChange={setAspectRatio}
              />
              <CreateVideoDropdown
                icon={<Gem className="w-[18px] h-[18px]" />}
                label="Resolution"
                options={["720p", "1080p"]}
                value={resolution}
                onChange={setResolution}
              />
              <CreateVideoDropdown
                icon={<Clock className="w-[18px] h-[18px]" />}
                label="Duration"
                options={["15s", "30s", "60s"]}
                value={duration}
                onChange={setDuration}
              />
            </div>
            <div
              className="size-9 rounded-full bg-primary flex items-center justify-center text-black cursor-pointer transition-all hover:scale-110"
              onClick={submitHandler}
            >
              <ArrowUp className="w-6 h-6" />
            </div>
          </div>

          {pathname?.includes("/daily-challenges") && (
            <div className="mt-6 flex flex-col gap-6">
              <div className="flex flex-col gap-[10px]">
                <label
                  htmlFor=""
                  className="uppercase text-white/30 font-medium text-sm"
                >
                  Tags
                </label>
                <div className="flex items-center gap-[10px] flex-wrap">
                  {TAGS.map((item) => (
                    <Tag
                      selectedTag={selectedTag}
                      setSelectedTag={setSelectedTag}
                      tag={item}
                      key={item}
                    />
                  ))}
                </div>
              </div>
              {challengeId ? (
                <div className="flex flex-col gap-[10px]">
                  <label
                    htmlFor=""
                    className="uppercase text-white/30 font-medium text-sm"
                  >
                    Daily Challenge
                  </label>
                  <div className="flex items-center gap-[10px] flex-wrap">
                    <Tag
                      selectedTag={challengeName || ""}
                      setSelectedTag={() => ""}
                      tag={challengeName || ""}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-white/50">
                  No Active Challenge Found!
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* mobile */}
      <div
        className={cn(
          "block lg:hidden fixed transition-all duration-300 z-[1000] inset-0 w-full h-full bg-black/40",
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => updateInfo && updateInfo({ open: false })}
      >
        <div
          className={cn(
            "bg-white/5 block transition-all z-[10000] w-full duration-300 lg:hidden border-none rounded-tl-[28px] rounded-tr-[28px] fixed -bottom-[100%] left-0 right-0",
            open && "bottom-0"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={cn(
              "w-full z-50 create-video-form rounded-lg p-4 duration-300 transition-all pb-5"
            )}
          >
            <div className="flex justify-end">
              <X
                className="size-[30px] cursor-pointer"
                onClick={() => updateInfo && updateInfo({ open: false })}
              />
            </div>
            <textarea
              placeholder="Give your video a story..."
              className="bg-transparent outline-none w-full mt-6 text-lg px-[10px] min-h-[150px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            {pathname?.includes("/daily-challenges") && (
              <div className="mt-6 flex flex-col gap-6">
                <div className="flex flex-col gap-[10px]">
                  <label
                    htmlFor=""
                    className="uppercase text-white/30 font-medium text-sm"
                  >
                    Tags
                  </label>
                  <div>
                    <Carousel>
                      <CarouselContent>
                        {TAGS.map((item) => (
                          <CarouselItem
                            key={item}
                            className="basis-1/2 sm:basis-1/4 md:basis-1/6"
                          >
                            <Tag
                              selectedTag={selectedTag}
                              setSelectedTag={setSelectedTag}
                              tag={item}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>
                </div>
                {challengeId ? (
                  <div className="flex flex-col gap-[10px]">
                    <label
                      htmlFor=""
                      className="uppercase text-white/30 font-medium text-sm"
                    >
                      Daily Challenge
                    </label>
                    <div className="flex items-center gap-[10px] flex-wrap">
                      <Tag
                        selectedTag={challengeName || ""}
                        setSelectedTag={() => ""}
                        tag={challengeName || ""}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-white/50">
                    No Active Challenge Found!
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-[10px] flex-wrap">
                <div className="size-9 rounded-full bg-white/5 flex items-center justify-center text-white cursor-pointer transition-all hover:scale-110">
                  <Plus className="w-6 h-6" />
                </div>

                <CreateVideoDropdown
                  icon={<Film className="w-[18px] h-[18px]" />}
                  label="Vide Type"
                  options={["Fiction AI Fild", "Realistic Talking Head"]}
                  value={videoType}
                  onChange={setVideoType}
                  side="top"
                />
                <CreateVideoDropdown
                  icon={<RectangleHorizontal className="w-[18px] h-[18px]" />}
                  label="Aspect Ratio"
                  options={["16:9", "9:16"]}
                  value={aspectRatio}
                  onChange={setAspectRatio}
                  side="top"
                />
                <CreateVideoDropdown
                  icon={<Gem className="w-[18px] h-[18px]" />}
                  label="Resolution"
                  options={["720p", "1080p"]}
                  value={resolution}
                  onChange={setResolution}
                  side="top"
                />
                <CreateVideoDropdown
                  icon={<Clock className="w-[18px] h-[18px]" />}
                  label="Duration"
                  options={["15s", "30s", "60s"]}
                  value={duration}
                  onChange={setDuration}
                  side="top"
                />

                {/* {pathname?.includes("/daily-challenges") && (
                  <div className="size-9 rounded-full bg-white/5 items-center text-white cursor-pointer transition-all hover:scale-110 flex justify-center">
                    <EllipsisVertical className="size-[18px]" />
                  </div>
                )} */}
              </div>
              <div
                className="size-9 rounded-full bg-primary flex items-center justify-center text-black cursor-pointer transition-all hover:scale-110"
                onClick={submitHandler}
              >
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
