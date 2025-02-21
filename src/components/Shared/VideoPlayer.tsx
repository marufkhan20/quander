import MuxPlayer from "@mux/mux-player-react";

interface IProps {
  thumbnail?: string | null;
  src?: string;
}

const VideoPlayer = ({ thumbnail, src }: IProps) => {
  return (
    <MuxPlayer
      poster={thumbnail || "/images/videos/1.jpg"}
      playerInitTime={0}
      autoPlay={false}
      thumbnailTime={0}
      className="relative w-full h-full rounded-xl object-cover"
      accentColor="#D1F561"
      src={src || "/videos/1.mp4"}
    />
  );
};

export default VideoPlayer;
