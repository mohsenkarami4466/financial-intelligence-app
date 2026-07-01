import mockData from '../data/mockData';
import api, { IS_MOCK_API } from '../api/axiosInstance';
import { simulateNetworkDelay, serviceCall } from './helpers';

async function mockGetMarketData() {
  await simulateNetworkDelay();
  return {
    assets: mockData.assets,
    market: mockData.market,
    keyEvent: mockData.keyEvent,
    brief: mockData.brief,
  };
}

export async function getSummary() {
  if (IS_MOCK_API) {
    return serviceCall(async () => {
      const data = await mockGetMarketData();
      return { assets: data.assets, market: data.market };
    });
  }
  return serviceCall(async () => {
    const { data: res } = await api.get('/market/summary');
    return res.data;
  });
}

export async function getEvents() {
  if (IS_MOCK_API) {
    return serviceCall(async () => {
      await simulateNetworkDelay();
      return mockData.keyEvent;
    });
  }
  return serviceCall(async () => {
    const { data: res } = await api.get('/market/events');
    return res.data;
  });
}

export async function getBrief() {
  if (IS_MOCK_API) {
    return serviceCall(async () => {
      await simulateNetworkDelay();
      return mockData.brief;
    });
  }
  return serviceCall(async () => {
    const { data: res } = await api.get('/market/brief');
    return res.data;
  });
}

export async function getMarketData() {
  if (IS_MOCK_API) {
    return serviceCall(mockGetMarketData);
  }
  return serviceCall(async () => {
    const { data: res } = await api.get('/market/all');
    return res.data;
  });
}
