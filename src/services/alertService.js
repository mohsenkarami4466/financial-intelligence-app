import mockData from '../data/mockData';
import api, { IS_MOCK_API } from '../api/axiosInstance';
import { useAppStore } from '../store/useAppStore';
import { simulateNetworkDelay, serviceCall } from './helpers';

export async function getAlerts() {
  if (IS_MOCK_API) {
    return serviceCall(async () => {
      await simulateNetworkDelay();
      const storeAlerts = useAppStore.getState().alerts;
      return storeAlerts.length ? storeAlerts : mockData.alerts;
    });
  }
  return serviceCall(async () => {
    const { data: res } = await api.get('/alerts');
    useAppStore.getState().setAlerts(res.data);
    return res.data;
  });
}

export async function addAlert(alert) {
  if (IS_MOCK_API) {
    return serviceCall(async () => {
      await simulateNetworkDelay(150);
      useAppStore.getState().addAlert(alert);
      return alert;
    });
  }
  return serviceCall(async () => {
    const { data: res } = await api.post('/alerts', alert);
    useAppStore.getState().addAlert(res.data);
    return res.data;
  });
}

export async function toggleAlert(id) {
  if (IS_MOCK_API) {
    return serviceCall(async () => {
      await simulateNetworkDelay(150);
      useAppStore.getState().toggleAlert(id);
      const updated = useAppStore.getState().alerts.find((a) => a.id === id);
      if (!updated) throw new Error('Alert not found');
      return updated;
    });
  }
  return serviceCall(async () => {
    const { data: res } = await api.patch(`/alerts/${id}/toggle`);
    useAppStore.getState().setAlerts(
      useAppStore.getState().alerts.map((a) =>
        String(a.id) === String(id) ? res.data : a
      )
    );
    return res.data;
  });
}
