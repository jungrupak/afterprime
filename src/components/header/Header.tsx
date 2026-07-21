"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import { MegaMenuItems } from "@/utils/menu-item";
import TypeformButton from "../ui/typeForm";
import Navigation from "../nav/Nav";
import MobileNav from "../mobileNav/MobileNav";
import Button from "../ui/Button";
import { useBypassInvitation, BYPASS_SIGNUP_URL } from "@/hooks/useBypassInvitation";

export default function Header() {
  const bypassInvitation = useBypassInvitation();
  const [isSticky, setIsSticky] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const riskWarningRef = useRef<HTMLDivElement>(null);

  // ✅ MegaMenuItems should be plain array
  const MegaItems = MegaMenuItems;

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Header sits right below the risk warning bar, whatever height it wraps
  // to at the current viewport width (it can grow to 2-3 lines on mobile).
  useEffect(() => {
    const el = riskWarningRef.current;
    if (!el) return;

    const setOffset = () => {
      document.documentElement.style.setProperty(
        "--risk-warning-height",
        `${Math.ceil(el.getBoundingClientRect().height)}px`,
      );
    };

    setOffset();
    const observer = new ResizeObserver(setOffset);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={riskWarningRef} className={styles.riskWarning}>
        CFDs are complex instruments and come with a high risk of losing
        money rapidly due to leverage. Investors should consider whether
        they understand how CFDs work before investing. Losses may exceed
        deposits.
      </div>
      <header
        className={`${styles.ap_header} ${isSticky ? styles.sticky : ""} ${
          activeIndex != null ? styles.headerActive : ""
        }`}
      >
        <div
          className={`${styles.ap_container} ap_container_small flex items-center py-5 max-lg:px-5 max-xl:px-5 max-lg:py-5 max-xl:gap-10 justify-between`}
        >
          {/* Logo */}
          <div className={`${styles.ap_logo}`}>
            <Link href="/">
              <Image
                src="/img/logo-main.svg"
                alt="Afterprime Logo"
                width={202}
                height={30}
              />
            </Link>
          </div>

          {/* Nav */}

          <div className="max-[1204px]:hidden">
            <Navigation menus={MegaMenuItems} />
          </div>

          <MobileNav
            menus={MegaMenuItems}
            customClass={`${
              mobileMenu ? styles.activeMenu : styles.notActiveMenu
            }`}
            onClick={() => setMobileMenu(false)}
          />

          {/* Right Side (Desktop) */}
          <div className={`${styles.ap_header_right} max-[1204px]:hidden`}>
            <div className="flex items-center gap-4">
              <Button
                linkTarget="_blank"
                size="small"
                href="https://app.afterprime.com/login"
              >
                Login
              </Button>
              <Button
                linkTarget="_blank"
                varient="secondary"
                size="small"
                isArrowVisible={true}
                href={
                  bypassInvitation
                    ? BYPASS_SIGNUP_URL
                    : "https://app.afterprime.com/live"
                }
              >
                Signup
              </Button>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="hidden max-[1204px]:block ml-auto">
            <div className="flex gap-5">
              <span className="">
                <Link
                  href="https://app.afterprime.com/login"
                  className="xSmall ap_button ghost"
                  target="_blank"
                >
                  Login
                </Link>
              </span>
              <div
                className={`${styles.mobileMenuIcon} `}
                onClick={() => setMobileMenu((prev) => !prev)}
              >
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
