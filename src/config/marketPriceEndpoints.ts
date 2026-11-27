// Market price feed endpoints — single source of truth.
// Public URLs (no secrets), safe to import from client components.
const MARKET_PRICE_BASE = "https://marketprice.afterprime.io:5005/api/feed";

/** REST snapshot — returns PricesObjects[] JSON. */
export const MARKET_PRICE_SNAPSHOT_URL = `${MARKET_PRICE_BASE}/MarketPrice`;

/** SignalR hub — pushes PricesObjects[] via the "LatestPrice" event. */
export const MARKET_PRICE_STREAM_URL = `${MARKET_PRICE_BASE}/marketpricestream`;
