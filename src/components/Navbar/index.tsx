/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bell, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AuthModal from "../AuthModal";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Drawer } from "../ui/drawer";
import CreateVideoForm from "./CreateVideoForm";
import FilterSelect from "./FilterSelect";
import MobileMenu from "./MobileMenu";

interface IProps {
  isCollapsed: boolean;
}

const Navbar = ({ isCollapsed }: IProps) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  return (
    <>
      <div className="w-full flex items-center gap-4">
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
        <div className="hidden lg:block">
          <FilterSelect hasAccess />
        </div>

        {/* Create video form */}
        <Drawer>
          <CreateVideoForm
            createForm={createForm}
            setCreateForm={setCreateForm}
          />
        </Drawer>

        {/* Notifications */}
        <button className="hidden lg:flex size-[46px] bg-white/5 rounded-[8px] items-center justify-center cursor-pointer bg-nav-item transition-all relative">
          <Bell className="size-[18px] text-primary" />
          <div className="absolute size-[6px] rounded-full top-2 right-2 bg-[#df3840]" />
        </button>

        {/* Profile */}

        <Dialog>
          <DialogTrigger className="hidden lg:block">
            <div className="h-[46px] bg-white/5 rounded-[8px] flex items-center gap-2 pr-2 cursor-pointer text-white hover:text-primary transition-all">
              <img
                src="/images/profile.jpg"
                className="h-full rounded-[8px] m-[2px]"
                alt=""
              />
              <ChevronDown className="size-5" />
            </div>
          </DialogTrigger>

          <AuthModal />
        </Dialog>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between gap-4 lg:hidden">
        <Link
          href="/"
          className="text-[28px] transition-all duration-300 hover:scale-110 leading-[33px] font-semibold logo"
        >
          quander
        </Link>
        <div>
          <Menu
            onClick={() => setOpenMobileMenu(true)}
            className="cursor-pointer size-6 text-white"
          />
        </div>
      </div>

      <MobileMenu
        openMobileMenu={openMobileMenu}
        setOpenMobileMenu={setOpenMobileMenu}
      />
    </>
  );
};

export default Navbar;
