"use client";

export default function LiveChatMobileTrigger() {
  const openChat = () => {
    const w = window as unknown as {
      LiveChatWidget?: { call: (method: string) => void };
    };
    w.LiveChatWidget?.call("show");
    w.LiveChatWidget?.call("maximize");
  };

  return (
    <button
      type="button"
      aria-label="Chat with us"
      onClick={openChat}
      className="hidden max-md:flex fixed bottom-5 right-5 z-40 items-center justify-center w-14 h-14 rounded-full shadow-lg"
      style={{ backgroundColor: "var(--secondary-color)" }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-4.4 3.3A1 1 0 0 1 3 19.5V5a1 1 0 0 1 1-1Z"
          stroke="var(--white)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="10.5" r="1.1" fill="var(--white)" />
        <circle cx="12" cy="10.5" r="1.1" fill="var(--white)" />
        <circle cx="16" cy="10.5" r="1.1" fill="var(--white)" />
      </svg>
    </button>
  );
}
