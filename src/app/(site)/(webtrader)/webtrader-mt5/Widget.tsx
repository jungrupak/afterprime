"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function WebTraderMt5() {
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const redirectFallback = "https://mt5web.afterprime.io/terminal";

    const timeout = setTimeout(() => {
      window.location.href = redirectFallback;
    }, 15000);

    const script = document.createElement("script");
    script.src = "https://metatraderweb.app/trade/widget.js";
    script.async = true;
    script.onload = () => {
      try {
        if (window.MetaTraderWebTerminal) {
          new window.MetaTraderWebTerminal("webterminal", {
            version: 5,
            servers: ["Afterprime-Live AP"],
            server: "Afterprime-Live AP",
            utmCampaign: "direct",
            utmSource: "afterprime.com",
            startMode: "login",
            language: "en",
            colorScheme: "white_on_black",
          });
          clearTimeout(timeout);
          setLoading(false);
        } else {
          clearTimeout(timeout);
          window.location.href = redirectFallback;
        }
      } catch {
        clearTimeout(timeout);
        window.location.href = redirectFallback;
      }
    };
    script.onerror = () => {
      clearTimeout(timeout);
      window.location.href = redirectFallback;
    };
    document.body.appendChild(script);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "6px solid #ddd",
              borderTop: "6px solid #000",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>
            {`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}

      <div className="mt4PageHeader flex">
        <Image
          src="/img/logo-main.svg"
          alt="Afterprime Logo"
          width={202}
          height={30}
        />
      </div>

      <div
        id="webterminal"
        style={{
          width: "100%",
          height: "calc(100vh - 60px)",
          position: "fixed",
          bottom: "0",
          zIndex: 9,
          backgroundColor: "white",
        }}
      ></div>
    </>
  );
}
