"use client";

import styles from "./ui.module.scss";

import { createPopup, type PopupOptions } from "@typeform/embed";
import "@typeform/embed/build/css/popup.css";

// Extend the official PopupOptions type
interface ExtendedPopupOptions extends PopupOptions {
  autoOpen?: boolean;
  hideHeaders?: boolean;
  hideFooter?: boolean;
}

interface TypeformButtonProps {
  formId: string;
  buttonText?: string;
  size?: "Large" | "Regular" | "small" | "x-small";
}

const TypeformButton: React.FC<TypeformButtonProps> = ({
  formId,
  buttonText = "Requesst Invite",
  size = "Regular",
}) => {
  const handleClick = () => {
    const options: ExtendedPopupOptions = {
      autoOpen: false,
      hideHeaders: true,
      hideFooter: true,
    };

    const popup = createPopup(formId, options);
    popup.open();
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.ap_button} ${
        size === "Large"
          ? styles.large
          : size === "small"
          ? styles.small
          : size === "x-small"
          ? styles.xSmall
          : ""
      } ${styles.primaryGhost}`}
    >
      {buttonText}
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
    </button>
  );
};

export default TypeformButton;
