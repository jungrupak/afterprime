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
    setIsOpen(false);

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
    let lastTouchAt = 0;
    let consecutiveQualifyingSamples = 0;

    function handleTouch() {
      lastTouchAt = Date.now();
    }

    function handleScroll() {
      const now = Date.now();
      const y = window.scrollY;
      const dt = now - lastScrollT;
      const dy = lastScrollY - y; // positive = scrolling up

      // Baseline must refresh on every call, even when we bail below —
      // otherwise the next real sample would see a stale dt/dy.
      lastScrollY = y;
      lastScrollT = now;

      if (document.body.style.position === "fixed") {
        // Mobile nav scroll-lock (Header.tsx) snaps scrollY to 0 and fires a
        // synthetic scroll event — not a real user gesture. Bail and break
        // any in-progress qualifying streak.
        consecutiveQualifyingSamples = 0;
        return;
      }

      if (dt <= 0 || dt > 200) {
        consecutiveQualifyingSamples = 0;
        return; // stale baseline / not a continuous gesture
      }
      if (dy > 400) {
        consecutiveQualifyingSamples = 0;
        return; // implausible jump (programmatic scroll-lock or smooth-scroll anchor), not a finger flick
      }
      if (Date.now() - lastTouchAt > 150) {
        consecutiveQualifyingSamples = 0;
        return; // no recent real touch input — likely a programmatic scroll
      }

      const velocity = dy / dt;
      if (y <= MOBILE_NEAR_TOP_PX && velocity >= MOBILE_MIN_VELOCITY) {
        consecutiveQualifyingSamples += 1;
        if (consecutiveQualifyingSamples >= 2) {
          fire();
        }
      } else {
        consecutiveQualifyingSamples = 0;
      }
    }

    function cleanup() {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
    }

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("touchstart", handleTouch, { passive: true });
      window.addEventListener("touchmove", handleTouch, { passive: true });
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
