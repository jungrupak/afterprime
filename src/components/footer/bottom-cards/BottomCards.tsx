import styles from "./BottomCards.module.scss";
import Image from "next/image";

export default function BottomCards() {
  // Bottom Cards
  const cardsObjects = [
    {
      subtitle: "Support",
      title: "24/5",
      paragraph: "Get expert support 24/5 - whenever you need it!",
      ctaLabel: "Customer Support",
      ctaLink: "mailto:support@afterprime.com",
      cardIconUrl: "/img/icon-support.svg",
    },
    {
      subtitle: "Questions",
      title: "FAQs",
      paragraph: "Find quick answers—check our Afterprime help center.",
      ctaLabel: "General Faqs",
      ctaLink: "#",
      cardIconUrl: "/img/icon-faq.svg",
    },
    {
      subtitle: "Community",
      title: "Discord",
      paragraph: "Join our Discord community and connect with trading legends!",
      ctaLabel: "Join Discord Server",
      ctaLink: "#",
      cardIconUrl: "/img/icon-discord.svg",
    },
  ];

  return (
    <section className={`compact-section`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 ">
          <div className={`${styles.card_item_block}`}>
            <Image
              width={40}
              height={40}
              className={`${styles.card_icon}`}
              src={`/img/icon-support.svg`}
              alt=""
            />
            <span>Support</span>
            <h2>24/5</h2>
            <p>Get expert support 24/5 - whenever you need it!</p>
            <a
              href={`mailto:support@afterprime.com`}
              className="card_href_link hover:underline"
            >
              Customer Support
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
            </a>
          </div>
          <div className={`${styles.card_item_block}`}>
            <Image
              width={40}
              height={40}
              className={`${styles.card_icon}`}
              src={`/img/icon-support.svg`}
              alt=""
            />
            <span>Questions</span>
            <h2>FAQs</h2>
            <p>Find quick answers—check our Afterprime help center.</p>
            <a
              href={`https://help.afterprime.com/`}
              className="card_href_link hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              General FAQs
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
            </a>
          </div>
          <div className={`${styles.card_item_block}`}>
            <Image
              width={40}
              height={40}
              className={`${styles.card_icon}`}
              src={`/img/icon-support.svg`}
              alt=""
            />
            <span>Community</span>
            <h2>Discord</h2>
            <p>Join our Discord community and connect with trading legends!</p>
            <a
              href={`https://discord.com/invite/NKBcxyWzdM`}
              className="card_href_link hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Our Discord
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
            </a>
          </div>
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
