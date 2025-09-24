import styles from "./SectionTable.module.scss";
import type { RowData } from "../ui/Table";
import TableUi from "../ui/Table";

type sectionProps = {
  sectionTitle?: string;
  sectionParagraph?: string;
  dataTableHead: string[];
  dataTableRow: RowData[];
};

export default function SectionTable({
  sectionTitle,
  sectionParagraph,
  dataTableHead,
  dataTableRow,
}: sectionProps) {
  return (
    <>
      <section>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container">
          <div className="mb-10 md:mb-20">
            <h2 className={`${styles.sectionTitle}`}>{sectionTitle}</h2>
            <p className="paragraph max-w-[800px]">{sectionParagraph}</p>
          </div>
          <TableUi
            tableColumnHeading={dataTableHead}
            tableRowData={dataTableRow}
          />
        </div>
      </section>
    </>
  );
}
