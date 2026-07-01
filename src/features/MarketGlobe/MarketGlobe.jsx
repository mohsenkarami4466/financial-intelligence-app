import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import marketLocations from '../../data/marketLocations';
import { useLanguage } from '../../providers/LanguageContext';
import { useAppStore, useGlobeViewMode, useMarketOpenStatus } from '../../store/useAppStore';
import { isMarketOpen } from '../../utils/marketHours';
import MarketMap2D from './MarketMap2D';
import styles from './MarketGlobe.module.css';

const CDN_EARTH_IMAGE = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
const INITIAL_VIEW = { lat: 35.7219, lng: 51.3347, altitude: 2.5 };

function createFallbackTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#1B4F72');
  gradient.addColorStop(1, '#154360');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#2ECC71';
  ctx.beginPath(); ctx.ellipse(200, 150, 90, 70, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(260, 330, 50, 80, 0.3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(500, 120, 70, 50, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(500, 300, 60, 100, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(700, 160, 110, 80, -0.1, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(820, 380, 35, 40, 0, 0, Math.PI * 2); ctx.fill();
  return canvas.toDataURL();
}

export default function MarketGlobe({ onClose }) {
  const globeEl = useRef(null);
  const globeInstance = useRef(null);
  const { language } = useLanguage();
  const viewMode = useGlobeViewMode();
  const setGlobeViewMode = useAppStore((s) => s.setGlobeViewMode);
  const marketOpenStatus = useMarketOpenStatus();
  const refreshMarketOpenStatus = useAppStore((s) => s.refreshMarketOpenStatus);

  const [selectedMarket, setSelectedMarket] = useState(null);
  const [alertMinutes, setAlertMinutes] = useState(30);
  const [indexAlert, setIndexAlert] = useState('');
  const [indexThreshold, setIndexThreshold] = useState('');
  const [textureSrc, setTextureSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMarkets, setFilteredMarkets] = useState([]);

  // به‌روزرسانی کش وضعیت بازار هر دقیقه
  useEffect(() => {
    refreshMarketOpenStatus();
    const interval = setInterval(refreshMarketOpenStatus, 60_000);
    return () => clearInterval(interval);
  }, [refreshMarketOpenStatus]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setTextureSrc(CDN_EARTH_IMAGE);
    img.onerror = () => setTextureSrc(createFallbackTexture());
    img.src = CDN_EARTH_IMAGE;
  }, []);

  useEffect(() => {
    if (viewMode !== '3d' || !globeEl.current || !textureSrc) return;

    if (globeInstance.current) {
      globeInstance.current._destructor();
      globeInstance.current = null;
    }

    const globe = Globe()(globeEl.current)
      .globeImageUrl(textureSrc)
      .backgroundImageUrl(null)
      .bumpImageUrl(null)
      .width(globeEl.current.clientWidth)
      .height(globeEl.current.clientHeight)
      .pointsData(marketLocations)
      .pointLat('lat')
      .pointLng('lng')
      .pointColor((d) => (marketOpenStatus[d.id] ? '#2ecc71' : '#e74c3c'))
      .pointRadius(0.25)
      .pointResolution(6)
      .pointAltitude(0.01)
      .onPointClick((d) => setSelectedMarket(d))
      .onGlobeReady(() => {
        setIsLoaded(true);
        globe.pointOfView(INITIAL_VIEW, 1000);
      });

    globe.controls().autoRotate = autoRotate;
    globe.controls().autoRotateSpeed = 0.8;
    globe.controls().enableZoom = true;
    globeInstance.current = globe;

    const handleResize = () => {
      if (globeEl.current && globeInstance.current) {
        globeInstance.current.width(globeEl.current.clientWidth);
        globeInstance.current.height(globeEl.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (globeInstance.current) {
        globeInstance.current._destructor();
        globeInstance.current = null;
      }
    };
  }, [textureSrc, viewMode, marketOpenStatus]);

  useEffect(() => {
    if (globeInstance.current) {
      globeInstance.current.controls().autoRotate = autoRotate;
    }
  }, [autoRotate]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredMarkets([]);
      return;
    }
    const filtered = marketLocations.filter(
      (m) =>
        m.name.toLowerCase().includes(term.toLowerCase()) ||
        m.shortName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMarkets(filtered);
  };

  const flyToMarket = (market) => {
    if (viewMode === '3d' && globeInstance.current) {
      globeInstance.current.pointOfView({ lat: market.lat, lng: market.lng, altitude: 1.2 }, 1000);
    }
    setSelectedMarket(market);
    setSearchTerm('');
    setFilteredMarkets([]);
    setShowSettings(false);
  };

  const resetView = () => {
    if (globeInstance.current) {
      globeInstance.current.pointOfView(INITIAL_VIEW, 1000);
    }
    setShowSettings(false);
  };

  const toggleViewMode = () => {
    setGlobeViewMode(viewMode === '3d' ? '2d' : '3d');
    setIsLoaded(viewMode === '3d');
  };

  const handleSaveAlert = () => {
    if (!selectedMarket) return;
    localStorage.setItem(
      `alert_${selectedMarket.id}`,
      JSON.stringify({ minutesBefore: alertMinutes, index: indexAlert, threshold: indexThreshold })
    );
    setSelectedMarket(null);
    alert(language === 'fa' ? 'تنظیمات ذخیره شد' : 'Alert settings saved');
  };

  const t = {
    open: language === 'fa' ? 'باز' : 'Open',
    closed: language === 'fa' ? 'بسته' : 'Closed',
    alertBefore: language === 'fa' ? 'هشدار قبل از باز شدن' : 'Alert before open',
    minutes: language === 'fa' ? 'دقیقه' : 'min',
    indexAlert: language === 'fa' ? 'شاخص' : 'Index',
    threshold: language === 'fa' ? 'آستانه' : 'Threshold',
    save: language === 'fa' ? 'ذخیره' : 'Save',
    close: language === 'fa' ? 'بستن' : 'Close',
    exit: language === 'fa' ? 'خروج' : 'Exit',
    settings: language === 'fa' ? 'تنظیمات' : 'Settings',
    searchPlaceholder: language === 'fa' ? 'جستجوی بازار...' : 'Search market...',
    autoRotateLabel: language === 'fa' ? 'چرخش خودکار' : 'Auto-rotate',
    resetView: language === 'fa' ? 'بازنشانی نما' : 'Reset view',
    view3d: language === 'fa' ? 'کره ۳D' : '3D Globe',
    view2d: language === 'fa' ? 'نقشه ۲D' : '2D Map',
  };

  const selectedOpen = selectedMarket
    ? (marketOpenStatus[selectedMarket.id] ?? isMarketOpen(selectedMarket))
    : false;

  return (
    <div className={styles.fullscreen}>
      <div className={styles.controls}>
        <button type="button" className={styles.controlBtn} onClick={toggleViewMode}>
          {viewMode === '3d' ? `🗺️ ${t.view2d}` : `🌍 ${t.view3d}`}
        </button>
        <button type="button" className={styles.controlBtn} onClick={() => setShowSettings(!showSettings)}>
          ⚙️ {t.settings}
        </button>
        {showSettings && (
          <div className={styles.settingsPanel}>
            {viewMode === '3d' && (
              <div className={styles.settingsRow}>
                <label>
                  <input type="checkbox" checked={autoRotate} onChange={() => setAutoRotate((p) => !p)} />
                  {t.autoRotateLabel}
                </label>
              </div>
            )}
            <div className={styles.settingsRow}>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className={styles.searchInput}
              />
              {filteredMarkets.length > 0 && (
                <ul className={styles.searchResults}>
                  {filteredMarkets.map((m) => (
                    <li key={m.id} onClick={() => flyToMarket(m)}>
                      {m.shortName} - {m.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {viewMode === '3d' && (
              <button type="button" className={styles.settingsBtn} onClick={resetView}>
                {t.resetView}
              </button>
            )}
            <button type="button" className={styles.settingsBtn} onClick={onClose}>
              ✕ {t.exit}
            </button>
          </div>
        )}
      </div>

      {viewMode === '3d' ? (
        <>
          <div ref={globeEl} className={styles.globeCanvas} />
          {!isLoaded && (
            <div className={styles.loading}>
              {language === 'fa' ? 'در حال بارگذاری کره...' : 'Loading globe...'}
            </div>
          )}
        </>
      ) : (
        <MarketMap2D
          selectedId={selectedMarket?.id}
          onSelectMarket={setSelectedMarket}
        />
      )}

      {selectedMarket && (
        <div className={styles.popup}>
          <h3>
            {selectedMarket.shortName} - {selectedMarket.name}
          </h3>
          <p style={{ color: selectedOpen ? '#2ecc71' : '#e74c3c' }}>
            {selectedOpen ? t.open : t.closed}
          </p>
          <div className={styles.alertForm}>
            <label>
              {t.alertBefore}:
              <input
                type="number"
                value={alertMinutes}
                onChange={(e) => setAlertMinutes(e.target.value)}
                min="5"
                max="120"
              />{' '}
              {t.minutes}
            </label>
            <label>
              {t.indexAlert}:
              <select value={indexAlert} onChange={(e) => setIndexAlert(e.target.value)}>
                <option value="">--</option>
                {selectedMarket.indices.map((idx) => (
                  <option key={idx} value={idx}>
                    {idx}
                  </option>
                ))}
              </select>
            </label>
            {indexAlert && (
              <label>
                {t.threshold}:
                <input
                  type="text"
                  value={indexThreshold}
                  onChange={(e) => setIndexThreshold(e.target.value)}
                  placeholder="> 4200"
                />
              </label>
            )}
            <div className={styles.popupActions}>
              <button type="button" onClick={handleSaveAlert}>{t.save}</button>
              <button type="button" onClick={() => setSelectedMarket(null)}>{t.close}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
