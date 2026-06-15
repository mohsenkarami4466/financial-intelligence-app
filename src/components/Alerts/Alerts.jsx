import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../i18n/translations';
import styles from './Alerts.module.css';

export default function Alerts() {
  const { language } = useLanguage();
  const t = translations[language].alerts;

  // هشدارهای نمونه
  const alerts = [
    {
      id: 1,
      type: 'price',
      message: language === 'fa' ? 'طلا به زیر ۱۹۰۰ دلار سقوط کرد' : 'Gold dropped below $1900',
      active: true,
    },
    {
      id: 2,
      type: 'news',
      message: language === 'fa' ? 'اخبار مقررات ارز دیجیتال بر بازار تأثیر گذاشت' : 'Crypto regulation news impacting market',
      active: true,
    },
    {
      id: 3,
      type: 'movement',
      message: language === 'fa' ? 'نرخ دلار/تومان ۳٪ در ۲۴ ساعت تغییر کرد' : 'USD/IRR moved +3% in 24h',
      active: false,
    },
  ];

  return (
    <div className={styles.alerts}>
      <h2 className={styles.title}>{t.title}</h2>
      <p className={styles.subtitle}>{t.subtitle}</p>

      <div className={styles.alertList}>
        {alerts.map(alert => (
          <div key={alert.id} className={`${styles.alertCard} ${alert.active ? styles.active : styles.inactive}`}>
            <div className={styles.alertInfo}>
              <span className={styles.alertType}>
                {alert.type === 'price' ? '💰' : alert.type === 'news' ? '📰' : '📊'}
              </span>
              <p className={styles.alertMessage}>{alert.message}</p>
            </div>
            <label className={styles.toggle}>
              <input type="checkbox" defaultChecked={alert.active} />
              <span className={styles.slider}></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}