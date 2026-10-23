import type { WalkedNode } from "./objectWalker";
import { localizeHtmlLinks } from "@/lib/locale/localizeLinks";

// Content authors write internal links in WYSIWYG/rich-text fields with no
// notion of the Weglot locale prefix. Rewritten here, once, at rehydration
// time, since this is the one place translated HTML strings are reassembled
// and the target locale is already known. Rules live in localizeLinks.ts.

// Mirror image of objectWalker's walkAndExtract: takes the walked tree plus
// a translated string array (same order/length as the original strings[])
// and rebuilds an object identical in shape to the original, with
// translated text in place of English text everywhere a string was found.
export function rehydrate(tree: WalkedNode, translated: string[], locale: string): unknown {
  switch (tree.type) {
    case "string-ref":
      return translated[tree.index];

    case "leaf":
      return tree.value;

    case "array":
      return tree.items.map((item) => rehydrate(item, translated, locale));

    case "html": {
      const joined = tree.segments
        .map((segment) => (typeof segment === "string" ? segment : translated[segment.index]))
        .join("");
      return localizeHtmlLinks(joined, locale);
    }

    case "object": {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(tree.entries)) {
        result[key] = rehydrate(value, translated, locale);
      }
      return result;
    }
  }
}
