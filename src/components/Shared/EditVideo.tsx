"use client";
import { useState } from "react";

const EditVideo = () => {
  const [selectedTag, setSelectedTag] = useState("");
  return (
    // <DialogContent className="bg-[#0d0d0d] border-none max-w-[700px] rounded-xl px-[30px]">
    //   <DialogTitle className="text-[22px] font-semibold">
    //     Edit Video Details
    //   </DialogTitle>

    //   <div className="mt-9">
    //     <form action="" className="flex flex-col gap-10">
    //       <div className="flex flex-col gap-[10px]">
    //         <label
    //           htmlFor="title"
    //           className="uppercase text-white/30 font-medium text-sm"
    //         >
    //           Title
    //         </label>
    //         <input
    //           type="text"
    //           id="title"
    //           placeholder="Enter your video title"
    //           className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium"
    //         />
    //       </div>

    //       <div className="flex flex-col gap-[10px]">
    //         <label
    //           htmlFor="tags"
    //           className="uppercase text-white/30 font-medium text-sm"
    //         >
    //           Tags
    //         </label>
    //         <div className="flex gap-[10px] flex-wrap">
    //           {TAGS_ITEMS?.map((tag) => (
    //             <Tag
    //               key={tag}
    //               tag={tag}
    //               selectedTag={selectedTag}
    //               setSelectedTag={setSelectedTag}
    //             />
    //           ))}
    //         </div>
    //       </div>

    //       <div className="flex flex-col gap-[10px]">
    //         <label
    //           htmlFor="Description"
    //           className="uppercase text-white/30 font-medium text-sm"
    //         >
    //           Description
    //         </label>
    //         <textarea
    //           id="Description"
    //           placeholder="Enter your video description"
    //           className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium min-h-[150px]"
    //         />
    //       </div>

    //       <div className="flex w-full justify-center items-center">
    //         <button className="py-2 px-4 bg-primary text-black text-sm rounded transition-all duration-300 hover:scale-105">
    //           Save Changes
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </DialogContent>
    <></>
  );
};

export default EditVideo;
