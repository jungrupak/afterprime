import TypeformButton from "@/components/instrument-lps/typeform-btn/typeForm";
import styles from "@/components/instrument-lps/cta/Cta.module.scss";
export function BottomCta() {
  return (
    <section className={`compact-section`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className={`ap_container_small relative z-1 w-full`}>
        <div
          className={`${styles.bottomCta} flex flex-col justify-center items-center text-center`}
        >
          <div>
            <h2 className={`md:mb-8! leading-[1]`}>
              No Fine Print. Better Trading Economics.
            </h2>
            <p className={`paragraph mb-8 md:mb-10 opacity-80`}>
              Built on transparency. Lowest total trading costs.
              <br />
              Execution you can measure. Rewards shared with you.
            </p>
            <TypeformButton buttonText="Apply for Invite code" size="Regular" />
            <div className={`mt-5 opacity-65`}>
              Invite only access for approved trading profiles.<br/>
              Get an invite code from a <a href="https://discord.com/invite/NKBcxyWzdM">Discord</a> friend.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
//
