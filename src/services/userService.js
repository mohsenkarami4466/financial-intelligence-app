import api, { IS_MOCK_API } from '../api/axiosInstance';
import { useAppStore } from '../store/useAppStore';
import { simulateNetworkDelay, serviceCall } from './helpers';

export async function getPreferences() {
  if (IS_MOCK_API) {
    return serviceCall(async () => {
      await simulateNetworkDelay(100);
      return useAppStore.getState().preferences;
    });
  }
  return serviceCall(async () => {
    const { data: res } = await api.get('/user/preferences');
    useAppStore.getState().updatePreferences(res.data);
    return res.data;
  });
}

export async function updatePreferences(prefs) {
  if (IS_MOCK_API) {
    return serviceCall(async () => {
      await simulateNetworkDelay(100);
      useAppStore.getState().updatePreferences(prefs);
      return useAppStore.getState().preferences;
    });
  }
  return serviceCall(async () => {
    const { data: res } = await api.put('/user/preferences', prefs);
    useAppStore.getState().updatePreferences(res.data);
    return res.data;
  });
}
