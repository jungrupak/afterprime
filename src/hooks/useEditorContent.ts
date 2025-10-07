import { useMemo } from "react";

export function useContentEditor(rawHtml: string | undefined | null) {
  return useMemo(() => {
    if (!rawHtml) return "";

    // If HTML tags already exist, return as-is
    if (/<[a-z][\s\S]*>/i.test(rawHtml)) return rawHtml;

    // Otherwise, wrap plain text or newlines in <p>...</p>
    return rawHtml
      .split(/\n+/)
      .map((line) => `<p>${line.trim()}</p>`)
      .join("");
  }, [rawHtml]);
}
