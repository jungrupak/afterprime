import styles from "./Loading.module.scss";

export function Loader() {
  return (
    <div
      className={`${styles.loader} flex gap-2 text-[18px] items-center  justify-center`}
    >
      <svg
        version="1.1"
        id="L9"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        enableBackground="new 0 0 0 0"
        xmlSpace="preserve"
        viewBox="0 0 100 100"
      >
        <rect fill="#fff" x="0" y="0" width="15" height="50">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="translate"
            values="0 0; 0 20; 0 0"
            begin="0"
            dur="0.6s"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
        <rect fill="#fff" x="40" y="0" width="15" height="50">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="translate"
            values="0 0; 0 20; 0 0"
            begin="0.2s"
            dur="0.6s"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
        <rect fill="#fff" x="80" y="0" width="15" height="50">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="translate"
            values="0 0; 0 20; 0 0"
            begin="0.4s"
            dur="0.6s"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
      </svg>
      Loading..
    </div>
  );
}
