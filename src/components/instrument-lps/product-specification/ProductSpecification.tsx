import React from "react";
import styles from "./ProductSpecification.module.scss";
import Link from "next/link";

interface ProductSpecListType {
  asset_class?: string;
  product_type?: string;
  average_spread?: string;
  commission?: string;
  flow_rewardstm_per_lot?: string;
  execution_speed?: string;
  contract_size?: string;
  minimum_lot?: string;
  maximum_lots?: string;
  lot_step?: string;
  leverage?: string;
  swap_type_and_3_day_swap?: string;
  trading_hours?: string;
  platforms_supported?: string;
  licensing_and_regulation?: string;
}

interface Specification {
  productSpec?: ProductSpecListType;
}

export default function ProductSpecification({ productSpec }: Specification) {
  //##
  if (!productSpec) return null;

  return (
    <section className={`md:py-20!`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className={`ap_container_small relative z-1 w-full`}>
        <h2 className={`text-center font-semibold max-md:leading-[1.2]`}>
          AUDUSD Trading Specification
        </h2>
        <div className={`${styles.costBreakDownTable}`}>
          <table cellPadding={"0"} cellSpacing={"0"} border={0}>
            <tbody>
              <tr>
                <td>Asset Class</td>
                <td>{productSpec.asset_class}</td>
              </tr>
              <tr>
                <td>Product type</td>
                <td>{productSpec.product_type}</td>
              </tr>
              <tr>
                <td>Average spread</td>
                <td>{productSpec.average_spread}</td>
              </tr>
              <tr>
                <td>Commission</td>
                <td>{productSpec.commission}</td>
              </tr>
              <tr>
                <td>
                  Flow Rewards<sup>TM</sup> per lot
                </td>
                <td>{productSpec.flow_rewardstm_per_lot}</td>
              </tr>
              <tr>
                <td>Execution speed</td>
                <td>{productSpec.execution_speed}</td>
              </tr>
              <tr>
                <td>Contract size</td>
                <td>{productSpec.contract_size}</td>
              </tr>
              <tr>
                <td>Minimum lot</td>
                <td>{productSpec.minimum_lot}</td>
              </tr>
              <tr>
                <td>Maximum lots</td>
                <td>{productSpec.maximum_lots}</td>
              </tr>
              <tr>
                <td>Lot step</td>
                <td>{productSpec.lot_step}</td>
              </tr>
              <tr>
                <td>Leverage</td>
                <td>{productSpec.leverage}</td>
              </tr>
              <tr>
                <td>Swap type & 3-Day Swap</td>
                <td>{productSpec.swap_type_and_3_day_swap}</td>
              </tr>
              <tr>
                <td>Trading hours</td>
                <td>{productSpec.trading_hours}</td>
              </tr>
              <tr>
                <td>Platforms supported</td>
                <td>{productSpec.platforms_supported}</td>
              </tr>
              <tr>
                <td>Licensing and regulation</td>
                <td>{productSpec.licensing_and_regulation}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
