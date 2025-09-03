"use client";
import Link from "next/link";
import Image from "next/image";
import { menuItems } from "@/data/menu-item";
import Button from "@/components/button/Button";
import styles from "./Navigation.module.scss";

export default function Navigation({ onClose }: { onClose?: () => void }) {
  return (
    <div className={`${styles.ap_nav_wrapper}`}>
      <nav className={`${styles.ap_nav}`}>
        <div
          className={`${styles.ap_nav_head} px-5 py-6 flex items-center lg:mb-10 max-lg:flex hidden flex-direction-column lg:flex-row`}
        >
          <Link href="/">
            <Image
              src="/logo-main.svg"
              alt="Afterprime Logo"
              width={150}
              height={50}
            />
          </Link>

          <span
            className="ap_close_icon cursor-pointer ml-auto"
            onClick={onClose}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1.41421"
                y1="1.41421"
                x2="18.4853"
                y2="18.4853"
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="1.41421"
                y1="18.4853"
                x2="18.4853"
                y2="1.41421"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </span>
        </div>
        <ul className="flex space-x-15 max-lg:overflow-y-auto max-lg:max-h-[80vh]">
          {menuItems.map((item, index) => (
            <li key={index} className={`relative group max-md:w-full`}>
              <Link
                className={`${
                  item.menuCategory ? "max-lg:hidden" : ""
                }  flex items-center gap-4 max-lg:px-[10px]`}
                href={item.href}
              >
                {item.title}
                {item.menuCategory && (
                  <svg
                    width="9"
                    height="10"
                    viewBox="0 0 9 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_4115_624" fill="white">
                      <path d="M4.39227 0.607727L8.78455 5L4.39227 9.39227L2.35463e-07 5L4.39227 0.607727Z" />
                    </mask>
                    <path
                      d="M4.39227 9.39227L3.33161 10.4529L4.39227 11.5136L5.45293 10.4529L4.39227 9.39227ZM8.78455 5L7.72389 3.93934L3.33161 8.33161L4.39227 9.39227L5.45293 10.4529L9.84521 6.06066L8.78455 5ZM4.39227 9.39227L5.45293 8.33161L1.06066 3.93934L2.35463e-07 5L-1.06066 6.06066L3.33161 10.4529L4.39227 9.39227Z"
                      fill="#FDFCF7"
                      mask="url(#path-1-inside-1_4115_624)"
                    />
                  </svg>
                )}
              </Link>

              {/* Submenu */}
              {item.menuCategory && (
                <ul
                  className={`absolute ${styles.ap_subnav} top-full left-0 hidden max-lg:block max-lg:static lg:group-hover:block bg-[#fff] shadow-lg mt-0 py-2`}
                >
                  {item.menuCategory.map((cat, idx) => (
                    <li key={idx} className="px-6 py-3 max-lg:px-3">
                      <Link href={cat.href}>{cat.title}</Link>
                      <ul>
                        {cat.children.map((menu, index) => (
                          <li key={index}>
                            <Link href={menu.href}>{menu.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div
          className={`${styles.ap_btn_group} flex items-center gap-4 max-lg:flex hidden`}
        >
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
      </nav>
    </div>
  );
}
