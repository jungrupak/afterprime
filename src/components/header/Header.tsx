"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import type { HeaderContent } from "./headerContent";
import TypeformButton from "../ui/typeForm";
import Navigation from "../nav/Nav";
import MobileNav from "../mobileNav/MobileNav";
import Button from "../ui/Button";
import LanguageSelector from "../ui/LanguageSelector";
import { useBypassInvitation, BYPASS_SIGNUP_URL } from "@/hooks/useBypassInvitation";
import { useLocale } from "@/lib/locale/useLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

export default function Header({ content }: { content: HeaderContent }) {
  const { riskWarning, logoAlt, login, signup, signupNow, back, menuItems } =
    content;
  const bypassInvitation = useBypassInvitation();
  const locale = useLocale();
  const [isSticky, setIsSticky] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const riskWarningRef = useRef<HTMLDivElement>(null);

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
        {riskWarning}
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
            <Link href={localizeHref("/", locale)}>
              <Image
                src="/img/logo-main.svg"
                alt={logoAlt}
                width={202}
                height={30}
              />
            </Link>
          </div>

          {/* Nav */}

          <div className="max-[1204px]:hidden">
            <Navigation menus={menuItems} />
          </div>

          <MobileNav
            menus={menuItems}
            loginLabel={login}
            signupLabel={signup}
            signupNowLabel={signupNow}
            backLabel={back}
            logoAlt={logoAlt}
            customClass={`${
              mobileMenu ? styles.activeMenu : styles.notActiveMenu
            }`}
            onClick={() => setMobileMenu(false)}
          />

          {/* Right Side (Desktop) */}
          <div className={`${styles.ap_header_right} max-[1204px]:hidden`}>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <Button
                linkTarget="_blank"
                size="small"
                href="https://app.afterprime.com/login"
              >
                {login}
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
                {signup}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="hidden max-[1204px]:block ml-auto">
            <div className="flex gap-5 items-center">
              <LanguageSelector />
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
