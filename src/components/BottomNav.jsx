import { useLanguage } from '../contexts/LanguageContext';
import styles from './BottomNav.module.css';

const tabs = ['dashboard', 'alerts', 'assets', 'markets', 'settings'];
const icons = {
  dashboard: '🏠',
  alerts: '🔔',
  assets: '💰',
  markets: '🌍',
  settings: '⚙️'
};

export default function BottomNav({ current, onNavigate }) {
  const { language } = useLanguage();
  const labels = {
    dashboard: language === 'fa' ? 'خانه' : 'Home',
    alerts: language === 'fa' ? 'هشدارها' : 'Alerts',
    assets: language === 'fa' ? 'دارایی‌ها' : 'Assets',
    markets: language === 'fa' ? 'بازارها' : 'Markets',
    settings: language === 'fa' ? 'تنظیمات' : 'Settings'
  };

  return (
    <nav className={styles.bottomNav}>
      {tabs.map(tab => (
        <button
          key={tab}
          className={`${styles.navItem} ${current === tab ? styles.active : ''}`}
          onClick={() => onNavigate(tab)}
        >
          <span className={styles.icon}>{icons[tab]}</span>
          <span className={styles.label}>{labels[tab]}</span>
        </button>
      ))}
    </nav>
  );
}