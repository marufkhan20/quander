import Hero from "@/components/Hero";
import ShortVideos from "@/components/ShortVideos";
import Videos from "@/components/Videos";

const page = () => {
  return (
    <main>
      <Hero />

      <Videos />
      <ShortVideos />
    </main>
  );
};

export default page;
