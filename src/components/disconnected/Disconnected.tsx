import styles from "./Disconnected.module.scss";
import Image from "next/image";

export function Disconnected() {
  return (
    <div
      className={`${styles.disconnected} flex gap-4 text-[18px] items-center justify-center`}
    >
      <Image
        width={20}
        height={20}
        src="/img/connect-cloud-error-icon.png"
        alt="image connection error"
      />
      Failed to connect.
    </div>
  );
}
