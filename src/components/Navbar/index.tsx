/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bell, ChevronDown } from "lucide-react";
import Link from "next/link";
import CreateVideoForm from "./CreateVideoForm";
import FilterSelect from "./FilterSelect";

interface IProps {
  isCollapsed: boolean;
}

const Navbar = ({ isCollapsed }: IProps) => {
  return (
    <div className="flex items-center gap-4">
      {/* Logo */}
      <motion.span
        initial={{ display: "none" }}
        animate={{ display: !isCollapsed ? "none" : "block" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn("text-sm", isCollapsed && "hidden")}
      >
        <Link
          href="/"
          className="text-[28px] transition-all duration-300 hover:scale-110 leading-[33px] font-semibold logo"
        >
          quander
        </Link>
      </motion.span>

      {/* Filter Tags */}
      <FilterSelect hasAccess />

      {/* Create video form */}
      <CreateVideoForm />

      {/* Notifications */}
      <button className="size-[46px] bg-white/5 rounded-[8px] flex items-center justify-center cursor-pointer bg-nav-item transition-all relative">
        <Bell className="size-[18px] text-primary" />
        <div className="absolute size-[6px] rounded-full top-2 right-2 bg-[#df3840]" />
      </button>

      {/* Profile */}
      <div className="h-[46px] bg-white/5 rounded-[8px] flex items-center gap-2 pr-2 cursor-pointer text-white hover:text-primary transition-all">
        <img
          src="/images/profile.jpg"
          className="h-full rounded-[8px] m-[2px]"
          alt=""
        />
        <ChevronDown className="size-5" />
      </div>
    </div>
  );
};

export default Navbar;
