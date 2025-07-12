import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-pink-600/40 text-pink-500 border border-pink-500",
  "bg-yellow-400/30 text-yellow-400 border border-yellow-400",
  "bg-teal-400/30 text-teal-400 border border-teal-400",
  "bg-blue-400/30 text-blue-400 border border-blue-400",
];


export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
};
