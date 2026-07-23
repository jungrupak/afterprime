"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import TypeformButton from "../typeform-btn/typeForm";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useLocale } from "@/lib/locale/useLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

interface HeaderProps {
  applyNowText?: string;
}

export default function Header({ applyNowText = "Apply Now" }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const locale = useLocale();

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
          className={`ap_container_small flex items-center py-5 max-lg:px-5 max-xl:px-5 max-lg:py-5 max-xl:gap-10 justify-between`}
        >
          {/* Logo */}
          <div className={`${styles.ap_logo}`}>
            <Link href={localizeHref("/", locale)}>
              <Image
                src="/img/logo-main.svg"
                alt="Afterprime Logo"
                width={202}
                height={30}
              />
            </Link>
          </div>

          {/* Nav */}

          {/* Right Side (Desktop) */}
          <div className={`${styles.ap_header_right} max-[1204px]:hidden`}>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <TypeformButton
                buttonText={applyNowText}
                size="small"
                varient="ghost"
              />
            </div>
          </div>

          {/* Language Switcher (Mobile) — LP header has no mobile menu, so
              this is the only mobile-visible piece of ap_header_right */}
          <div className="hidden max-[1204px]:block">
            <LanguageSelector />
          </div>
        </div>
      </header>
    </>
  );
}
