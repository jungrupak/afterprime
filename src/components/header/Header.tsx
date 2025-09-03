"use client";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/navigation/Navigation";
import Button from "@/components/button/Button";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.ap_header} ${isSticky ? styles.sticky : ""}`}>
      <div
        className={`${styles.ap_container} ap_container flex items-center py-8 max-lg:px-5 max-xl:px-5 max-lg:py-6 max-xl:gap-30 gap-24 content-around`}
      >
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

        <div
          className={`max-lg:fixed top-0 right-0 h-full max-lg:w-[100%] transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "translate-x-full"} min-lg:translate-x-0`}
        >
          <Navigation onClose={() => setIsOpen(false)} />
        </div>

        <div className={`${styles.ap_header_right} max-lg:hidden`}>
          <div className="flex items-center gap-4">
            <Button
              linkTo="/signup"
              btnText="Member Login"
              btnArrow={false}
              btnSize="small"
              btnColor="washed"
            />
            <Button
              linkTo="/signup"
              btnText="Request Invite"
              btnArrow={false}
              btnSize="small"
              btnColor="primary-ghost"
            />
          </div>
        </div>
        {!isOpen && (
          <span
            className="ap_menu_icon ml-20 cursor-pointer ml-auto max-lg:block hidden"
            onClick={() => setIsOpen(true)}
          >
            <svg
              width="27"
              height="14"
              viewBox="0 0 27 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                y1="0.5"
                x2="27"
                y2="0.5"
                stroke="white"
                strokeWidth="3px"
              />
              <line
                y1="13.5"
                x2="13"
                y2="13.5"
                stroke="white"
                strokeWidth="3px"
              />
            </svg>
          </span>
        )}
      </div>
    </header>
  );
}
