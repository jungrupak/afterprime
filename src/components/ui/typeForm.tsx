"use client";
import { createPopup } from "@typeform/embed";
import "@typeform/embed/build/css/popup.css";

const TypeformButton = () => {
  const handleClick = () => {
    const popup = createPopup("01K6A1X4YDAH2RV3WNYVB632", {
      //autoOpen: false,       // ✅ only valid property
      hideHeaders: true,
      hideFooter: true,
      opacity: 0.95, // optional
      onSubmit: () => console.log("Form submitted"),
    });

    popup.open();
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Request Invite
    </button>
  );
};

export default TypeformButton;
