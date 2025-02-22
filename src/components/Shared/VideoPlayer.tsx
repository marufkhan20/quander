import { useUpdateVideo } from "@/api/useVideos";
import MuxPlayer from "@mux/mux-player-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  thumbnail?: string | null;
  src?: string;
  setViews: (views: number) => void;
}

const VideoPlayer = ({ thumbnail, src, setViews }: IProps) => {
  const [hasReached5Sec, setHasReached5Sec] = useState(false);
  const { id } = useParams();

  const handleTimeUpdate = (event: Event) => {
    const video = event.currentTarget as HTMLMediaElement; // Ensure correct type
    if (video.currentTime >= 5 && !hasReached5Sec) {
      setHasReached5Sec(true);
      onVideoWatched();
    }
  };

  // update video views
  const { mutate, isSuccess, data } = useUpdateVideo();

  useEffect(() => {
    if (isSuccess && data?.id) {
      setViews(data?.views);
    }
  }, [data, isSuccess, setViews]);

  const onVideoWatched = () => {
    mutate({
      param: { id: id as string },
      json: {
        addView: true,
      },
    });
  };

  return (
    <MuxPlayer
      poster={thumbnail || "/images/videos/1.jpg"}
      playerInitTime={0}
      autoPlay={false}
      thumbnailTime={0}
      className="relative w-full h-full rounded-xl object-cover"
      accentColor="#D1F561"
      src={src || "/videos/1.mp4"}
      onTimeUpdate={handleTimeUpdate} // Using native event type
    />
  );
};

export default VideoPlayer;
