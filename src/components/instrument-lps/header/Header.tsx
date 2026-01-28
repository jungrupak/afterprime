"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

          {/* Right Side (Desktop) */}
          <div className={`${styles.ap_header_right} max-[1204px]:hidden`}>
            <div className="flex items-center gap-4">
              <Button
                varient="ghost"
                size="small"
                linkTarget="_blank"
                href={"#"}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
