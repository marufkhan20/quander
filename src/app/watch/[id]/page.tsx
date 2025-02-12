/* eslint-disable @next/next/no-img-element */
import Comments from "@/components/Comments";
import CommentBox from "@/components/Comments/CommentBox";
import Breadcumb from "@/components/Shared/Breadcumb";
import VideoPlayer from "@/components/Shared/VideoPlayer";
import Video from "@/components/Videos/Video";
import { Clock, Download, Heart, Play, User } from "lucide-react";

const WatchPage = () => {
  const isAuthor = true;
  return (
    <main>
      <Breadcumb page={"Watch"} />

      <div className="mt-3 flex justify-between gap-8">
        <div className="flex-1">
          <div>
            <VideoPlayer />
          </div>

          <div className="mt-8 pb-10 border-b border-white/10">
            <div className="flex items-center justify-between gap-5 flex-wrap">
              <h2 className="text-[26px] leading-[18px] font-semibold">
                Title of the video
              </h2>
              <div className="flex items-center gap-[10px]">
                <span className="inline-block py-4 px-5 bg-white/5 rounded-lg">
                  Comedy
                </span>
                <div className="!w-11 !h-11 rounded-full flex items-center justify-center cursor-pointer bg-[#d1f561]/5 transition-all hover:bg-primary hover:text-black text-primary">
                  <Download className="size-6" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-[#e24988] bg-[#e24988]/5 cursor-pointer">
                    <Heart className="size-6" />
                  </div>
                  <span>1850</span>
                </div>
              </div>
            </div>

            <p className="mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              quibusdam eius aliquam minima sapiente consequuntur maiores sit,
              rem soluta nemo vitae nesciunt accusamus, repellat laboriosam
              asperiores enim laudantium adipisci officia mollitia iure minus
              atque ut odio deserunt. Iure labore et illum illo beatae? Expedita
              dolorum exercitationem consequuntur est atque debitis tempore
              recusandae maiores, omnis explicabo aspernatur laudantium?
              Dolorum, consequuntur laboriosam!
            </p>

            <div className="flex items-center gap-2 mt-6">
              <div className="flex items-center gap-1 pr-2 border-r border-white/20">
                <Play className="size-[18px]" />
                <span>7.5K</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-[18px]" />
                <span>58m</span>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between gap-5 flex-wrap">
              <div className="flex items-center gap-2 w-fit p-1 pr-10 transition-all cursor-pointer hover:bg-primary/40 rounded-xl">
                <img
                  src="/images/profile.jpg"
                  alt="profile"
                  className="size-[50px] rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-xl font-medium">Anna R</h4>
                  <span className="text-white/50">6K subscribers</span>
                </div>
              </div>

              {!isAuthor ? (
                <button className="flex items-center gap-[10px] py-2 px-4 rounded-md text-black text-sm bg-primary transition-all hover:scale-105 duration-300">
                  <User /> <span>Subscribe</span>
                </button>
              ) : (
                // <Dialog>
                //   <DialogTrigger>
                //     <button className="flex items-center gap-[10px] py-2 px-4 rounded-md text-sm bg-white/5 transition-all hover:scale-105 hover:bg-primary hover:text-black duration-300">
                //       <Edit className="size-4" /> <span>Edit</span>
                //     </button>
                //   </DialogTrigger>

                //   <EditVideo />
                // </Dialog>
                <></>
              )}
            </div>
          </div>

          <div className="mt-[60px]">
            <CommentBox />

            <div className="mt-10">
              <Comments />
            </div>
          </div>
        </div>

        <div className="w-[292px]">
          <h3 className="font-semibold text-[22px] tracking-tight">
            You May Like
          </h3>
          <div className="mt-[10px] flex flex-col gap-[10px]">
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WatchPage;
