import styles from "./style.module.scss";
import USP from "@/components/ui/Usp";

interface UspData {
  title: string;
  description: string;
}

interface UspDataProps {
  getUspData: UspData[];
}

export function UspInContent({ getUspData = [] }: UspDataProps) {
  return (
    <section className={`${styles.innerPageUsp}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className={`${styles.uspWrapper} ap_container relative z-1`}>
        <USP uspData={getUspData} />
      </div>
    </section>
  );
}
