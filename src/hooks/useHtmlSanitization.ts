// src/hooks/useHtmlSanitization.ts
import { useMemo } from "react";
import createDOMPurify from "isomorphic-dompurify";

// Works on server and client
const DOMPurify = createDOMPurify();

export function useSanitizedHTML(html?: string) {
  return useMemo(() => {
    if (!html) return "&nbsp;";
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ["span", "br", "strong", "b"],
      ALLOWED_ATTR: ["class", "style"],
    });
  }, [html]);
}
