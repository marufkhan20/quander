"use client";
/* eslint-disable @next/next/no-img-element */
import { useGetProfile } from "@/api/useProfile";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/useProfileStore";
import { motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "../AuthModal";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Drawer } from "../ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ImageSkeleton from "../ui/image";
import CreateVideoForm from "./CreateVideoForm";
import FilterSelect from "./FilterSelect";
import MobileMenu from "./MobileMenu";
import Notifications from "./Notifications";

interface IProps {
  isCollapsed: boolean;
}

const Navbar = ({ isCollapsed }: IProps) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, status } = useSession({
    required: false,
    onUnauthenticated() {
      if (pathname === "/create-video") {
        router.push("/");
      }
    },
  });

  // get profile info
  const { refetch, data } = useGetProfile(
    session?.user?.id || "",
    "profile-info"
  );

  useEffect(() => {
    if (session && session.user) {
      refetch();
    }
  }, [session, refetch]);

  const { updateInfo, name, image } = useProfileStore();

  // set data global state
  useEffect(() => {
    if (data?.id) {
      updateInfo({
        name: data?.name,
        image: data?.image,
      });
    }
  }, [data, updateInfo]);
  return (
    <>
      <div className="w-full hidden lg:flex items-center gap-4">
        {/* Logo */}
        <motion.span
          initial={{ display: "none" }}
          animate={{ display: !isCollapsed ? "none" : "block" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn("text-sm", isCollapsed && "hidden")}
        >
          <Link href="/">
            <img src="/images/logo.png" alt="quander" />
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
        {session?.user?.id && <Notifications />}

        {/* Profile */}
        {status === "loading" ? (
          <div className="h-[46px] w-[100px] bg-white/10 rounded-[8px] flex items-center gap-2 pr-2 animate-pulse">
            <div className="h-full w-[60px] bg-white/20 rounded-[8px] m-[2px]" />
          </div>
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="h-[46px] bg-white/5 rounded-[8px] flex items-center gap-2 pr-2 cursor-pointer hover:bg-white/10 active:bg-white/15 transition-all">
                {image ? (
                  <img
                    src={image}
                    className="h-full object-contain rounded-[8px] m-[2px]"
                    alt=""
                  />
                ) : (
                  <ImageSkeleton className="h-[46px] rounded-[8px] m-[2px] w-10" />
                )}
                <ChevronDown className="size-5 text-primary" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-[#141414] border-slate-800 text-slate-100 mt-3"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{name}</p>
                  <p className="text-xs leading-none text-slate-400">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuGroup>
                <Link href={`/profile/${session?.user?.id || ""}`}>
                  <DropdownMenuItem className="flex items-center gap-2 p-3 focus:bg-slate-800 focus:text-slate-100 cursor-pointer">
                    <User className="size-4" />
                    <span>Profile</span>
                    {/* <span className="ml-auto text-xs text-slate-400">
                      400 connections
                    </span> */}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem
                className="flex items-center gap-2 p-3 text-red-400 focus:bg-slate-800 focus:text-red-400 cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut className="size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Dialog>
            <DialogTrigger className="hidden lg:block">
              <div className="flex items-center gap-[10px] bg-primary rounded-sm px-4 py-2.5 text-black transition-all hover:scale-105 duration-300">
                Sign In
              </div>
            </DialogTrigger>

            <AuthModal />
          </Dialog>
        )}
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
