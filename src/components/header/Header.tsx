"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { MegaMenuItems } from "@/utils/menu-item";
import TypeformButton from "../ui/typeForm";
import Navigation from "../nav/Nav";
import MobileNav from "../mobileNav/MobileNav";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

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

  return (
    <>
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
              <Link
                className={`ap_button washed small`}
                href="https://app.afterprime.com/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                Login
              </Link>
              <TypeformButton buttonText="Apply to Trade" size="small" />
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
