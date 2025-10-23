"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function WebTraderMt4Demo() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://metatraderweb.app/trade/widget.js";
    script.async = true;
    script.onload = () => {
      if (window.MetaTraderWebTerminal) {
        new window.MetaTraderWebTerminal("webterminal", {
          version: 4,
          servers: ["Afterprime-Demo AP", "Afterprime-Live AP"],
          server: "Afterprime-Demo AP",
          utmSource: "www.afterprime.com",
          startMode: "login",
          language: "en",
          colorScheme: "black_on_white",
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

      <div className="mt4PageHeader flex">
        <Image
          src="/img/logo-main.svg"
          alt="Afterprime Logo"
          width={202}
          height={30}
        />
        <div className="ml-auto">
          <Button isArrowVisible={true} size="x-small" href="/webtrader-mt4">
            MT4 Live
          </Button>
        </div>
      </div>
      <div
        id="webterminal"
        style={{
          width: "100%",
          height: "calc(100vh - 60px)",
          position: "fixed",
          bottom: "0",
          zIndex: "9",
          backgroundColor: "white",
        }}
      ></div>
    </>
  );
}
