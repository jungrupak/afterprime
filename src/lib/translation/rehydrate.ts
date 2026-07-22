import type { WalkedNode } from "./objectWalker";

// Mirror image of objectWalker's walkAndExtract: takes the walked tree plus
// a translated string array (same order/length as the original strings[])
// and rebuilds an object identical in shape to the original, with
// translated text in place of English text everywhere a string was found.
export function rehydrate(tree: WalkedNode, translated: string[]): unknown {
  switch (tree.type) {
    case "string-ref":
      return translated[tree.index];

    case "leaf":
      return tree.value;

    case "array":
      return tree.items.map((item) => rehydrate(item, translated));

    case "object": {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(tree.entries)) {
        result[key] = rehydrate(value, translated);
      }
      return result;
    }
  }
}
