import { MegaMenuItems } from "@/utils/menu-item";

// Header/Nav/MobileNav are all Client Components ('use client'), so they
// can't call the Weglot translation pipeline themselves — this content is
// translated once in (site)/layout.tsx (Server) and passed down as props.
// menuItems keeps its full nested shape (menu/menuInfos/category/catMenuItems)
// untouched — the Object Walker already knows to translate labels
// (menuItem, categoryName, menu, title, description, btnText) while leaving
// pageUrl/btnLink values alone (they're relative paths, skipped by the
// walker's URL-pattern check regardless of key name).
export const headerContent = {
  riskWarning:
    "CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. Investors should consider whether they understand how CFDs work before investing. Losses may exceed deposits.",
  logoAlt: "Afterprime Logo",
  login: "Login",
  signup: "Signup",
  signupNow: "Signup Now",
  back: "back",
  menuItems: MegaMenuItems,
};

export type HeaderContent = typeof headerContent;
