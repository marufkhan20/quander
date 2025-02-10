"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ReactNode, useState } from "react";

interface IProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: IProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <div className="px-[30px] pt-[30px] flex gap-[30px]">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className="flex-1">
          <Navbar isCollapsed={isCollapsed} />
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientLayout;
