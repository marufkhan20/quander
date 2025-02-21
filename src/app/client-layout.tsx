"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LayoutContext } from "@/context/LayoutContext";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

interface IProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: IProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [setIsCollapsed, pathname]);
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <QueryClientProvider client={queryClient}>
        <LayoutContext.Provider value={{ isCollapsed }}>
          <TooltipProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="px-5 lg:px-[30px] pt-5 lg:pt-[30px] flex gap-[30px]">
              <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
              <div className="flex-1">
                <Navbar isCollapsed={isCollapsed} />
                <div className="mt-8">{children}</div>
              </div>
            </div>
            <Footer />
          </TooltipProvider>
        </LayoutContext.Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default ClientLayout;
