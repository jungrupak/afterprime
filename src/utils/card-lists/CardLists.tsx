import Link from "next/link";
import styles from "./CardList.module.scss";

type CardObjectGroup = {
  subtitle?: string;
  title?: string;
  paragraph?: string;
  ctaLabel?: string;
  ctaLink?: string;
  cardIconUrl?: string;
};

type CardContentProps = {
  cardItems?: CardObjectGroup[];
};

export default function CardLists({ cardItems = [] }: CardContentProps) {
  return (
    <div className="ap_container">
      {/* Cards */}
      <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 ">
        {cardItems.map((item, index) => (
          <div key={index} className={`${styles.card_item_block}`}>
            <img
              className={`${styles.card_icon}`}
              src={item.cardIconUrl}
              alt=""
            />
            <span>{item.subtitle}</span>
            <h2>{item.title}</h2>
            <p>{item.paragraph}</p>
            <Link
              href={item.ctaLink || ""}
              className="card_href_link hover:underline"
            >
              {item.ctaLabel}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10.0809"
                  cy="10.0808"
                  r="9.58093"
                  transform="rotate(-90 10.0809 10.0808)"
                  fill="#fff"
                />
                <mask id="path-2-inside-1_0_1" fill="white">
                  <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z" />
                </mask>
                <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z" />
                <path
                  d="M13.3014 10.4863L14.3176 11.5025L15.3338 10.4863L14.3176 9.47012L13.3014 10.4863ZM9.09321 6.27812L8.077 7.29433L12.2852 11.5025L13.3014 10.4863L14.3176 9.47012L10.1094 5.26191L9.09321 6.27812ZM13.3014 10.4863L12.2852 9.47012L8.077 13.6783L9.09321 14.6945L10.1094 15.7107L14.3176 11.5025L13.3014 10.4863Z"
                  fill="var(--secondary-color)"
                  mask="url(#path-2-inside-1_0_1)"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>
      {/* Cards Ends */}
    </div>
  );
}
