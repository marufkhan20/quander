"use client";
import Hero from "@/components/Hero";
import ShortVideos from "@/components/ShortVideos";
import Videos from "@/components/Videos";
import { useLayout } from "@/context/LayoutContext";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const { isCollapsed } = useLayout();
  console.log("isCollapsed from home page", isCollapsed);
  return (
    <main>
      <div
        className={cn(
          isCollapsed
            ? "w-[calc(100vw-40px)] lg:w-[calc(100vw-170px)]"
            : "w-[calc(100vw-40px)] lg:w-[calc(100vw-390px)]"
        )}
      >
        <Hero />
      </div>

      <Videos />
      <ShortVideos />
    </main>
  );
};

export default HomePage;
