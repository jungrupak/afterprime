"use client";
import React from "react";
import { useState, ReactNode, ReactElement } from "react";
import styles from "./ui.module.scss";

export interface TabItemProps {
  tabNav: string;
  children: ReactNode;
}

export function TabItem({ children }: TabItemProps) {
  return <>{children}</>; // just render the content
}

// Tabs container
interface TabProps {
  children: ReactNode; // allow single or multiple TabItem children
}

export default function Tab({ children }: TabProps) {
  const [itemIndex, setItemIndex] = useState<number>(0);
  // Normalize children into an array
  const childArray = React.Children.toArray(
    children
  ) as ReactElement<TabItemProps>[];

  return (
    <>
      {/* Tab Nav */}
      <div className={`${styles.apTabNavWrapper}`}>
        {childArray.map((child, index) => (
          <span
            key={index}
            className={`${styles.tabNavItem} ${
              itemIndex === index ? styles.active : ""
            }`}
            onClick={() => setItemIndex(index)}
          >
            {child.props.tabNav}
          </span>
        ))}
      </div>
      {/* Ends */}

      {/* Tab Content Wrapper */}
      <div className={`${styles.tabContent}`}>
        {childArray[itemIndex].props.children}
      </div>
      {/* Tab Content Wrapper ends */}
    </>
  );
}
