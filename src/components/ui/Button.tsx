"use client";
import React from "react";
import Link from "next/link";
import css from "./ui.module.scss";
import { buttonClickHandling } from "@/hooks/btnClickHandle";

type ButtonVarients =
  | "default"
  | "primary"
  | "secondary"
  | "primary-ghost"
  | "secondary-ghost"
  | "ghost"
  | "washed";

type ButtonProps = {
  children?: React.ReactNode;
  onclick?: () => void;
  href?: string;
  isArrowVisible?: boolean;
  varient?: ButtonVarients;
  size?: "regular" | "small" | "x-small" | "large";
};

export default function Button({
  children,
  varient = "default",
  size = "regular",
  isArrowVisible = false,
  onclick,
  href,
}: ButtonProps) {
  const btnClickHandle = buttonClickHandling({ onclick, href }); //using custom hook here..
  return (
    <button
      onClick={btnClickHandle}
      className={`${css.ap_button} ${
        size === "regular"
          ? css.regular
          : size === "small"
          ? css.small
          : size === "x-small"
          ? css.xSmall
          : size === "large"
          ? css.large
          : ""
      } ${
        varient === "primary"
          ? css.primary
          : varient === "secondary"
          ? css.secondary
          : varient === "ghost"
          ? css.ghost
          : varient === "primary-ghost"
          ? css.primaryGhost
          : varient == "secondary-ghost"
          ? css.secondaryGhost
          : varient === "washed"
          ? css.washed
          : ""
      }`}
    >
      {children}
      {isArrowVisible && (
        <svg
          width="11"
          height="17"
          viewBox="0 0 11 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.70063 0.707031L10.8916 8.70703L2.70063 16.707L0.891603 14.9402L7.27355 8.70703L0.891602 2.47388L2.70063 0.707031Z"
            fill="#fff"
          />
        </svg>
      )}
    </button>
  );
}
