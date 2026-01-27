import React from "react";
import styles from "./ListUI.module.scss";


interface HeroBullets {
  bullet_point?: string;
}

interface ListUiProps {
  customClass?: string;
  heroBulletLists?: HeroBullets[];
}

export default function ListUi({customClass, heroBulletLists = []}: ListUiProps) {
  return <div className={`${styles.listUi} ${customClass}`}>
    <ul>
      {heroBulletLists.map((item, idx) => (<li key={idx}>{item.bullet_point}</li>))}
    </ul>
  </div>;
}