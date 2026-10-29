"use client";
import { useRouter, usePathname } from "next/navigation";

export interface ClickProps {
  onclick?: () => void;
  href?: string;
}

export function useButtonClickHandling({ onclick, href }: ClickProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (): void => {
    // Run custom onclick if provided
    if (onclick) onclick();

    // Scroll / navigation logic
    if (href) {
      if (href.startsWith("#") && href.length > 1) {
        const element = document.querySelector<HTMLElement>(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (href !== "#" && pathname !== href) {
        router.push(href);
      }
    }
  };

  return { handleClick };
}
