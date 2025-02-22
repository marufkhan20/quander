/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useUpdateVideo } from "@/api/useVideos";
import { TAGS_ITEMS } from "@/contants";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomButton from "../ui/custom-button";
import { DialogContent, DialogTitle } from "../ui/dialog";
import Tag from "../ui/tag";

interface IProps {
  id: string;
  title?: string;
  tag?: string;
  description?: string;
  setOpen: (value: boolean) => void;
  handleUpdate: (title: string, tag: string, description: string) => void;
}

const EditVideo = (props: IProps) => {
  return (
    <DialogContent className="hidden lg:block bg-[#0d0d0d] border-none max-w-[700px] rounded-xl px-[30px]">
      <DialogTitle />

      <EditVideoContent {...props} />
    </DialogContent>
  );
};

interface ContentIProps extends IProps {
  className?: string;
}

const EditVideoContent = (props: ContentIProps) => {
  const { className, setOpen, handleUpdate } = props || {};

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setTitle(props?.title || "");
    setDescription(props?.description || "");
    setSelectedTag(props?.tag || "");
  }, [props]);

  // update video api
  const { mutate, isPending: isLoading, isSuccess, isError } = useUpdateVideo();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Video updated successfully.");
      handleUpdate(title, selectedTag, description);
      setOpen(false);
    }

    if (!isLoading && isError) {
      toast.error("Server error occurred while updating video.");
    }
  }, [isLoading, isSuccess, isError]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      json: {
        title,
        description,
        tag: selectedTag,
      },
      param: {
        id: id as string,
      },
    });
  };
  return (
    <div className={cn(className)} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg sm:text-[22px] font-semibold">Edit Video</h2>
        <X
          onClick={() => setOpen && setOpen(false)}
          className="block lg:hidden size-[22px] cursor-pointer"
        />
      </div>

      <div className="mt-9">
        <form onSubmit={submitHandler} className="flex flex-col gap-10">
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="title"
              className="uppercase text-white/30 font-medium text-sm"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your video title"
              className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium"
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="tags"
              className="uppercase text-white/30 font-medium text-sm"
            >
              Tags
            </label>
            <div className="flex gap-[10px] flex-wrap">
              {TAGS_ITEMS?.map((tag) => (
                <Tag
                  key={tag}
                  tag={tag}
                  selectedTag={selectedTag}
                  setSelectedTag={setSelectedTag}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="Description"
              className="uppercase text-white/30 font-medium text-sm"
            >
              Description
            </label>
            <textarea
              id="Description"
              placeholder="Enter your video description"
              className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium min-h-[150px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex w-full justify-center items-center">
            <CustomButton loading={isLoading} type="submit">
              Save Changes
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

interface MobileIProps extends IProps {
  open: boolean;
}

export const MobileEditVideo = (props: MobileIProps) => {
  const { open, setOpen } = props;
  return (
    <div
      className={cn(
        "lg:hidden fixed z-50 inset-0 h-full w-full bg-black/40 flex items-end transition-all duration-300 opacity-0 invisible",
        open && "opacity-100 visible"
      )}
      onClick={() => setOpen(false)}
    >
      <EditVideoContent
        className={cn(
          "bg-[#212121] w-full p-[30px] rounded-tl-[10px] rounded-tr-[10px] transition-all duration-300 translate-y-[100%]",
          open && "translate-y-0"
        )}
        {...props}
      />
    </div>
  );
};

export default EditVideo;
