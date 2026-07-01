import mockData from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { simulateNetworkDelay, serviceCall } from './helpers';

/**
 * @returns {Promise<{ data: Array | null, error: string | null }>}
 */
export async function getAlerts() {
  return serviceCall(async () => {
    await simulateNetworkDelay();
    const storeAlerts = useAppStore.getState().alerts;
    return storeAlerts.length ? storeAlerts : mockData.alerts;
  });
}

/**
 * @param {object} alert
 * @returns {Promise<{ data: object | null, error: string | null }>}
 */
export async function addAlert(alert) {
  return serviceCall(async () => {
    await simulateNetworkDelay(150);
    useAppStore.getState().addAlert(alert);
    return alert;
  });
}

/**
 * @param {number|string} id
 * @returns {Promise<{ data: object | null, error: string | null }>}
 */
export async function toggleAlert(id) {
  return serviceCall(async () => {
    await simulateNetworkDelay(150);
    useAppStore.getState().toggleAlert(id);
    const updated = useAppStore.getState().alerts.find((a) => a.id === id);
    if (!updated) throw new Error('Alert not found');
    return updated;
  });
}
