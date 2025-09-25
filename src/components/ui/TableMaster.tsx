interface TableColValue {
  [key: string]: string | number | undefined; // keys can be anything
}

interface TableData {
  label?: string;
  colObject?: TableColValue[];
}
