import styles from "./ui.module.scss";

interface USPInterface {
  title: string;
  description: string;
}

interface USPProps {
  uspData?: USPInterface[];
}

export default function USP({ uspData = [] }: USPProps) {
  return (
    <>
      {uspData.map((item, index) => (
        <div key={index} className={`${styles.uspcard}`}>
          <h2 className="h2-size">{item.title}</h2>
          <p className="paragraph">{item.description}</p>
        </div>
      ))}
    </>
  );
}
