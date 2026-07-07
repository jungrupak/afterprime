"use client";

import { useEffect, useState } from "react";
import { getGlobalOptionFields } from "@/lib/getGlobalBlockData";

export const BYPASS_SIGNUP_URL = "https://app.afterprime.com/live?t=pass";

export function useBypassInvitation() {
  const [bypassInvitation, setBypassInvitation] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    getGlobalOptionFields("bypass_invitation").then((fieldsData) => {
      setBypassInvitation(fieldsData === true);
    });
  }, []);

  return bypassInvitation;
}
