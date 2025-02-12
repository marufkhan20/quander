"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { LayoutContext } from "@/context/LayoutContext";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

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
    <LayoutContext.Provider value={{ isCollapsed }}>
      <div className="px-5 lg:px-[30px] pt-5 lg:pt-[30px] flex gap-[30px]">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className="flex-1">
          <Navbar isCollapsed={isCollapsed} />
          <div className="mt-8">{children}</div>
        </div>
      </div>
      <Footer />
    </LayoutContext.Provider>
  );
};

export default ClientLayout;
