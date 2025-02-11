/* eslint-disable @next/next/no-img-element */
"use client";
import { DialogContent, DialogTitle } from "../../../../components/ui/dialog";

const EditCharacter = () => {
  return (
    <DialogContent className="bg-[#0d0d0d] border-none max-w-[550px] rounded-xl px-[30px]">
      <DialogTitle className="text-[22px] font-semibold">
        Edit Character
      </DialogTitle>

      <div className="mt-9 w-[340px] mx-auto flex items-center gap-4">
        <img
          className="size-[140px] rounded-[10px] object-cover"
          src="/images/character.avif"
          alt="profile"
        />
        <div className="flex flex-col gap-2">
          <button className="py-2 px-10 border border-white/20 text-sm text-white/80 inline-block outline-none rounded-[9px] transition-all hover:bg-primary hover:border-primary hover:text-black">
            Upload Picture
          </button>
          <button className="py-2 px-10 border border-white/20 text-sm text-white/80 inline-block outline-none rounded-[9px] transition-all hover:bg-red-800 hover:border-red-800 hover:text-white">
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
                placeholder="Enter your first name"
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
                placeholder="Enter your last name"
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
              placeholder="Enter your video description"
              className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium min-h-[150px]"
            />
          </div>

          <div className="flex w-full gap-[10px] justify-center items-center">
            <button className="py-2 px-4 bg-primary text-black text-sm rounded transition-all duration-300 hover:scale-105">
              Save Changes
            </button>
            <button className="py-2 px-4 bg-white/10 text-white text-sm rounded transition-all duration-300 hover:scale-105 hover:bg-red-800">
              Delete Character
            </button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
};

export default EditCharacter;
