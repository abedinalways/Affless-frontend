import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatAmount = ({type , value}:{type?: string, value: string}) => 
  new Intl.NumberFormat(type || "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));

export const formatNumber = ({type, value}:{type?: string, value: string}) => new Intl.NumberFormat(type || "en-US" , {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value));


export const formatFullDate = (date: Date) => new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(date);