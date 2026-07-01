import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../providers/LanguageContext';
import styles from './BottomNav.module.css';

const tabs = [
  { id: 'dashboard', path: '/dashboard' },
  { id: 'alerts', path: '/alerts' },
  { id: 'assets', path: '/assets' },
  { id: 'markets', path: '/markets' },
  { id: 'settings', path: '/settings' },
];

const icons = {
  dashboard: '🏠',
  alerts: '🔔',
  assets: '💰',
  markets: '🌍',
  settings: '⚙️',
};

export default function BottomNav() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const labels = {
    dashboard: language === 'fa' ? 'خانه' : 'Home',
    alerts: language === 'fa' ? 'هشدارها' : 'Alerts',
    assets: language === 'fa' ? 'دارایی‌ها' : 'Assets',
    markets: language === 'fa' ? 'بازارها' : 'Markets',
    settings: language === 'fa' ? 'تنظیمات' : 'Settings',
  };

  return (
    <nav className={styles.bottomNav}>
      {tabs.map(({ id, path }) => (
        <NavLink
          key={id}
          to={path}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
          // markets خارج از MainLayout است؛ NavLink فقط هنگام باز بودن active می‌شود
          onClick={(e) => {
            if (id === 'markets') {
              e.preventDefault();
              navigate('/markets');
            }
          }}
        >
          <span className={styles.icon}>{icons[id]}</span>
          <span className={styles.label}>{labels[id]}</span>
        </NavLink>
      ))}
    </nav>
  );
}
