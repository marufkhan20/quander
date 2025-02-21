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

// calculate time ago
export function timeAgo(dateString: Date | null) {
  if (dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
      year: 365 * 24 * 60 * 60,
      month: 30 * 24 * 60 * 60,
      day: 24 * 60 * 60,
      hour: 60 * 60,
      minute: 60,
      second: 1,
    };

    for (const [key, value] of Object.entries(intervals)) {
      const time = Math.floor(diffInSeconds / value);
      if (time >= 1) {
        return `${time} ${key}${time > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  } else {
    return "Just now";
  }
}
