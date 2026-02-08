"use client";
interface Props {
  src: string;
  width?: string;
  height?: string;
  customCss?: string;
}
export default function Iframe({
  src,
  width = "100%",
  height,
  customCss,
}: Props) {
  return (
    <iframe
      src={src ?? ""}
      width={width}
      height={height}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={customCss}
    />
  );
}
