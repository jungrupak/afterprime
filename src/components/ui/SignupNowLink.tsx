"use client";

import { useBypassInvitation } from "@/hooks/useBypassInvitation";

export default function SignupNowLink() {
  const bypassInvitation = useBypassInvitation();

  if (bypassInvitation) return null;

  return (
    <a href="https://app.afterprime.com/live">
      Have a code? <u>Signup Now</u>
    </a>
  );
}
