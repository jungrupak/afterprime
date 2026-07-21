"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import styles from "./style.module.scss";

interface WeglotGlobal {
  initialized: boolean;
  getCurrentLang: () => string;
  switchTo: (code: string) => void;
  on: (
    event: "initialized" | "languageChanged",
    callback: (newLang?: string, previousLang?: string) => void,
  ) => void;
}

declare global {
  interface Window {
    Weglot?: WeglotGlobal;
  }
}

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncFromWeglot = () => {
      const weglot = window.Weglot;
      if (!weglot?.initialized) return false;
      setCurrentLang(weglot.getCurrentLang());
      weglot.on("languageChanged", (newLang) => {
        if (newLang) setCurrentLang(newLang);
      });
      return true;
    };

    if (syncFromWeglot()) return;

    const interval = setInterval(() => {
      if (syncFromWeglot()) clearInterval(interval);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    setIsOpen(false);
    if (code === currentLang) return;
    window.Weglot?.switchTo(code);
  };

  const otherLanguages = LANGUAGES.filter((l) => l.code !== currentLang);

  return (
    <div className={styles.switcher} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={16} strokeWidth={1.75} />
        <span>{currentLang.toUpperCase()}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {otherLanguages.map((lang) => (
            <li key={lang.code}>
              <button type="button" onClick={() => handleSelect(lang.code)}>
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
