import styles from "./Lists.module.scss";

type ListsProps = {
  bulletStyle?: string;
  items: string[];
  customClass?: string;
};
export default function Lists({ bulletStyle, items, customClass }: ListsProps) {
  return (
    <ul
      className={`${styles.ap_bullet_lists} ${customClass} ${
        bulletStyle ? styles[bulletStyle] : ""
      }`}
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
