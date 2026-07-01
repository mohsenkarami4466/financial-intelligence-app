/**
 * شبیه‌سازی تأخیر شبکه برای توسعه
 * @param {number} ms
 */
export function simulateNetworkDelay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @template T
 * @param {() => Promise<T>} fn
 * @returns {Promise<{ data: T | null, error: string | null }>}
 */
export async function serviceCall(fn) {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { data: null, error: message };
  }
}
