"use client";

import styles from "./ui.module.scss";
import { createSlider, type SliderOptions } from "@typeform/embed";
import "@typeform/embed/build/css/slider.css";

interface ExtendedSliderOptions extends SliderOptions {
  autoOpen?: boolean;
  hideHeaders?: boolean;
  hideFooter?: boolean;
}

interface TypeformButtonProps {
  formId: string;
  buttonText?: string;
  size?: "Large" | "Regular" | "small" | "x-small";
  altUrl?: string; // custom URL
}

const TypeformButton: React.FC<TypeformButtonProps> = ({
  formId,
  buttonText = "Request Invite",
  size = "Regular",
  altUrl = "https://example.com/custom-page",
}) => {
  const handleClick = () => {
    // Check if user already has a choice stored
    let userChoice = localStorage.getItem("cta_choice");

    if (!userChoice) {
      // Assign randomly on first click
      userChoice = Math.random() < 0.5 ? "typeform" : "custom";
      localStorage.setItem("cta_choice", userChoice);
    }

    if (userChoice === "typeform") {
      // Open Typeform slider
      const options: ExtendedSliderOptions = {
        autoOpen: false,
        hideHeaders: true,
        hideFooter: true,
        position: "right",
      };
      const slider = createSlider(formId, options);
      slider.open();
    } else {
      // Open custom URL in new tab
      window.open(altUrl, "_blank");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.ap_button} ${
        size === "Large"
          ? styles.large
          : size === "Regular"
          ? styles.regular
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
