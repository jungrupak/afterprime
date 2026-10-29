import type { SyntheticEvent } from "react";
import { appendStoredUTMs, isSignupAppUrl } from "@/utils/persistUTM";

const BASE_ATTR = "data-utm-base";

// UTM cookies are written by an afterInteractive script, so they may not exist
// at render time on a first visit. Decorate the href at interaction time instead.
const decorate = (e: SyntheticEvent<HTMLAnchorElement>) => {
  const anchor = e.currentTarget;
  const base = anchor.getAttribute(BASE_ATTR) ?? anchor.href;
  if (!isSignupAppUrl(base)) return;

  anchor.setAttribute(BASE_ATTR, base);
  anchor.href = appendStoredUTMs(base);
};

// Spread onto any <a> that may point at the signup app.
// pointerenter: hover status bar; pointerdown: right-click copy / middle-click;
// click: keyboard Enter; focus: tab focus
export const utmLinkHandlers = {
  onPointerEnter: decorate,
  onPointerDown: decorate,
  onClick: decorate,
  onFocus: decorate,
};
