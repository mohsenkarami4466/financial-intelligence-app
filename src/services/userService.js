import { useAppStore } from '../store/useAppStore';
import { simulateNetworkDelay, serviceCall } from './helpers';

/**
 * @returns {Promise<{ data: { interests: string[], notificationLevel: string } | null, error: string | null }>}
 */
export async function getPreferences() {
  return serviceCall(async () => {
    await simulateNetworkDelay(100);
    return useAppStore.getState().preferences;
  });
}

/**
 * @param {Partial<{ interests: string[], notificationLevel: string }>} prefs
 * @returns {Promise<{ data: object | null, error: string | null }>}
 */
export async function updatePreferences(prefs) {
  return serviceCall(async () => {
    await simulateNetworkDelay(100);
    useAppStore.getState().updatePreferences(prefs);
    return useAppStore.getState().preferences;
  });
}
