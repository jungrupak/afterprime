// InstrumentKeyBenifits is a Client Component ('use client') and can't call
// the Weglot translation pipeline itself — this content is translated once
// in each Server Component caller via
// getTranslatedStatic("instrument-key-benefits", locale, ...) and passed
// down as a `content` prop. `{sym}` is interpolated with .replace() at
// render time, after translation — deliberately not `{instrument}`: Weglot's
// MT recognizes "instrument" as a real English word and translates it too
// (es: "{instrument}" -> "{instrumento}"), silently breaking the
// placeholder match. Short non-word tokens like `{sym}` survive untouched
// (verified live against the API). Split around "Save $" / the bold number
// and around <sup>TM</sup> so those pieces can stay outside the translated
// string while the surrounding prose still translates.
export const instrumentKeyBenifitsContent = {
  heading: "Key advantages for {sym} traders",
  lowerCostSuffix: " lower cost vs Industry average",
  saveLabel: "Save $",
  savePerLotsSuffix: " per 100 lots vs Industry Average",
  zeroCommission: "Zero commission structure",
  subExecution: "Sub-50ms institutional execution",
  flowRewardsPrefix: "Flow Rewards",
  flowRewardsSuffix: " structural edge",
  institutionalSpreads: "Institutional spreads",
};

export type InstrumentKeyBenifitsContent = typeof instrumentKeyBenifitsContent;
