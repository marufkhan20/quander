import { SIDEBAR_ITEMS } from "@/contants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MoveRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthModalMobile } from "../AuthModal";
import { NavItem } from "../Sidebar";
import CreateVideoForm from "./CreateVideoForm";

interface IProps {
  openMobileMenu: boolean;
  setOpenMobileMenu: (value: boolean) => void;
}

const MobileMenu = ({ openMobileMenu, setOpenMobileMenu }: IProps) => {
  const [mobileCreateForm, setMobileCreateForm] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpenMobileMenu(false);
  }, [mobileCreateForm, setOpenMobileMenu, openAuth, pathname]);
  return (
    <>
      <div
        className={cn(
          "fixed transition-all duration-300 inset-0 w-full bg-black/80 h-full z-50",
          openMobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setOpenMobileMenu(false)}
      >
        <div
          className={cn(
            "w-full sm:w-[440px] fixed left-[-120%] top-0 bottom-0 bg-[#141414] transition-all duration-500 h-full p-5",
            openMobileMenu && "left-0"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-full">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-[28px] transition-all duration-300 hover:scale-110 leading-[33px] font-semibold logo"
              >
                quander
              </Link>
              <div>
                <X
                  className="cursor-pointer size-7"
                  onClick={() => setOpenMobileMenu(false)}
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-[18px]">
              {SIDEBAR_ITEMS?.map((item, idx) => (
                <motion.div
                  key={item?.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group w-full"
                >
                  <NavItem
                    key={item.name}
                    icon={item?.icon}
                    label={item?.name}
                    pathname={item?.pathname}
                    onClick={() => item.name === "Profile" && setOpenAuth(true)}
                  />
                </motion.div>
              ))}
            </div>

            <button
              className="absolute left-5 bottom-[30px] right-5 flex items-center justify-center gap-2 py-4 transition-all hover:scale-105 bg-primary rounded-[10px] font-semibold text-lg text-black"
              onClick={() => setMobileCreateForm(true)}
            >
              Create a video <MoveRight />
            </button>
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <CreateVideoForm
          mobileCreateForm={mobileCreateForm}
          setMobileCreateForm={setMobileCreateForm}
        />
      </div>

      {/* Auth mobile */}
      <AuthModalMobile open={openAuth} setOpen={setOpenAuth} />
    </>
  );
};

export default MobileMenu;
