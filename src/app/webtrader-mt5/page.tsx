"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function WebTraderMt5() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://metatraderweb.app/trade/widget.js";
    script.async = true;
    script.onload = () => {
      if (window.MetaTraderWebTerminal) {
        new window.MetaTraderWebTerminal("webterminal", {
          version: 5,
          servers: ["Afterprime-Live AP"],
          server: "Afterprime-Live AP",
          utmCampaign: "direct",
          utmSource: "www.afterprime.com",
          startMode: "login",
          language: "en",
          colorScheme: "white_on_black",
        });
        setLoading(false);
      }
    };
    document.body.appendChild(script);
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

      {/* iframe */}

      <div className="mt4PageHeader flex">
        <Image
          src="/img/logo-main.svg"
          alt="Afterprime Logo"
          width={202}
          height={30}
        />
      </div>

      <iframe
        src="https://mt5web.afterprime.io/terminal"
        style={{
          border: "none",
          width: "100%",
          height: "calc(100vh - 60px)",
          position: "fixed",
          top: "60px",
          backgroundColor: "white",
          zIndex: 9,
        }}
      />
    </>
  );
}
