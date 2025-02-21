"use client";
import ShortVideos from "@/components/ShortVideos";
import Videos from "@/components/Videos";
import { useLayout } from "@/context/LayoutContext";
import { cn } from "@/lib/utils";
import Hero from "./_components/Hero";

const HomePage = () => {
  const { isCollapsed } = useLayout();
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
