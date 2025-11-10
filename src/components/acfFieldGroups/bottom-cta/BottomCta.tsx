import dynamic from "next/dynamic";
import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";
import type { PageFieldGroups } from "@/types/blocks";
import TypeformButton from "@/components/ui/typeForm";

type CtaProps = PageFieldGroups["bottom_cta"];

export function BottomCta(props: CtaProps) {
  const { section_title, section_paragraph, card_apply, card_referal } =
    props || {};

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
              <br />
              not extraction.
            </h2>
            <p className="paragraph max-w-2xl mx-auto mb-20 opacity-90">
              Lowest costs, transparent execution, shared rewards.Value you
              won&apos;t find anywhere else.
            </p>
          </div>
          {/* Cards */}
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 text-center md:mt-18 md:max-w-[900px] md:mx-auto">
            <div className={`${styles.ctaCard} group`}>
              <h3 className="">Apply</h3>
              <p>
                We review each application by hand.Only serious traders are
                approved.
              </p>

              <TypeformButton buttonText="Request Invite" size="Regular" />
            </div>

            <div className={`${styles.ctaCard} group`}>
              <h3 className="">Referral</h3>
              <p>
                Know an existing member? Their invite code gets you straight
                through the door.
              </p>

              <a
                className="ap_button ghost regular"
                href="https://discord.com/invite/NKBcxyWzdM"
                target="_blank"
                rel="noopener noreferrer"
              >
                {card_referal?.cat_label || "Ask on Discord"}
              </a>
            </div>
          </div>
          {/* Cards Ends */}
        </div>
      </section>
    </>
  );
}
//
