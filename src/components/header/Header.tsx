"use client";
import Link from "next/link";
import Image from "next/image";
import Btn from "@/components/ui/Button";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MegaMenuItems } from "@/utils/menu-item";
import TypeformButton from "../ui/typeForm";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState(0);
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

  //Menu hovered stated reset in page change
  const resetNavs = usePathname();
  useEffect(() => {
    // Close menu whenever the route changes
    setIsMegaOpen(false);
    setMobileMenu(false);
    setActiveIndex(null);
  }, [resetNavs]); // 👈 dependency ensures runs on every navigation

  return (
    <>
      <header
        className={`${styles.ap_header} ${isSticky ? styles.sticky : ""} ${
          activeIndex != null ? styles.headerActive : ""
        }`}
      >
        <div
          className={`${styles.ap_container} ap_container flex items-center py-8 max-lg:px-5 max-xl:px-5 max-lg:py-6 max-xl:gap-30 justify-between`}
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
          <div
            className={`${styles.middleItem} ${
              mobileMenu ? styles.ActiveNav : ""
            }`}
          >
            <div className={`${styles.apNavWrapper}`}>
              {/* Mobile Nav Header */}

              <div className={`${styles.resNavHeader}`}>
                <div className={`${styles.ap_logo}`}>
                  <Link href="/">
                    <Image
                      src="/img/logo-text.svg"
                      alt="Afterprime Logo"
                      width={135}
                      height={25}
                    />
                  </Link>
                </div>
                <div className="flex gap-5 ml-auto">
                  <span
                    className={`${styles.closeIcon} translate-x-[15px]`}
                    onClick={() => setMobileMenu(false)}
                  >
                    +
                  </span>
                </div>
              </div>

              {/* Main Nav */}
              <nav className={`${styles.ap_nav}`}>
                <ul className="flex gap-12">
                  {MegaItems.map((navItem, index) => (
                    <li
                      key={index}
                      className={`max-md:w-full relative ${
                        activeIndex === index ? styles.active : ""
                      }`}
                      // Desktop hover
                      onMouseEnter={() => {
                        if (window.innerWidth >= 1024) {
                          setIsMegaOpen(true);
                          setActiveIndex(index);
                          setMegaMenu(index);
                        }
                      }}
                    >
                      {/* Click for Mobile */}
                      <span
                        className="cursor-pointer flex items-center gap-4 max-lg:px-[10px]"
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            if (activeIndex === index) {
                              setIsMegaOpen(false);
                              setActiveIndex(null);
                            } else {
                              setIsMegaOpen(true);
                              setActiveIndex(index);
                              setMegaMenu(index);
                            }
                          }
                        }}
                      >
                        {navItem.menu}

                        {navItem.category && (
                          <svg
                            width="9"
                            height="10"
                            viewBox="0 0 9 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <mask id="path-1-inside-1_1406_223" fill="white">
                              <path d="M4.39258 0.607727L8.78485 5L4.39258 9.39227L0.000305411 5L4.39258 0.607727Z" />
                            </mask>
                            <path
                              d="M4.39258 9.39227L3.33192 10.4529L4.39258 11.5136L5.45324 10.4529L4.39258 9.39227ZM8.78485 5L7.72419 3.93934L3.33192 8.33161L4.39258 9.39227L5.45324 10.4529L9.84551 6.06066L8.78485 5ZM4.39258 9.39227L5.45324 8.33161L1.06097 3.93934L0.000305411 5L-1.06035 6.06066L3.33192 10.4529L4.39258 9.39227Z"
                              fill="#FDFCF7"
                              mask="url(#path-1-inside-1_1406_223)"
                            />
                          </svg>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Footer */}
              <div className={`${styles.resNavFooter}`}>
                <Btn
                  size="small"
                  varient="washed"
                  href="https://app.afterprime.com/login"
                  linkTarget="_blank"
                >
                  Member Login
                </Btn>
                <TypeformButton
                  formId="GYkOukSo"
                  buttonText="Request Invite"
                  size="small"
                />
              </div>
            </div>
          </div>

          {/* Right Side (Desktop) */}
          <div className={`${styles.ap_header_right} max-lg:hidden`}>
            <div className="flex items-center gap-4">
              <Btn
                size="small"
                varient="washed"
                href="https://app.afterprime.com/login"
                linkTarget="_blank"
              >
                Member Login
              </Btn>
              <TypeformButton
                formId="GYkOukSo"
                buttonText="Request Invite"
                size="small"
              />
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="hidden max-lg:block ml-auto">
            <div
              className={`${styles.mobileMenuIcon}`}
              onClick={() => setMobileMenu((prev) => !prev)}
            >
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Mega Menu Area */}
        {isMegaOpen && activeIndex !== null && (
          <div
            className={`${styles.megaMenu}`}
            onMouseEnter={() => setIsMegaOpen(true)}
            onMouseLeave={() => {
              if (window.innerWidth >= 1024) {
                setIsMegaOpen(false);
                setActiveIndex(null);
                setMegaMenu(0);
              }
            }}
          >
            <div className={`${styles.megaMenuItemsContainer} ap_container`}>
              <div className={`${styles.subNavHeader} flex`}>
                <span
                  className={`${styles.backArrow}`}
                  onClick={() => {
                    setIsMegaOpen(false);
                    setActiveIndex(null);
                  }}
                >
                  <svg
                    width="9"
                    height="10"
                    viewBox="0 0 9 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_1406_223" fill="white">
                      <path d="M8.78467 5L4.3924 9.39227L0.000122171 5L4.39239 0.607727L8.78467 5Z" />
                    </mask>
                    <path
                      d="M0.000122171 5L-1.06054 3.93934L-2.1212 5L-1.06054 6.06066L0.000122171 5ZM4.3924 9.39227L5.45306 8.33161L1.06078 3.93934L0.000122171 5L-1.06054 6.06066L3.33174 10.4529L4.3924 9.39227ZM0.000122171 5L1.06078 6.06066L5.45306 1.66839L4.39239 0.607727L3.33173 -0.452933L-1.06054 3.93934L0.000122171 5Z"
                      fill="#FDFCF7"
                      mask="url(#path-1-inside-1_1406_223)"
                    />
                  </svg>
                  back
                </span>
              </div>

              <div
                className={`${styles.menuChild} flex max-lg:flex-col max-lg:gap-5 max-lg:max-h-[88vh] max-lg:overflow-y-auto`}
              >
                {/* Mega Info */}

                {/* Mega Categories */}
                {MegaItems[megaMenu]?.category?.map((cat, index) => (
                  <div key={index} className={`${styles.menuCat_item}`}>
                    <h2>{cat.categoryName}</h2>
                    <ul>
                      {cat.catMenuItems.map((li, indx) => (
                        <li key={indx}>
                          <Link
                            href={li.pageUrl}
                            onClick={() => {
                              setMobileMenu(false);
                              setIsMegaOpen(false);
                              setActiveIndex(null);
                            }}
                          >
                            {li.menuItem}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Mega Menu Area ends */}
      </header>
    </>
  );
}
