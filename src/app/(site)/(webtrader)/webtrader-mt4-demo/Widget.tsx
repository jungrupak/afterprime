"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function WebTraderMt4Demo() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const timeout = setTimeout(() => setError(true), 15000);

    const script = document.createElement("script");
    script.src = "https://metatraderweb.app/trade/widget.js";
    script.async = true;
    script.onload = () => {
      try {
        if (window.MetaTraderWebTerminal) {
          new window.MetaTraderWebTerminal("webterminal", {
            version: 4,
            servers: ["Afterprime-Demo AP", "Afterprime-Live AP"],
            server: "Afterprime-Demo AP",
            utmSource: "afterprime.com",
            startMode: "login",
            language: "en",
            colorScheme: "black_on_white",
          });
          clearTimeout(timeout);
          setLoading(false);
        } else {
          clearTimeout(timeout);
          setError(true);
        }
      } catch {
        clearTimeout(timeout);
        setError(true);
      }
    };
    script.onerror = () => {
      clearTimeout(timeout);
      setError(true);
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
          {error ? (
            <p style={{ color: "#000", fontSize: "16px" }}>
              Widget is temporarily unavailable.. please try later
            </p>
          ) : (
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
          )}
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
