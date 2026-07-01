/**
 * @typedef {import('../types/index.js').MarketLocation} MarketLocation
 */

/**
 * آیا بازار در این لحظه (UTC) باز است؟
 * @param {MarketLocation} market
 * @returns {boolean}
 */
export function isMarketOpen(market) {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const openTotal = market.openHourUTC * 60 + market.openMinuteUTC;
  const closeTotal = market.closeHourUTC * 60 + market.closeMinuteUTC;
  const currentTotal = utcHours * 60 + utcMinutes;
  return currentTotal >= openTotal && currentTotal < closeTotal;
}

/**
 * محاسبهٔ وضعیت باز/بسته برای همهٔ بازارها
 * @param {MarketLocation[]} locations
 * @returns {Record<string, boolean>}
 */
export function computeMarketOpenStatus(locations) {
  return Object.fromEntries(
    locations.map((m) => [m.id, isMarketOpen(m)])
  );
}
