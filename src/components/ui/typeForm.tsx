"use client";

import { useState } from "react";
import { getSessionFormId } from "@/utils/geSessionFormId";
import styles from "./ui.module.scss";
import { createPopup, type PopupOptions } from "@typeform/embed";
import "@typeform/embed/build/css/popup.css";
import { getStoredUTMs } from "@/utils/persistUTM";
import { fetchGeoCountry, isTargetGeo } from "@/utils/geoCheck";
import GeoInterstitial from "./GeoInterstitial";
import {
  useBypassInvitation,
  BYPASS_SIGNUP_URL,
} from "@/hooks/useBypassInvitation";

interface ExtendedSliderOptions extends PopupOptions {
  autoOpen?: boolean;
  hideHeaders?: boolean;
  hideFooter?: boolean;
}

interface TypeformButtonProps {
  buttonText?: string;
  size?: "Large" | "Regular" | "small" | "x-small";
}

const TypeformButton: React.FC<TypeformButtonProps> = ({
  buttonText = "Get Invite Code",
  size = "Regular",
}) => {
  const formId = getSessionFormId();
  const [showInterstitial, setShowInterstitial] = useState(false);
  const bypassInvitation = useBypassInvitation();

  const handleClick = async () => {
    if (bypassInvitation) {
      window.open(BYPASS_SIGNUP_URL, "_blank", "noopener,noreferrer");
      return;
    }

    if (!formId) return;

    const loc = await fetchGeoCountry();
    if (isTargetGeo(loc)) {
      setShowInterstitial(true);
      return;
    }

    const utms = getStoredUTMs();

    const url = `https://form.typeform.com/to/${formId}?${new URLSearchParams(
      utms,
    ).toString()}`;

    const options: ExtendedSliderOptions = {
      autoOpen: false,
      hideHeaders: true,
      hideFooter: true,
      fullScreen: true,
    };

    const slider = createPopup(url, options);
    slider.open();
  };

  if (!formId) return null; // wait for client render

  return (
    <>
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
        } ${styles.primary}`}
      >
        {bypassInvitation ? "Signup Now" : buttonText}
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
      <GeoInterstitial isOpen={showInterstitial} />
    </>
  );
};

export default TypeformButton;
