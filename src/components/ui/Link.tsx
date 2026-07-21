import NextLink from "next/link";
import type { ComponentProps } from "react";

// Prefetch disabled site-wide: Weglot's Cloudflare Worker (es.afterprime.com)
// drops connections under the ~40 concurrent RSC prefetch requests Next.js
// fires per page load, crashing the app on that domain. Flip back to `true`
// once Weglot confirms their Worker handles concurrent text/x-component
// passthrough correctly.
const PREFETCH_ENABLED = false;

type LinkProps = ComponentProps<typeof NextLink>;

export default function Link({ prefetch = PREFETCH_ENABLED, ...props }: LinkProps) {
  return <NextLink prefetch={prefetch} {...props} />;
}
