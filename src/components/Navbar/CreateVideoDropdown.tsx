"use client";
import type React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  RectangleHorizontal,
  RectangleVertical,
} from "lucide-react";

interface CreateVideoDropdownProps {
  icon?: React.ReactNode;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  type?: "aspect-ratio" | "resolution" | "duration";
  side?: "top" | "bottom";
}

export default function CreateVideoDropdown({
  icon,
  // label,
  options,
  value,
  onChange,
  type,
  side,
}: CreateVideoDropdownProps) {
  const getAspectRatioIcon = (value: string) => {
    if (value.includes("9:16")) {
      return <RectangleVertical className="w-[18px] h-[18px]" />;
    }
    return <RectangleHorizontal className="w-[18px] h-[18px]" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-9 rounded-full bg-white/5 items-center text-white cursor-pointer transition-all hover:scale-110 px-4 flex gap-[6px] group">
        {type === "aspect-ratio" ? getAspectRatioIcon(value) : icon}
        <p>{value}</p>
        <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-[#141414] border-slate-800 text-slate-100 min-w-[120px] z-[1000000]"
        align="end"
        side={side || "bottom"}
        onClick={(e) => e.stopPropagation()}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            className={cn(
              "flex items-center gap-2 focus:bg-slate-800 focus:text-slate-100 cursor-pointer",
              value === option && "bg-white/5"
            )}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from bubbling up
              onChange(option);
            }}
          >
            {type === "aspect-ratio" && (
              <span className="w-[18px] h-[18px] flex items-center justify-center">
                {getAspectRatioIcon(option)}
              </span>
            )}
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
