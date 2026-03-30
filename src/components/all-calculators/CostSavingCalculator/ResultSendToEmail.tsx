"use client";
import React, { useState } from "react";
import styles from "./CostSavingCalculator.module.scss";
import Input from "@/components/ui/inputfield/Input";
import Button from "@/components/ui/Button";

//GET COOKIES HELPER-----------------
function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}
//GET COOKIES HELPER-----------------

interface Props {
  activeBroker: string;
  lotsPerMonth: number;
  savingPerMonth: string;
}

type SendState = "idle" | "error" | "sending" | "success";

export default function ResultSendToEmail({
  activeBroker,
  lotsPerMonth,
  savingPerMonth,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SendState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // After calculator runs and displays results
  async function sendCalculatorData() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus("error");
      setStatusMessage("Email address is required.");
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setStatus("error");
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setStatusMessage("Sending your cost saving data...");

    try {
      const calculatorData = {
        email: trimmedEmail,
        currentBroker: activeBroker,
        lotsPerMonth,
        calculatedSavings: savingPerMonth,
        timestamp: new Date().toISOString(),
        utmSource: getCookie("_gpfx_utm_source"),
        utmMedium: getCookie("_gpfx_utm_medium"),
        utmCampaign: getCookie("_gpfx_utm_campaign"),
      };

      const response = await fetch(
        "https://n8n.srv1369710.hstgr.cloud/webhook/calculator-completion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(calculatorData),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      setStatus("success");
      setStatusMessage("Your cost saving data has been sent successfully.");
    } catch (error) {
      console.error("❌ Error sending calculator data:", error);
      setStatus("error");
      setStatusMessage(
        "We couldn’t send the data right now. Please try again.",
      );
    }
  }

  return (
    <div className={`${styles.resultSendinEmail} p-[25px] md:p-[40px]`}>
      <div className={styles.resultSendinEmailContent}>
        <h3 className={`text-[18px] font-semibold mb-5`}>
          Send the Cost Saving Data
        </h3>
        <div
          className={`${styles.resultSendinEmailForm} flex flex-col md:flex-row gap-4`}
        >
          <Input
            type="email"
            value={email}
            placeholder="example@email.com"
            wrapperClassName={styles.resultSendinEmailInputWrap}
            className={styles.resultSendinEmailInput}
            onchange={(value) => {
              setEmail(value);
              if (status !== "idle") {
                setStatus("idle");
                setStatusMessage("");
              }
            }}
          />
          <Button
            className={styles.sendEmailBtn}
            varient="primary"
            size="small"
            onclick={sendCalculatorData}
          >
            Send Cost Savings Data
          </Button>
        </div>
        {status !== "idle" && (
          <p
            className={`${styles.resultSendinEmailStatus} ${
              status === "success"
                ? styles.resultSendinEmailStatusSuccess
                : status === "sending"
                  ? styles.resultSendinEmailStatusSending
                  : styles.resultSendinEmailStatusError
            }`}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}
