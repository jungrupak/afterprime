"use client";

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
}

const TypeformButton: React.FC<TypeformButtonProps> = ({
  formId,
  buttonText = "Open Form",
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
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {buttonText}
    </button>
  );
};

export default TypeformButton;
