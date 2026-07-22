"use client";
import styles from "./MobileNav.module.scss";
import Image from "next/image";
import Link from "next/link";
import TypeformButton from "../ui/typeForm";
import RightArrow from "../ui/RightArrow";
import LeftArrow from "../ui/LeftArrow";
import { useState } from "react";
import Button from "../ui/Button";
import { useLocale } from "@/lib/locale/useLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

interface CategoryItem {
  menuItem?: string;
  pageUrl?: string;
}
interface Category {
  categoryName?: string;
  catMenuItems?: CategoryItem[];
}

interface Menu {
  menu?: string;
  menuInfos?: {
    title: string;
    description: string;
    btnText: string;
    btnLink: string;
  };
  category?: Category[];
}

interface MenuItems {
  menus?: Menu[];
  customClass?: string;
  onClick?: () => void;
  loginLabel?: string;
  signupLabel?: string;
  signupNowLabel?: string;
  backLabel?: string;
  logoAlt?: string;
}

export default function MobileNav({
  menus,
  customClass,
  onClick,
  loginLabel = "Login",
  signupLabel = "Signup",
  signupNowLabel = "Signup Now",
  backLabel = "back",
  logoAlt = "Afterprime Logo",
}: MenuItems) {
  const [submenu, setSubMenu] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const locale = useLocale();

  return (
    <div className={`${styles.mobMenuWrapper} ${customClass}`}>
      <div className={`${styles.menuHeader} flex justify-between`}>
        <Image src="/img/logo-text.svg" height={34} width={135} alt={logoAlt} />
        <span className={`${styles.closeNav}`} onClick={onClick}>
          +
        </span>
      </div>
      {/* menus */}
      <div className={`${styles.menuItems}`}>
        {menus?.map((menu, indx) => (
          <div
            key={indx}
            className={`${styles.menuCat} flex items-center justify-between`}
            onClick={() => {
              setSubMenu(true);
              setActiveIndex(indx);
            }}
          >
            {menu.menuInfos?.title}
            <RightArrow />
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className={`${styles.mobileMenuFooter} text-center`}>
        <Link
          className={`ap_button washed small`}
          href="https://app.afterprime.com/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          {loginLabel}
        </Link>
        <TypeformButton
          buttonText={signupLabel}
          signupNowText={signupNowLabel}
          size="small"
        />
      </div>

      {/* ## */}

      <div
        className={`${styles.subMenuWrapper} ${
          submenu && activeIndex !== null ? styles.reveal : ""
        }`}
      >
        <span
          className={`${styles.backArrow}`}
          onClick={() => {
            setSubMenu(false);
            setActiveIndex(null);
          }}
        >
          <LeftArrow />
          {backLabel}
        </span>

        <div
          className={`${styles.menuItemsWrapper} overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]`}
        >
          {menus?.[activeIndex || 0]?.category?.map((item, idx) => (
            <div key={idx} className={`${styles.subMenuItem} mt-6`}>
              <div className={`${styles.catName}`}>{item.categoryName}</div>
              <ul>
                {item.catMenuItems?.map((label, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setSubMenu(false);
                      setActiveIndex(null);
                      onClick?.();
                    }}
                    style={{ position: "relative" }}
                  >
                    <Link href={localizeHref(label.pageUrl || "/", locale)}>{label.menuItem}</Link>
                    {label.menuItem === "Trading Calculator" && (
                      <span className="absolute top-2 right-0 bg:red block text-[10px] text-white bg-[red] p-[4px] leading-[1] rounded-[4px]">
                        NEW
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
