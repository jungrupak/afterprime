import styles from "./Lists.module.scss";

type ListsProps = {
  bulletStyle?: string;
  items?: string[];
  customClass?: string;
  size?: "Small" | "Regular" | "large";
};
export default function Lists({
  bulletStyle,
  items = [],
  customClass,
  size = "Regular",
}: ListsProps) {
  return (
    <ul
      className={`${styles.ap_bullet_lists} ${customClass} ${size === "Small" ? styles.small : ""} ${
        bulletStyle ? styles[bulletStyle] : ""
      }`}
    >
      {items.map((item, index) => (
        <li key={index} dangerouslySetInnerHTML={{ __html: item || "" }} />
      ))}
    </ul>
  );
}
