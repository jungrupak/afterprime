"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";

export function useSanitizedHTML(html?: string) {
  return useMemo(() => {
    if (!html) return "&nbsp;";
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ["span", "br", "strong", "b"],
      ALLOWED_ATTR: ["class", "style"],
    });
  }, [html]);
}
