import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";
export function BottomCta() {
  const ctaCardsObjects = [
    {
      cardTitle: "Apply",
      description:
        "We review each application by hand. Only serious traders are approved.",
      btnLink: "#",
      btnText: "Request Invite",
      btnColor: "primary",
    },
    {
      cardTitle: "Referral",
      description:
        "Know an existing member? Their invite code gets you straight through the door.",
      btnLink: "#",
      btnText: "Ask on Discord",
      btnColor: "ghost",
    },
  ] as const; //doing this "as const" because the <btn varient did not taking its value as as Btn's one of the  varient defined in Btn compponent###
  return (
    <>
      <section className={`${styles.section_cta}`}>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="h2-size mb-6">
              Built on alignment,
              <br /> not extraction.
            </h2>
            <p className="paragraph max-w-2xl mx-auto mb-20 opacity-90">
              Lowest costs, transparent execution, shared rewards. Value you
              won&apos;t find anywhere else.
            </p>
          </div>
          {/* Cards */}
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 text-center md:mt-18 md:max-w-[900px] md:mx-auto">
            {ctaCardsObjects.map((item, index) => (
              <div
                key={index}
                className={`${styles.generic_card} card_item group`}
              >
                <h3 className="">{item.cardTitle}</h3>
                <p>{item.description}</p>

                {item.btnLink && (
                  <Btn size="regular" varient={item.btnColor}>
                    {item.btnText}
                  </Btn>
                )}
              </div>
            ))}
          </div>
          {/* Cards Ends */}
        </div>
      </section>
    </>
  );
}
//
