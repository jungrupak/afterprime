import React from "react";
import styles from "./ListUI.module.scss";

interface HeroBullets {
  point_one?: string;
  point_two?: string;
  point_three?: string;
}

interface ListUiProps {
  customClass?: string;
  heroBulletLists?: HeroBullets;
}

export default function ListUi({ customClass, heroBulletLists }: ListUiProps) {
  if (!heroBulletLists) return null;
  return (
    <div className={`${styles.listUi} ${customClass}`}>
      <ul>
        <li
          dangerouslySetInnerHTML={{ __html: heroBulletLists.point_one || "" }}
        />
        <li
          dangerouslySetInnerHTML={{ __html: heroBulletLists.point_two || "" }}
        />
        <li
          dangerouslySetInnerHTML={{
            __html: heroBulletLists.point_three || "",
          }}
        />
      </ul>
    </div>
  );
}
