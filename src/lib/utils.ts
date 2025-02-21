import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumbers = (numbers: number | null | undefined) => {
  if (!numbers) return "0";
  if (numbers >= 1000)
    return (numbers / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return numbers.toString();
};
