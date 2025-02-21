import { cn } from "@/lib/utils";
import { LucideLoader2 } from "lucide-react";
import { ReactNode } from "react";

interface IProps {
  className?: string;
  loading?: boolean;
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const CustomButton = ({
  className,
  children,
  loading,
  type = "button",
  disabled,
  onClick,
}: IProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={cn(
        "py-2 px-4 bg-primary text-black text-sm rounded transition-all flex items-center gap-2 duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading && <LucideLoader2 className="animate-spin size-4" />}
      {children}
    </button>
  );
};

export default CustomButton;
