"use client";
import styles from "./CostComparison.module.scss";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";
import CrossIcon from "@/components/ui/icons/CrossIcon";

//##
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes feed cache

export default function CostComparison({ instrument }: { instrument: string }) {
  //####
  const { data, isLoading, error } = useQuery({
    queryKey: ["cost-comparison", instrument],
    queryFn: () => getBrokerCompareData(instrument!),
    enabled: !!instrument, //prevents undefined crash
    staleTime: CACHE_TTL, // fresh for 2 minutes
    gcTime: 10 * 60 * 1000, // cache stays for 10 minutes
  });
  //####

  const brokerList = data?.brokers;
  console.log("data:", brokerList);
  const brokersToPick = [
    "Afterprime",
    "IC Markets (Raw)",
    "Pepperstone UK (.r)",
    "Tickmill UK (Raw)",
    "FXCM",
    "FXOpen (TickTrader)",
  ];
  const pickedBrokersLists = brokerList?.filter((item) =>
    brokersToPick.includes(item.broker),
  );

  const rebatePerLot = data?.rebate?.rebate_usd_per_lot ?? null;

  //Broker Commissions
  const commissionByBroker: Record<string, number> = {
    Afterprime: 0,
    "IC Markets (Raw)": 7,
    "Pepperstone UK (.r)": 7,
    "Tickmill UK (Raw)": 6,
    FXCM: 7,
    "FXOpen (TickTrader)": 5,
  };

  //build comparison DATA json schema
  const schemaData =
    data && pickedBrokersLists
      ? {
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: `${instrument} Cost Comparison`,
          description: `Instrument specific comparison of ${instrument} trading costs across major FX brokers.`,
          creator: {
            "@type": "Organization",
            name: "Afterprime",
          },
          dateModified: new Date().toISOString().split("T")[0],
          variableMeasured: [
            {
              "@type": "PropertyValue",
              name: "Cost Per Lot (Incl. Commission)",
              unitText: "USD per lot",
            },
            {
              "@type": "PropertyValue",
              name: "All-In Cost (Round Turn)",
              unitText: "USD including commission",
            },
            {
              "@type": "PropertyValue",
              name: "Flow Rewards",
              unitText: "USD per lot",
            },

            {
              "@type": "PropertyValue",
              name: "Net Cost",
              unitText: "USD per lot",
            },

            {
              "@type": "PropertyValue",
              name: "Savings (vs Afterprime)",
              unitText: "% cost saved",
            },
          ],
          hasPart: pickedBrokersLists.map((broker) => {
            const commission = commissionByBroker[broker.broker] ?? 0;
            const rebate =
              broker.broker === "Afterprime" ? (rebatePerLot ?? 0) : 0;

            const allIn =
              broker.broker === "Afterprime"
                ? broker.costPerLot - rebate
                : broker.costPerLot + commission;

            return {
              "@type": "Dataset",
              name: broker.broker,
              variableMeasured: [
                {
                  name: "Cost Per Lot (Incl. Commission)",
                  value: broker.cost.toFixed(2),
                  unitText: "USD including commission",
                },
                {
                  name: "All-In Cost (Round Turn)",
                  value: broker.costPerLot.toFixed(2),
                  unitText: "USD per lot",
                },
                ...(broker.broker === "Afterprime"
                  ? [
                      {
                        name: "Flow Rewards",
                        value: rebate,
                        unitText: "USD per lot",
                      },
                    ]
                  : []),

                {
                  name: "Net Cost",
                  value: Number(allIn.toFixed(2)),
                  unitText: "USD per lot",
                },

                {
                  name: "Savings (Vs Afterprime)",
                  value: broker.savingPercentage,
                  unitText: "% cost saved",
                },
              ],
            };
          }),
        }
      : null;
  //Schema Ends ##

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load data</div>;

  return (
    <>
      <section className={`md:py-20! max-md:pt-0!`}>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}

        <div className={`ap_container_small relative z-1 w-full`}>
          <h2 className={`text-center font-semibold max-md:leading-[1.2]`}>
            Compare {instrument} Broker Costs
          </h2>
          <div className={`${styles.costCompareTable}`}>
            <div
              className={`${styles.costCompareTableHead} grid grid-cols-7 gp-10 md:gap-5`}
            >
              <div className={`col-span-3 md:col-span-2`}></div>
              <div className={`col-span-1 md:block hidden`}>
                Cost Per Lot <br />
                (Incl. Commission)
              </div>

              <div className={`md:block hidden col-span-1`}>
                All-In Cost <br />
                (Round Turn)
              </div>
              <div className={`col-span-1 md:block hidden`}>
                Flow Rewards<sup>TM</sup> <br />
                (Lot)
              </div>
              <div className={`max-md:col-span-2 col-span-1`}>Net Cost</div>
              <div className={`max-md:col-span-2 col-span-1 text-[#ffffff]!`}>
                <b>
                  Savings <br />
                  (vs Afterprime)
                </b>
              </div>
            </div>
            <div className={`${styles.compareTableBody}`}>
              {/* #### */}

              {pickedBrokersLists?.map((broker, indx) => (
                <div
                  key={`${broker.broker}-${broker.symbol}`}
                  className={`${styles.costCompareTableRow} ${broker.broker === "Afterprime" ? styles.afterprime : ""} grid grid-cols-7 gap-5`}
                >
                  <div className={`col-span-3 md:col-span-2 relative`}>
                    {broker.broker === "Afterprime" && (
                      <div className={`${styles.isBest}`}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.65101 6.98611C1.24009 6.21353 0.256823 5.956 0 5.04454C1.28167 4.86781 2.55845 4.6229 3.84501 4.54211C4.65707 4.49161 5.03374 4.1028 5.34193 3.39838C5.84579 2.24707 6.43282 1.13111 6.98315 0C7.87103 1.06799 8.19145 2.46168 8.92278 3.62056C9.0622 3.96898 9.11601 4.38305 9.60031 4.43859C10.8477 4.58503 12.0952 4.74157 13.345 4.89306C14.1815 5.07232 14.1595 5.42579 13.6019 5.98882C13.3132 6.28169 12.8558 6.34481 12.6822 6.76646C12.1783 7.24112 11.694 7.74103 11.1633 8.17782C10.7621 8.50857 10.679 8.84941 10.7695 9.36952C11.0238 10.8516 11.2073 12.3488 11.4397 14C10.1433 13.2678 8.96436 12.6391 7.82945 11.9423C7.25465 11.5888 6.80704 11.6115 6.23714 11.9701C5.13402 12.6644 3.9722 13.2628 2.83484 13.9015C2.57068 13.5708 2.8006 13.2527 2.73211 12.9598C2.93757 11.6898 3.1308 10.4148 3.35827 9.14734C3.44143 8.6853 3.28245 8.4101 2.89354 8.23084C2.55601 7.73598 2.12307 7.34211 1.65345 6.98611H1.65101Z"
                            fill="white"
                            fillOpacity="0.68"
                          />
                        </svg>
                      </div>
                    )}

                    <div
                      data-label={`Broker`}
                      className={`col-span-3 relative`}
                    >
                      {broker.broker}
                    </div>
                  </div>
                  <div
                    data-label={`Cost Per Lot (Incl. Commission)`}
                    className={`col-span-1 md:block hidden`}
                  >
                    {broker.cost.toFixed(2)}
                  </div>

                  <div
                    data-label={`All-In-Cost (Round Trip)`}
                    className={`col-span-1 md:block hidden`}
                  >
                    ${broker.costPerLot.toFixed(2)}
                  </div>

                  <div
                    data-label={`Flow Rewards`}
                    className={` col-span-1 md:block hidden`}
                  >
                    {broker.broker === "Afterprime" && rebatePerLot !== null ? (
                      `$${rebatePerLot.toFixed(2)}`
                    ) : (
                      <>-</>
                    )}
                  </div>

                  <div
                    data-label={`Net Cost (Round Trip)`}
                    className={`max-md:col-span-2 col-span-1 `}
                  >
                    {(() => {
                      const commission = commissionByBroker[broker.broker] ?? 0;

                      // AfterPrime: costPerLot minus rebate
                      if (broker.broker === "Afterprime") {
                        const rebate = rebatePerLot ?? 0;
                        const allIn = broker.costPerLot - rebate;
                        return `$${allIn.toFixed(2)}`;
                      }

                      // Other brokers: costPerLot FEED ALREADY INCLUDES COMMISSION
                      const allIn = broker.costPerLot;
                      return `$${allIn.toFixed(2)}`;
                    })()}
                  </div>
                  <div
                    data-label={`Savings (vs Afterprime)`}
                    className={`max-md:col-span-2 col-span-1`}
                  >
                    <b>{broker.savingPercentage}%</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-[14px] bg-[rgba(255,255,255,.12)] rounded-[5px] p-2 text-[rgba(255,255,255,.48)]">
            Savings represent how much more each broker costs per trade compared
            to Afterprime, after fees and rebates.
          </div>

          <div
            className={`flex gap-1 text-[14px] w-full justify-center gap-4 items-start mt-4 md:mt-10`}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0645 2.50293C11.6488 1.83419 12.6882 1.83419 13.2725 2.50293C14.0639 3.40906 15.3091 3.77476 16.4648 3.44043C17.3181 3.19354 18.1934 3.75606 18.3232 4.63477C18.4993 5.82482 19.349 6.80496 20.502 7.14844C21.3532 7.40209 21.7847 8.3488 21.4189 9.1582C20.9237 10.2545 21.1084 11.5389 21.8926 12.4512C22.4715 13.1248 22.3234 14.1545 21.5781 14.6377C20.5689 15.2922 20.0299 16.4718 20.1963 17.6631C20.3192 18.5428 19.6382 19.3295 18.75 19.333C17.5469 19.3378 16.4553 20.0394 15.9512 21.1318C15.5789 21.938 14.581 22.2309 13.832 21.7539C12.8173 21.1074 11.5196 21.1074 10.5049 21.7539C9.7559 22.2309 8.75803 21.938 8.38574 21.1318C7.88162 20.0394 6.79006 19.3378 5.58691 19.333C4.69869 19.3295 4.01768 18.5428 4.14062 17.6631C4.30699 16.4718 3.76799 15.2922 2.75879 14.6377C2.01347 14.1545 1.86538 13.1248 2.44434 12.4512C3.22854 11.5389 3.41322 10.2545 2.91797 9.1582C2.55218 8.34881 2.98377 7.4021 3.83496 7.14844C4.98791 6.80496 5.83762 5.82482 6.01367 4.63477C6.14355 3.75606 7.01881 3.19354 7.87207 3.44043C9.02778 3.77477 10.273 3.40906 11.0645 2.50293Z"
                fill="#3EA0EA"
                stroke="#58B7FF"
                strokeWidth="1.62935"
              />
              <path
                d="M7.53143 12.3252L8.93059 10.8673L12.6617 14.7552L11.2625 16.2132L7.53143 12.3252Z"
                fill="white"
              />
              <path
                d="M15.6932 8.6803L17.0924 10.1383L11.2625 16.2132L9.86337 14.7552L15.6932 8.6803Z"
                fill="white"
              />
            </svg>
            <div>
              Ranked #1 Lowest Cost Broker on
              <Link
                className={`underline`}
                target={`_blank`}
                href={"https://www.forexbenchmark.com"}
              >
                ForexBenchmark
              </Link>
              . Prices quoted in US Dollars.
            </div>
          </div>
        </div>
      </section>
      {/* //render data comparison schema */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      )}
    </>
  );
}
