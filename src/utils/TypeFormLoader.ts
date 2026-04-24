
"use client";
import { useEffect } from "react";
export default function TypeformLoader() {
  useEffect(() => {
    // Delay Typeform embed by 4s so it doesn't compete with LCP resources
    const timer = setTimeout(() => {
      if (!document.querySelector("#typeform-embed")) {
        const script = document.createElement("script");
        script.id = "typeform-embed";
        script.src = "//embed.typeform.com/next/embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
