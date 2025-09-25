import styles from "./Retry.module.scss";
import Image from "next/image";

export function Retrying() {
  return (
    <div
      className={`${styles.retrying} flex gap-4 text-[18px] items-center justify-center`}
    >
      <Image
        width={20}
        height={20}
        src="/img/icon-retrying.png"
        alt="image connection error"
      />
      Disconnected. Retrying..
    </div>
  );
}
