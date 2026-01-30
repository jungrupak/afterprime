import { getBrokerCompareData } from '@/lib/getBrokersToCompare';

export async function metaDataHelper(instrument: string) {
    if(!instrument)return{
        title:`Trade ${instrument} at Lower Cost vs the Next Best Option`,
        description: `Trade ${instrument} on Afterprime with verified low trading costs, transparent execution, and institutional liquidity. Compare brokers all-in costs.`
    };
  const data = await getBrokerCompareData(instrument);
  //console.log("Meta Load API:", data);

  const secondBestVsAfterprimePct = data?.secondBestVsAfterprimePct ?? 0;

  return { 
    title: `Trade ${instrument} at ${secondBestVsAfterprimePct}% Lower Cost vs the Next Best Option`, 
    description: `Trade ${instrument} on Afterprime with verified low trading costs, transparent execution, and institutional liquidity. Compare brokers all-in costs.`
  };
}