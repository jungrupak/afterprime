import styles from "./SinglePricing.module.scss";

export function SinglePricing() {
  return <div className={`${styles.CardWrapper}`}>
    <div className={`${styles.CardHead}`}>
      <div className={`text-[24px] font-bold leading-[1] mb-4`}>AUDUSD</div>
      <div className={`${styles.classSet}`}>
        <span>FOREX</span>
        <span>Market Open</span>
      </div>
    </div>
    <div className={`${styles.CardBody} flex gap-5`}>
      <div className={`flex-1`}>
        <div className={`text-[16px] opacity-65`}>Bid Price</div>
        <div className={`text-[28px] font-semibold`}>1.23904</div>
      </div>
      <div className={`flex-1`}>
        <div className={`text-[16px] opacity-65`}>Ask Price</div>
        <div className={`text-[28px] font-semibold`}>1.23904</div>
      </div>
      <div className={`text-right flex-1`}>
        <div className={`text-[16px] opacity-65`}>Spread</div>
        <div className={`text-[28px] font-semibold`}>0.00</div>
      </div>
    </div>
  </div>;
}