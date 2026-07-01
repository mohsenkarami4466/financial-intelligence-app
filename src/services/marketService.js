import mockData from '../data/mockData';
import { simulateNetworkDelay, serviceCall } from './helpers';

/**
 * خلاصهٔ دارایی‌ها و شاخص‌های بازار
 * @returns {Promise<{ data: { assets: Array, market: Array } | null, error: string | null }>}
 */
export async function getSummary() {
  return serviceCall(async () => {
    await simulateNetworkDelay();
    return {
      assets: mockData.assets,
      market: mockData.market,
    };
  });
}

/**
 * رویداد کلیدی روز
 * @returns {Promise<{ data: object | null, error: string | null }>}
 */
export async function getEvents() {
  return serviceCall(async () => {
    await simulateNetworkDelay();
    return mockData.keyEvent;
  });
}

/**
 * خلاصهٔ هوش مصنوعی روزانه
 * @returns {Promise<{ data: Array | null, error: string | null }>}
 */
export async function getBrief() {
  return serviceCall(async () => {
    await simulateNetworkDelay();
    return mockData.brief;
  });
}

/**
 * دریافت همهٔ داده‌های بازار یکجا
 * @returns {Promise<{ data: object | null, error: string | null }>}
 */
export async function getMarketData() {
  return serviceCall(async () => {
    await simulateNetworkDelay();
    return {
      assets: mockData.assets,
      market: mockData.market,
      keyEvent: mockData.keyEvent,
      brief: mockData.brief,
    };
  });
}
