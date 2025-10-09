//HTML sanitization global
"use client";
import { useEffect } from "react";
export default function TypeformLoader() {
  useEffect(() => {
    if (!document.querySelector("#typeform-embed")) {
      const script = document.createElement("script");
      script.id = "typeform-embed";
      script.src = "//embed.typeform.com/next/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null; // nothing visible
}
