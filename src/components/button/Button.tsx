import Link from "next/link";
//type : btn-default, btn-small, btn-inline-text
//color : primary, secondary, light, dark
import styles from "./Button.module.scss";

export default function Button({
  btnText = "Button",
  btnArrow = false,
  linkTo = "#",
  btnSize,
  btnColor,
  btnType,
}: {
  btnText?: string;
  linkTo?: string;
  btnType?: string;
  btnSize?: string;
  btnColor?: string;
  btnArrow?: boolean;
  btnProps?: { label: string };
}) {
  return (
    <div className="ap_button">
      <Link href={linkTo} className={`${btnSize} ${btnColor} ${btnType}`}>
        {btnText}
        <span className={`${btnArrow ? "inline-block" : "hidden"}`}>
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_4038_5814" fill="white">
              <path d="M0 9.5L9 0.499999L18 9.5L9 18.5L0 9.5Z" />
            </mask>
            <path
              d="M18 9.5L19.0607 10.5607L20.1213 9.5L19.0607 8.43934L18 9.5ZM9 0.499999L7.93934 1.56066L16.9393 10.5607L18 9.5L19.0607 8.43934L10.0607 -0.560661L9 0.499999ZM18 9.5L16.9393 8.43934L7.93934 17.4393L9 18.5L10.0607 19.5607L19.0607 10.5607L18 9.5Z"
              fill="white"
              mask="url(#path-1-inside-1_4038_5814)"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}
