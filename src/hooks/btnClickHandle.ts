"use client";
import { useRouter, usePathname } from "next/navigation";
import { MouseEvent } from "react";

// Properly extend window for Typeform
declare global {
  interface Window {
    typeformEmbed?: {
      makePopup: (
        url: string,
        options?: {
          mode?: "popup" | "drawer-left" | "drawer-right" | "side-panel";
          hideHeaders?: boolean;
          hideFooters?: boolean;
          hideScrollbars?: boolean;
          autoClose?: number;
        }
      ) => { open: () => void };
    };
  }
}

export interface ClickProps {
  onclick?: () => void;
  href?: string;
  typeformId?: string;
}

export function useButtonClickHandling({
  onclick,
  href,
  typeformId,
}: ClickProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Properly typed click handler
  const handleClick = (
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ): void => {
    // Run custom onclick if provided
    if (onclick) onclick();

    // Typeform drawer logic
    if (typeformId && typeof window !== "undefined" && window.typeformEmbed) {
      e.preventDefault(); // stop default navigation
      window.typeformEmbed
        .makePopup(`https://form.typeform.com/to/${typeformId}`, {
          mode: "drawer-left",
          hideScrollbars: true,
        })
        .open();
      return;
    }

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

  return handleClick;
}
