"use client";
import styles from "./Nav.module.scss";
import Link from "next/link";
import Image from "next/image";
import DropdownIcon from "../ui/DropdownIcon";
import { useEffect, useState } from "react";
import Button from "../ui/Button";

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
}

export default function Navigation({ menus }: MenuItems) {
  const [megaMenu, setMegaMenu] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <nav>
        <ul className="flex gap-12">
          {menus?.map((menu, idx) => (
            <li
              key={idx}
              className={`${styles.itemLevelParent} max-md:w-full relative `}
              onMouseEnter={() => {
                setMegaMenu(true);
                setOpenIndex(idx);
              }}
              onMouseLeave={() => {
                setMegaMenu(false);
                setOpenIndex(null);
              }}
            >
              <span className="cursor-pointer flex items-center gap-4 max-lg:px-[10px]">
                {menu.menu}
                {menu?.category?.length ? <DropdownIcon /> : null}
              </span>
            </li>
          ))}
          {/* <li className="self-center">
            <Button
              size="x-small"
              varient="ghost"
              className="relative"
              href="/trading-calculator"
            >
              <span className="absolute -top-4 right-0 bg:red block text-[10px] text-white bg-[red] p-[4px] leading-[1] rounded-[4px]">
                NEW
              </span>
              Trading Caclulator
            </Button>
          </li> */}
        </ul>
      </nav>

      {/* Mega Menu */}
      {megaMenu && openIndex !== null && (
        <div
          className={`${styles.megaMenuWrapper}`}
          onMouseEnter={() => {
            setMegaMenu(true);
            setOpenIndex(openIndex);
          }}
          onMouseLeave={() => {
            setMegaMenu(false);
            setOpenIndex(null);
          }}
        >
          <div className={`${styles.megaMenuItemsContainer}`}>
            {/* This is allu arjun {openIndex} */}
            <div className={`${styles.catWrapper} flex gap-0`}>
              {menus?.[openIndex]?.category?.map((cat, i) => (
                <div key={i} className={`${styles.menuCat_item}`}>
                  <h2>{cat.categoryName}</h2>
                  <ul>
                    {cat.catMenuItems?.map((menuItem, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setMegaMenu(false);
                          setOpenIndex(null);
                        }}
                      >
                        <Link href={menuItem.pageUrl || "/"}>
                          {menuItem.menuItem}
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
    </div>
  );
}
