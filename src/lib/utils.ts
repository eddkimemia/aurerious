import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"

export function generateReferralCode(length = 6): string {
  let code = ""
  for (let i = 0; i < length; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return code
}
