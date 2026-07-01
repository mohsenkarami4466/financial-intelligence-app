import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePreferences, useAlerts } from '../../store/useAppStore';
import { getMarketData } from '../../services/marketService';
import { unwrapService } from '../../providers/QueryProvider';
import translations from '../../i18n/translations';
import LoadingSkeleton, { ErrorMessage } from '../ui/QueryState';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { language } = useLanguage();
  const preferences = usePreferences();
  const alerts = useAlerts();
  const t = translations[language].dashboard;
  const { interests } = preferences;

  const {
    data: marketData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['marketData'],
    queryFn: () => unwrapService(getMarketData()),
  });

  if (isLoading) return <LoadingSkeleton variant="page" />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;
  if (!marketData) return null;

  const { assets, market, keyEvent, brief } = marketData;

  const userAssetNames = interests.map((i) => (i === 'Economic News' ? null : i)).filter(Boolean);
  const filteredAssets = assets.filter((asset) => {
    if (userAssetNames.length === 0) return true;
    return userAssetNames.some((name) => asset.name.includes(name));
  });

  const filteredMarkets = market.filter((m) => {
    if (interests.includes('USD') && m.name === 'USD/IRR') return true;
    if (interests.includes('Gold') && m.name === 'Gold (XAU)') return true;
    if (interests.includes('Crypto') && (m.name === 'Bitcoin' || m.name === 'Ethereum')) return true;
    if (interests.includes('Stocks') && m.name === 'S&P 500') return true;
    if (interests.includes('Economic News')) return true;
    return false;
  });

  const relevantAlerts = alerts.filter(
    (alert) => alert.active && filteredAssets.some((a) => a.id === alert.assetId)
  );

  const relevantBrief = brief.filter((point) => {
    if (point.relatedAssets.length === 0) return true;
    return point.relatedAssets.some((rel) => filteredAssets.some((a) => a.name.includes(rel)));
  });

  const greeting = language === 'fa' ? 'روز بخیر' : 'Good day';

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h2 className={styles.greeting}>{greeting}</h2>
        <p className={styles.date}>
          {new Date().toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </header>

      <div className={styles.quickStatus}>
        <h3>{t.quickStatus || (language === 'fa' ? 'خلاصه وضعیت' : 'Quick Status')}</h3>
        <div className={styles.assetCards}>
          {filteredAssets.map((asset) => (
            <div key={asset.id} className={styles.assetCard}>
              <span className={styles.assetName}>{asset.name}</span>
              <span className={styles.assetPrice}>{asset.price.toLocaleString()}</span>
              <span className={asset.change >= 0 ? styles.green : styles.red}>
                {asset.change > 0 ? '+' : ''}
                {asset.change}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.keyEvent}>
        <h3>{t.keyEventTitle}</h3>
        <p className={styles.eventTitle}>{keyEvent.title}</p>
        <p className={styles.eventSummary}>{keyEvent.summary}</p>
      </div>

      {filteredMarkets.length > 0 && (
        <div className={styles.marketOverview}>
          <h3>{t.marketOverview}</h3>
          {filteredMarkets.map((item) => (
            <div key={item.name} className={styles.marketItem}>
              <span>{item.name}</span>
              <span className={item.trend === 'up' ? styles.green : styles.red}>
                {item.trend === 'up' ? '▲' : '▼'} {item.value}%
              </span>
            </div>
          ))}
        </div>
      )}

      {relevantAlerts.length > 0 && (
        <div className={styles.alertsPreview}>
          <h3>{t.alertsSection}</h3>
          {relevantAlerts.map((alert) => (
            <div key={alert.id} className={styles.alertRow}>
              <span className={styles.alertIcon}>⚠️</span>
              <span>{alert.message}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.dailyBrief}>
        <h3>{t.dailyBrief}</h3>
        <ul className={styles.briefList}>
          {relevantBrief.map((point, idx) => (
            <li key={idx}>{point.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
