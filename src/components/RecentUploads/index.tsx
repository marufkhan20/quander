import { useGetVideos } from "@/api/useVideos";
import { Orientation } from "@/contants";
import VideoItem from "./VideoItem";

const RecentUploads = () => {
  const { data: videos } = useGetVideos({
    queryKey: "recent-uploads",
    orientation: Orientation.longVideos,
    published: true,
    generated: true,
    sort: "desc",
    limit: 4,
    type: "regular",
  });
  return (
    <div className="mt-[30px]">
      <h3 className="text-base font-semibold text-[#f1f1f1]">Recent Uploads</h3>

      <div className="mt-5 flex flex-col gap-5">
        {videos?.map((item) => (
          <VideoItem
            id={item.id}
            title={item?.title}
            thumbnail={item?.thumbnail}
            views={item?.views}
            likes={item?.likes?.length}
            key={item?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentUploads;
