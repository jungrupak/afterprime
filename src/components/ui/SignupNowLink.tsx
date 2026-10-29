"use client";

import { useBypassInvitation } from "@/hooks/useBypassInvitation";
import { utmLinkHandlers } from "@/utils/utmLinkHandlers";

interface SignupNowLinkProps {
  preText?: string;
  linkText?: string;
}

export default function SignupNowLink({
  preText = "Have a code?",
  linkText = "Signup Now",
}: SignupNowLinkProps) {
  const bypassInvitation = useBypassInvitation();

  if (bypassInvitation) return null;

  return (
    <a
      href="https://app.afterprime.com/live"
      target="_blank"
      rel="noopener noreferrer"
      {...utmLinkHandlers}
    >
      {preText} <u>{linkText}</u>
    </a>
  );
}
