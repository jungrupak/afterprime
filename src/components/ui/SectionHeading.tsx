interface Props {
  heading?: string;
  subHeading?: string;
}
export default function SectionHeading({ heading, subHeading }: Props) {
  return (
    <div className={`mb-8 md:mb-12`}>
      {heading && (
        <h2
          className={`font-size-heading-md mb-4 md:mb-6 font-semibold`}
        >
          {heading}
        </h2>
      )}
      {subHeading && (
        <p className={`reading-text-md mb-8 md:mb-12`}>
          {subHeading}
        </p>
      )}
    </div>
  );
}
