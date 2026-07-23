// Recursively walks an arbitrary WP/ACF JSON tree (Flexible Content blocks,
// repeaters, aioseo_head_json, nested objects/arrays at any depth) and pulls
// out every translatable string into a flat array, leaving behind a
// "walked tree" of the same shape that records where each string came from.
// rehydrate.ts (the mirror image of this file) uses that tree plus a
// translated string array to rebuild the original shape exactly.

// A segment of an HTML string: either a literal chunk (tag markup, or text
// that didn't qualify as translatable) or a reference to a translated string.
export type HtmlSegment = string | { type: "string-ref"; index: number };

export type WalkedNode =
  | { type: "string-ref"; index: number }
  | { type: "leaf"; value: unknown }
  | { type: "object"; entries: Record<string, WalkedNode> }
  | { type: "array"; items: WalkedNode[] }
  | { type: "html"; segments: HtmlSegment[] };

export interface WalkResult {
  strings: string[];
  tree: WalkedNode;
}

// Field names whose values are identifiers/URLs/technical data, never
// prose — matched against the last path segment. aioseo_head_json uses
// colon-namespaced keys (og:image, twitter:site), normalized before matching.
const DENYLIST_FIELD_NAMES = new Set([
  "id",
  "ids",
  "date",
  "date_gmt",
  "modified",
  "modified_gmt",
  "slug",
  "status",
  "type",
  "link",
  "url",
  "href",
  "email",
  "telephone",
  "phone",
  "key",
  "name",
  "layout",
  "acf_fc_layout",
  "format",
  "color",
  "icon",
  "src",
  "image",
  "target",
  "rel",
  "class",
  "classname",
  "template",
  "parent",
  "menu_order",
  "guid",
  "featured_media",
  "card",
  // Currency/instrument ticker (e.g. "eurusd", "XAUUSD") used inside
  // page_builder Flexible Content blocks (comparison_table,
  // cost_saving_calculator, cost_breakdown, calculator_tools) as an exact-
  // match lookup key against live price-feed/broker-cost data downstream —
  // same silent-breakage risk as the enum fields below.
  "instrument",
  // Control/enum values compared with strict === in component code to pick
  // what to render (e.g. image_alignment: "left", card_size: "Small",
  // vertical_alignment: "Top") — translating these breaks the comparison
  // silently, the block just renders wrong/empty with no error anywhere.
  "alignment",
  "size",
  // Raw JSON-LD strings (schema_block.faqs, page_schema) — translating
  // mangles the JSON text itself, not just a value inside it.
  "schema",
  "faqs",
]);

const DENYLIST_FIELD_SUFFIXES = [
  "_id",
  "_url",
  "_link",
  "_href",
  "_image",
  "_icon",
  "_src",
  "_slug",
  "_class",
  "_type",
  "_key",
  "_color",
];

const URL_PATTERN = /^(https?:)?\/\//i;
const RELATIVE_PATH_PATTERN = /^\/[a-zA-Z0-9/_\-.#?=&]*$/;
const HEX_COLOR_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NUMERIC_PATTERN = /^-?\d+(\.\d+)?$/;

// Weglot's translate API silently no-ops (returns the source unchanged) on
// any string containing a block-level tag (<p>, <div>, <h2>, <ul>/<li>,
// <a href="...">, ...) — confirmed against the live API. This affects every
// ACF WYSIWYG field and rich-text FAQ answer, since WordPress's editor
// always wraps paragraph text in <p>. Inline tags without this problem
// (<strong>, <em>, <span>) are rare enough in this content that it's not
// worth special-casing — segmenting ALL HTML strings into tag/text parts
// and translating only the text parts sidesteps the bug entirely and never
// depends on Weglot's undocumented tag-handling behavior.
const HTML_TAG_PATTERN = /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^<>]*)?\/?>/;
const TAG_SPLIT_PATTERN = /(<[^>]+>)/g;

function isHtmlString(value: string): boolean {
  return HTML_TAG_PATTERN.test(value);
}

function isDenylistedField(fieldName: string): boolean {
  const normalized = fieldName.toLowerCase().replace(/:/g, "_");
  if (DENYLIST_FIELD_NAMES.has(normalized)) return true;

  // Trailing/double underscores (e.g. ACF's
  // "live_pricing_table_select_live_feed_") leave an empty string at the
  // end of a naive split — filter it so the real last segment is checked.
  const tokens = normalized.split("_").filter(Boolean);
  const lastSegment = tokens[tokens.length - 1];
  if (lastSegment && DENYLIST_FIELD_NAMES.has(lastSegment)) return true;

  // ACF "select"-type control fields hold enum values (e.g. "ALL Markets",
  // "Deposit Methods") that code compares with strict `===` to decide what
  // to render — translating them breaks that dispatch with no visible
  // error, the block just silently stops rendering. Never translate any
  // field with "select" as a name segment, wherever it appears.
  if (tokens.includes("select")) return true;

  return DENYLIST_FIELD_SUFFIXES.some((suffix) => normalized.endsWith(suffix));
}

export function isTranslatable(value: string, fieldName?: string): boolean {
  if (fieldName && isDenylistedField(fieldName)) return false;
  if (value.trim().length <= 1) return false;
  if (URL_PATTERN.test(value)) return false;
  if (RELATIVE_PATH_PATTERN.test(value)) return false;
  if (HEX_COLOR_PATTERN.test(value)) return false;
  if (EMAIL_PATTERN.test(value)) return false;
  if (NUMERIC_PATTERN.test(value)) return false;
  if (value.startsWith("acf/")) return false; // ACF block type identifiers
  return true;
}

export function walkAndExtract(input: unknown): WalkResult {
  const strings: string[] = [];

  function segmentHtml(value: string): HtmlSegment[] {
    return value
      .split(TAG_SPLIT_PATTERN)
      .filter((part) => part !== "")
      .map((part) => {
        if (part.startsWith("<") && part.endsWith(">")) return part; // tag markup, untouched
        if (isTranslatable(part)) {
          strings.push(part);
          return { type: "string-ref", index: strings.length - 1 };
        }
        return part; // whitespace/short/non-translatable text between tags
      });
  }

  function visit(node: unknown, fieldName?: string): WalkedNode {
    if (Array.isArray(node)) {
      return { type: "array", items: node.map((item) => visit(item, fieldName)) };
    }

    if (node !== null && typeof node === "object") {
      const entries: Record<string, WalkedNode> = {};
      for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
        entries[key] = visit(value, key);
      }
      return { type: "object", entries };
    }

    if (typeof node === "string" && !(fieldName && isDenylistedField(fieldName))) {
      if (isHtmlString(node)) {
        return { type: "html", segments: segmentHtml(node) };
      }
      if (isTranslatable(node, fieldName)) {
        strings.push(node);
        return { type: "string-ref", index: strings.length - 1 };
      }
    }

    return { type: "leaf", value: node };
  }

  const tree = visit(input);
  return { strings, tree };
}
