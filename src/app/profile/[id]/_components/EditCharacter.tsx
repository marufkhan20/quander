/* eslint-disable @next/next/no-img-element */
"use client";

import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const EditCharacter = () => {
  return (
    <DialogContent className="hidden lg:block bg-[#0d0d0d] border-none max-w-[550px] rounded-xl px-[30px]">
      <DialogTitle />
      <EditCharacterContent />
    </DialogContent>
  );
};

const EditCharacterContent = ({
  className,
  setOpen,
}: {
  className?: string;
  setOpen?: (value: boolean) => void;
}) => {
  return (
    <div className={cn(className)} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg sm:text-[22px] font-semibold">Edit Character</h2>
        <X
          onClick={() => setOpen && setOpen(false)}
          className="block lg:hidden size-[22px] cursor-pointer"
        />
      </div>

      <div className="mt-9 lg:w-[340px] mx-auto flex items-center gap-4">
        <img
          className="size-[140px] rounded-[10px] object-cover"
          src="/images/character.avif"
          alt="character"
        />
        <div className="flex flex-1 flex-col gap-2">
          <button className="py-2 w-full sm:px-10 border border-white/20 text-sm text-white/80 inline-block outline-none rounded-[9px] transition-all hover:bg-primary hover:border-primary hover:text-black">
            Upload Picture
          </button>
          <button className="py-2 w-full sm:px-10 border border-white/20 text-sm text-white/80 inline-block outline-none rounded-[9px] transition-all hover:bg-red-800 hover:border-red-800 hover:text-white">
            Delete Picture
          </button>
        </div>
      </div>

      <div className="mt-9">
        <form action="" className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="first-name"
                className="uppercase text-white/30 font-medium text-sm"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                placeholder="First name"
                className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="last-name"
                className="uppercase text-white/30 font-medium text-sm"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                placeholder="Last name"
                className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium"
              />
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
              placeholder="Enter your character description"
              className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium min-h-[150px]"
            />
          </div>

          <div className="flex w-full justify-center items-center">
            <button className="py-2 px-4 bg-primary text-black text-sm rounded transition-all duration-300 hover:scale-105">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const MobileEditCharacter = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <div
      className={cn(
        "lg:hidden fixed z-50 inset-0 h-full w-full bg-black/40 flex items-end transition-all duration-300 opacity-0 invisible",
        open && "opacity-100 visible"
      )}
      onClick={() => setOpen(false)}
    >
      <EditCharacterContent
        className={cn(
          "bg-[#212121] w-full p-[30px] rounded-tl-[10px] rounded-tr-[10px] transition-all duration-300 translate-y-[100%]",
          open && "translate-y-0"
        )}
        setOpen={setOpen}
      />
    </div>
  );
};

export default EditCharacter;
