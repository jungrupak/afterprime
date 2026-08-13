"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SUPPORTED_LOCALES } from "@/config/locales";

const SESSION_KEY = "ap_exit_intent_shown";
const EXCLUDED_PATHS = [
  "/webtrader-mt4",
  "/webtrader-mt4-demo",
  "/webtrader-mt5",
];
const MOBILE_NEAR_TOP_PX = 120;
const MOBILE_MIN_VELOCITY = 0.6; // px/ms upward

function stripLocalePrefix(path: string): string {
  const segments = path.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  if ((SUPPORTED_LOCALES as readonly string[]).includes(maybeLocale)) {
    return "/" + segments.slice(1).join("/");
  }
  return path;
}

export function useExitIntent() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const normalizedPathname = pathname ? stripLocalePrefix(pathname) : pathname;
    if (EXCLUDED_PATHS.some((path) => normalizedPathname?.startsWith(path))) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let hasFired = false;

    function fire() {
      if (hasFired) return;
      hasFired = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsOpen(true);
      cleanup();
    }

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) fire();
    }

    let lastScrollY = window.scrollY;
    let lastScrollT = Date.now();

    function handleScroll() {
      const now = Date.now();
      const y = window.scrollY;
      const dt = Math.max(now - lastScrollT, 1);
      const dy = lastScrollY - y; // positive = scrolling up
      const velocity = dy / dt;

      if (y <= MOBILE_NEAR_TOP_PX && velocity >= MOBILE_MIN_VELOCITY) {
        fire();
      }

      lastScrollY = y;
      lastScrollT = now;
    }

    function cleanup() {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    }

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return cleanup;
  }, [pathname]);

  return {
    isOpen,
    close: () => setIsOpen(false),
  };
}
