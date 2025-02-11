"use client";
import { TAGS } from "@/contants";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function FilterSelect({ hasAccess }: { hasAccess: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const [filter, setFilter] = useState("All");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (langId: string) => {
    if (!hasAccess && langId !== "javascript") return;

    setFilter(langId);
    setIsOpen(false);
  };

  // if (!mounted) return null;

  if (pathname !== "/") return null;
  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-3 px-4 py-2.5 bg-white/5 
      rounded-lg transition-all 
       duration-200 border border-gray-800/50 hover:border-gray-700
       ${
         !hasAccess && filter !== "all" ? "opacity-50 cursor-not-allowed" : ""
       }`}
      >
        {/* Decoration */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 
        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />

        <span className="text-gray-200 min-w-[80px] text-left group-hover:text-white transition-colors">
          {filter}
        </span>

        <ChevronDownIcon
          className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white/5 backdrop-blur-xl
           rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
          >
            <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400">Select Filter</p>
            </div>

            <div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
              {TAGS?.map((item) => {
                const Icon = item?.icon;
                return (
                  <div key={item?.name} className="relative group px-2">
                    <button
                      className={`
                      relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${
                        filter === item?.name
                          ? "bg-primary/10 text-primary"
                          : "text-gray-300"
                      }
                    `}
                      onClick={() => handleLanguageSelect(item?.name)}
                      // disabled={isLocked}
                    >
                      {/* decorator */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/5 rounded-lg 
                      opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <div
                        className={`
                         relative size-8 flex items-center justify-center rounded-lg p-1.5 group-hover:scale-110 transition-transform
                         ${
                           filter === item?.name
                             ? "bg-primary/10"
                             : "bg-gray-800/50"
                         }
                       `}
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        <Icon />
                      </div>
                      <span className="flex-1 text-left group-hover:text-white transition-colors">
                        {item?.name}
                      </span>
                      {/* selected language border */}
                      {filter === item?.name && (
                        <motion.div
                          className="absolute inset-0 border-2 border-primary/20 rounded-lg"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default FilterSelect;
