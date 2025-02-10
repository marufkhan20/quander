import Hero from "@/components/Hero";
import ShortVideos from "@/components/ShortVideos";
import Videos from "@/components/Videos";

const page = () => {
  return (
    <main className="mt-8">
      <Hero />

      <Videos />
      <ShortVideos />
    </main>
  );
};

export default page;
