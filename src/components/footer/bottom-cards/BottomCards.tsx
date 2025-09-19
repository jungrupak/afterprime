import CardLists from "@/utils/card-lists/CardLists";
import styles from "./BottomCards.module.scss";

export default function BottomCards() {
  // Bottom Cards
  const cardsObjects = [
    {
      subtitle: "Support",
      title: "24/5",
      paragraph: "Get expert support 24/5—whenever you need it!",
      ctaLabel: "Customer Support",
      ctaLink: "#",
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
    <section className={`${styles.bottom_cards}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <CardLists cardItems={cardsObjects} />
    </section>
  );
}
