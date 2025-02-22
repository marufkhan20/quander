/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "../contants";
import RecentUploads from "./RecentUploads";

interface IProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: IProps) => {
  const toggleSidebar = () => {
    setIsCollapsed((prev: boolean) => !prev);
  };

  return (
    <motion.div
      initial={{ width: "80px" }}
      animate={{ width: !isCollapsed ? "300px" : "80px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white/5 rounded-[10px] lg:block hidden h-fit text-white p-5"
    >
      {/* Toggle Button */}
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="px-[10px]">
          <Menu className="size-6" />
        </button>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn("text-sm", isCollapsed && "hidden")}
        >
          <Link href="/">
            <img src="/images/logo.png" alt="quander" />
          </Link>
        </motion.span>
      </div>

      {/* Sidebar Items */}
      <div className="mt-12 flex flex-col gap-[18px] mb-[30px]">
        {SIDEBAR_ITEMS?.map((item) => (
          // <motion.div
          //   key={item?.name}
          //   initial={{ opacity: 0 }}
          //   animate={{ opacity: 1 }}
          //   transition={{ delay: idx * 0.1 }}
          //   className="relative group w-full"
          // >
          <NavItem
            key={item.name}
            icon={item?.icon}
            label={item?.name}
            isCollapsed={isCollapsed}
            pathname={item?.pathname}
          />
          // </motion.div>
        ))}
      </div>

      <div
        className={`transition-all duration-500 ${
          isCollapsed ? "hidden" : "block"
        }`}
      >
        <RecentUploads />
      </div>
    </motion.div>
  );
};

export const NavItem = ({
  icon: Icon,
  label,
  isCollapsed,
  pathname,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isCollapsed?: boolean;
  pathname: string;
  onClick?: () => void;
}) => {
  const { data: session } = useSession();
  const currentPath = usePathname();
  const isProfile = label === "Profile";
  const isSignOut = label === "Sign Out";

  const Wrapper: React.ElementType = isSignOut
    ? "div"
    : isProfile && !session
    ? "div"
    : Link;
  const wrapperProps = isSignOut
    ? { onClick }
    : isProfile && !session
    ? { onClick }
    : { href: `/profile/${session?.user?.id}` };

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "flex items-center gap-3 cursor-pointer p-[10px] rounded-[8px] bg-nav-item-hover transition-all",
        isCollapsed ? "justify-center" : "justify-start",
        currentPath === pathname && "bg-nav-item"
      )}
    >
      <Icon className="!h-6 !w-6" />
      <motion.span
        animate={{ opacity: isCollapsed ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn("text-lg truncate", isCollapsed && "hidden")}
      >
        {isProfile && !session ? "Sign In" : label}
      </motion.span>
    </Wrapper>
  );
};

export default Sidebar;
