"use client";
import React from "react";
import Link from "@/components/ui/Link";
import css from "./ui.module.scss";
import { useButtonClickHandling } from "@/hooks/useBtnClickHandle";
import GeoInterstitial from "./GeoInterstitial";

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
  linkTarget?: "_self" | "_blank";
  typeformId?: string;
  className?: string;
};

export default function Button({
  children,
  varient = "default",
  size = "regular",
  isArrowVisible = false,
  onclick,
  href,
  linkTarget,
  className,
  typeformId,
}: ButtonProps) {
  const { handleClick: btnClickHandle, showInterstitial } =
    useButtonClickHandling({ onclick, href, typeformId });

  const classNames = `${css.ap_button} ${className} ${
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
      : varient === "secondary-ghost"
      ? css.secondaryGhost
      : varient === "washed"
      ? css.washed
      : ""
  }`;

  const content = (
    <>
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
    </>
  );

  if (href) {
    const isExternal = !href.startsWith("/");

    if (isExternal) {
      // external links → no btnClickHandle
      return (
        <a
          href={href}
          className={classNames}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    // internal links → keep Next.js Link + hook
    return (
      <>
        <Link
          href={href}
          className={classNames}
          onClick={btnClickHandle}
          target={linkTarget}
          rel="noopener noreferrer"
        >
          {content}
        </Link>
        <GeoInterstitial isOpen={showInterstitial} />
      </>
    );
  }

  // fallback → normal button
  return (
    <>
      <button type="button" onClick={btnClickHandle} className={classNames}>
        {content}
      </button>
      <GeoInterstitial isOpen={showInterstitial} />
    </>
  );
}
