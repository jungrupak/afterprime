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

    if (href) {
      if (href.startsWith("#")) {
        // Local scroll target
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        // Normal route navigation if not already there
        if (pathname !== href) {
          router.push(href);
        }
      }
    }
  };
  return handleClick;
}
