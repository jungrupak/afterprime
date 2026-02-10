import TypeformButton from "@/components/instrument-lps/typeform-btn/typeForm";
import styles from "@/components/instrument-lps/cta/Cta.module.scss";
import { getGlobalOptionFields } from "@/lib/getGlobalBlockData";
export async function BottomCta() {
  const fieldsData = await getGlobalOptionFields("global_cta_fields"); //pass custom field group name to get exact field datas

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
            <h2 className={`md:mb-8! leading-[1]`}>{fieldsData?.headline}</h2>
            <p
              className={`paragraph mb-8 md:mb-10 opacity-80`}
              dangerouslySetInnerHTML={{ __html: fieldsData?.paragraph || "" }}
            />
            {/* <p className={`paragraph mb-8 md:mb-10 opacity-80`}>
              Built on transparency. Lowest total trading costs.
              <br />
              Execution you can measure. Rewards shared with you.
            </p> */}
            <TypeformButton buttonText="Apply for Invite code" size="Regular" />
            <div className={`mt-5 opacity-65`}>{fieldsData?.small_text}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
//
