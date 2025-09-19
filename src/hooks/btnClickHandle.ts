"use client";
import { useRouter, usePathname } from "next/navigation";

export interface ClickProps {
  onclick?: () => void;
  href?: string;
}

export function useButtonClickHandling({ onclick, href }: ClickProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (onclick) {
      onclick(); // run custom click logic
    }
    if (href && pathname !== href) {
      router.push(href); // navigate if not already there
    }
  };
  return handleClick;
}
