import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import mockData from '../data/mockData';
import marketLocations from '../data/marketLocations';
import { computeMarketOpenStatus } from '../utils/marketHours';

const defaultPreferences = {
  interests: ['USD', 'Gold', 'Crypto', 'Stocks', 'Economic News'],
  notificationLevel: 'important',
};

/** خواندن ترجیحات legacy از localStorage (قبل از Zustand) */
function loadLegacyPreferences() {
  try {
    const saved = localStorage.getItem('fi_preferences');
    if (saved) return JSON.parse(saved);
  } catch {
    /* نادیده */
  }
  return defaultPreferences;
}

/**
 * فروشگاه مرکزی اپلیکیشن
 * - preferences: علایق و سطح اعلان (persist)
 * - alerts: هشدارهای قیمتی (persist)
 * - marketData: خلاصه بازار، رویدادها، brief (موقت از mock)
 */
export const useAppStore = create(
  persist(
    (set) => ({
      preferences: loadLegacyPreferences(),
      alerts: mockData.alerts,
      marketData: {
        assets: mockData.assets,
        market: mockData.market,
        keyEvent: mockData.keyEvent,
        brief: mockData.brief,
      },

      updatePreferences: (newPrefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPrefs },
        })),

      setAlerts: (alerts) => set({ alerts }),

      toggleAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === id ? { ...a, active: !a.active } : a
          ),
        })),

      addAlert: (alert) =>
        set((state) => ({
          alerts: [...state.alerts, alert],
        })),

      setMarketData: (marketData) => set({ marketData }),

      /** وضعیت باز/بسته بازارها – کش در حافظه (بدون persist) */
      marketOpenStatus: computeMarketOpenStatus(marketLocations),
      lastMarketStatusUpdate: Date.now(),
      globeViewMode: '3d',

      refreshMarketOpenStatus: () =>
        set({
          marketOpenStatus: computeMarketOpenStatus(marketLocations),
          lastMarketStatusUpdate: Date.now(),
        }),

      setGlobeViewMode: (mode) => set({ globeViewMode: mode }),
    }),
    {
      name: 'fi_app_store',
      partialize: (state) => ({
        preferences: state.preferences,
        alerts: state.alerts,
      }),
    }
  )
);

/** selectorهای پرکاربرد */
export const usePreferences = () => useAppStore((s) => s.preferences);
export const useUpdatePreferences = () => useAppStore((s) => s.updatePreferences);
export const useAlerts = () => useAppStore((s) => s.alerts);
export const useMarketData = () => useAppStore((s) => s.marketData);
export const useMarketOpenStatus = () => useAppStore((s) => s.marketOpenStatus);
export const useGlobeViewMode = () => useAppStore((s) => s.globeViewMode);
