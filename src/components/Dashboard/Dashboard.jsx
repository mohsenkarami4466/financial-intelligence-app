import { useLanguage } from '../../contexts/LanguageContext';
import { useUserPreferences } from '../../contexts/UserPreferencesContext';
import translations from '../../i18n/translations';
import mockData from '../../data/mockData';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { language } = useLanguage();
  const { preferences } = useUserPreferences();
  const t = translations[language].dashboard;
  const { interests, notificationLevel } = preferences;

  // فیلتر دارایی‌ها بر اساس علایق (اگر شامل "Stocks"، "Crypto" و غیره باشد)
  const filteredAssets = mockData.assets.filter(asset =>
    interests.includes(asset.name) || interests.includes('Economic News') // Economic News همه را نشان دهد
  );

  // برای نمایش ساده، بازارهای مرتبط
  const filteredMarkets = mockData.market.filter(m => {
    if (interests.includes('USD') && m.name === 'USD/IRR') return true;
    if (interests.includes('Gold') && m.name === 'Gold (XAU)') return true;
    if (interests.includes('Crypto') && m.name === 'BTC') return true;
    if (interests.includes('Stocks') && m.name === 'S&P 500') return true;
    return interests.includes('Economic News'); // اگر فقط Economic News باشد همه را نشان بده
  });

  // هشدارهای مرتبط (مشروط)
  const filteredAlerts = mockData.alerts.filter(alert => {
    if (interests.includes('Gold') && alert.message.toLowerCase().includes('gold')) return true;
    if (interests.includes('Crypto') && alert.message.toLowerCase().includes('crypto')) return true;
    if (interests.includes('USD') && alert.message.toLowerCase().includes('usd')) return true;
    if (interests.includes('Stocks') && alert.message.toLowerCase().includes('stock')) return true;
    return interests.includes('Economic News');
  });

  // خلاصه روزانه را می‌توان بر اساس علایق شخصی‌سازی کرد (در mockData فعلاً ثابت)
  const briefPoints = mockData.brief.filter(point => {
    if (interests.includes('Gold') && point.toLowerCase().includes('gold')) return true;
    if (interests.includes('Crypto') && point.toLowerCase().includes('bitcoin')) return true;
    if (interests.includes('USD') && point.toLowerCase().includes('dollar')) return true;
    if (interests.includes('Stocks') && point.toLowerCase().includes('stock')) return true;
    return true; // سایر موارد را هم نشان بده
  });

  // درود متناسب با سطح هشدار (اختیاری)
  const greetingMessage = t.greeting; // می‌توان پیام متفاوتی داد

  return (
    <div className={styles.dashboard}>
      <div className={styles.quickStatus}>
        <h2>{greetingMessage}</h2>
        <div className={styles.assetSummary}>
          {filteredAssets.map(asset => (
            <span key={asset.name} className={asset.change > 0 ? styles.green : styles.red}>
              {asset.name}: {asset.change > 0 ? '+' : ''}{asset.change}%
            </span>
          ))}
        </div>
      </div>

      <div className={styles.keyEvent}>
        <h3>{t.keyEventTitle}</h3>
        <p>{mockData.keyEvent}</p>
      </div>

      {filteredMarkets.length > 0 && (
        <div className={styles.marketOverview}>
          <h3>{t.marketOverview}</h3>
          {filteredMarkets.map(item => (
            <div key={item.name} className={styles.marketItem}>
              <span>{item.name}</span>
              <span className={item.trend === 'up' ? styles.green : styles.red}>
                {item.trend === 'up' ? '▲' : '▼'} {item.value}%
              </span>
            </div>
          ))}
        </div>
      )}

      {filteredAlerts.length > 0 && (
        <div className={styles.alertsPreview}>
          <h3>{t.alertsSection}</h3>
          {filteredAlerts.slice(0,2).map((alert, i) => (
            <div key={i} className={styles.alertRow}>{alert.message}</div>
          ))}
        </div>
      )}

      <div className={styles.dailyBrief}>
        <h3>{t.dailyBrief}</h3>
        <ul>
          {briefPoints.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>
    </div>
  );
}