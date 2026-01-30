"use client";
import { useEffect, useState } from "react";
import { getSessionFormId } from "@/utils/geSessionFormId";
import styles from "@/components/ui/ui.module.scss";

import { createSlider, type SliderOptions } from "@typeform/embed";
import "@typeform/embed/build/css/slider.css";

type ButtonVarients =
  | "default"
  | "primary"
  | "secondary"
  | "primary-ghost"
  | "secondary-ghost"
  | "ghost"
  | "washed";

interface ExtendedSliderOptions extends SliderOptions {
  autoOpen?: boolean;
  hideHeaders?: boolean;
  hideFooter?: boolean;
}

interface TypeformButtonProps {
  buttonText?: string;
  size?: "Large" | "Regular" | "small" | "x-small";
  varient?: ButtonVarients;
}

const TypeformButton: React.FC<TypeformButtonProps> = ({
  buttonText = "Request Invite",
  size = "Regular",
  varient = "default",
}) => {
  const [formId, setFormId] = useState<string | null>(null);

  useEffect(() => {
    // get the correct form for this session
    const assignedForm = getSessionFormId();
    setFormId(assignedForm);
  }, []);

  const handleClick = () => {
    if (!formId) return;

    const options: ExtendedSliderOptions = {
      autoOpen: false,
      hideHeaders: true,
      hideFooter: true,
      position: "right", // slides in from the right
    };

    const slider = createSlider(formId, options);
    slider.open();
  };

  if (!formId) return null; // wait for client render

  return (
    <button
      onClick={handleClick}
      className={`group ${styles.ap_button} ${
        size === "Large"
          ? styles.large
          : size === "Regular"
            ? styles.regular
            : size === "small"
              ? styles.small
              : size === "x-small"
                ? styles.xSmall
                : ""
      } ${
        varient === "primary"
          ? styles.primary
          : varient === "secondary"
            ? styles.secondary
            : varient === "ghost"
              ? styles.ghost
              : varient === "primary-ghost"
                ? styles.primaryGhost
                : varient === "secondary-ghost"
                  ? styles.secondaryGhost
                  : varient === "washed"
                    ? styles.washed
                    : ""
      } ${styles.primary}`}
    >
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: "none" }}
      >
        <path
          d="M4.33333 8.2V5C4.33333 3.93913 4.77232 2.92172 5.55372 2.17157C6.33512 1.42143 7.39493 1 8.5 1C9.60507 1 10.6649 1.42143 11.4463 2.17157C12.2277 2.92172 12.6667 3.93913 12.6667 5V8.2M2.66667 8.2H14.3333C15.2538 8.2 16 8.91634 16 9.8V15.4C16 16.2837 15.2538 17 14.3333 17H2.66667C1.74619 17 1 16.2837 1 15.4V9.8C1 8.91634 1.74619 8.2 2.66667 8.2Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ fill: "none" }}
          className="group-hover:stroke-[#000000]"
        />
      </svg>
      {buttonText}
    </button>
  );
};

export default TypeformButton;
