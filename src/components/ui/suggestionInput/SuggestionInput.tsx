"use client";
import styles from "./SuggestionInput.module.scss";
import { useState, useRef, useEffect } from "react";
import RightArrow from "../RightArrow";
import SearchIcon from "../SearchIcon";

interface SelectElements {
  label?: string;
  options?: string[];
  selectedValue?: (value: string) => void; // so this is expected to be a callback function onSelect(value)
  listSearch?: boolean;
  isDisabled?: boolean;
}

export default function Dropdown({
  label = "Select Option",
  options = [],
  selectedValue,
  listSearch,
  isDisabled,
}: SelectElements) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    //check if clicked outside for the reference(dropdown)
    function handleClickOutSide(e: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const handleSelect = (option: string) => {
    setValue(option);
    setIsOpen(false);
    setSearch("");
    selectedValue && selectedValue(option);
  };

  // FILTERED OPTIONS BASED ON SEARCH
  const filtered = search
    ? options.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    : options; // ← if search empty → show full list

  //console.log("lets see filtered:", filtered);

  return (
    <div
      ref={dropDownRef}
      className={`${styles.selectWrapParent} ${
        isDisabled ? styles.readOnly : ""
      } relative`}
    >
      <div
        className={`${styles.selectWrap}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || label}
        <RightArrow />
      </div>
      {isOpen && (
        <ul className={`${styles.dropDownItems}`} style={{ top: "0" }}>
          {/* Search and sort list */}
          {listSearch && (
            <li
              className={`${styles.hasSearchIcon}`}
              style={{ position: "sticky", top: "0", zIndex: "2" }}
            >
              <SearchIcon />
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                value={search}
                onChange={(e) => {
                  const value = e.target.value.trimStart();
                  setSearch(e.target.value);
                  setValue(e.target.value);
                }}
                className="dropdown-search w-full"
              />
            </li>
          )}

          {/* Ends */}

          {filtered.length > 0 ? (
            filtered?.map((option, index) => (
              <li key={index} onClick={() => handleSelect(option)}>
                {option}
              </li>
            ))
          ) : (
            <li className="no-results">No results</li>
          )}
        </ul>
      )}
    </div>
  );
}
