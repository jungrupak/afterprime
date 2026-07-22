"use client";

import { useBypassInvitation } from "@/hooks/useBypassInvitation";

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
    <a href="https://app.afterprime.com/live">
      {preText} <u>{linkText}</u>
    </a>
  );
}
