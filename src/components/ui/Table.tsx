export interface RowData {
  [key: string]: string | number | undefined; // keys can be anything
}

interface SectionProps {
  tableColumnHeading?: string[];
  tableRowData?: RowData[]; // array of tabs
}

export default function TableUi({
  tableColumnHeading = [],
  tableRowData = [],
}: SectionProps) {
  return (
    <>
      <div className="genericTable">
        <table>
          <thead>
            <tr>
              {tableColumnHeading.map((heading, i) => (
                <th key={i}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRowData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {tableColumnHeading.map((col, cellIndex) => (
                  <td key={cellIndex}>{row[col] ?? "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
