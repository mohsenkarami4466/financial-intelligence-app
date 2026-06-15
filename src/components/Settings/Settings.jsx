import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserPreferences } from '../../contexts/UserPreferencesContext';
import translations from '../../i18n/translations';
import styles from './Settings.module.css';

export default function Settings() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { preferences, updatePreferences } = useUserPreferences();
  const t = translations[language].settings;

  const interestsList = ['USD', 'Gold', 'Crypto', 'Stocks', 'Economic News'];

  const toggleInterest = (item) => {
    const current = preferences.interests;
    const newInterests = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    updatePreferences({ interests: newInterests });
  };

  const setNotificationLevel = (level) => {
    updatePreferences({ notificationLevel: level });
  };

  const resetOnboarding = () => {
    localStorage.removeItem('fi_onboarded');
    window.location.reload();
  };

  return (
    <div className={styles.settings}>
      <h2 className={styles.title}>{t.title}</h2>

      <div className={styles.section}>
        <h3>{t.interests || (language === 'fa' ? 'علایق' : 'Interests')}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
          {interestsList.map(item => (
            <button
              key={item}
              className={`${styles.interestBtn} ${preferences.interests.includes(item) ? styles.selectedInterest : ''}`}
              onClick={() => toggleInterest(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3>{t.notifications}</h3>
        <label className={styles.toggleRow}>
          <span>{t.importantOnly}</span>
          <input
            type="radio"
            name="notif"
            checked={preferences.notificationLevel === 'important'}
            onChange={() => setNotificationLevel('important')}
          />
        </label>
        <label className={styles.toggleRow}>
          <span>{t.dailySummary}</span>
          <input
            type="radio"
            name="notif"
            checked={preferences.notificationLevel === 'daily'}
            onChange={() => setNotificationLevel('daily')}
          />
        </label>
        <label className={styles.toggleRow}>
          <span>{t.realTime}</span>
          <input
            type="radio"
            name="notif"
            checked={preferences.notificationLevel === 'realtime'}
            onChange={() => setNotificationLevel('realtime')}
          />
        </label>
      </div>

      <div className={styles.section}>
        <h3>{t.language}</h3>
        <button className={styles.btn} onClick={toggleLanguage}>
          {language === 'fa' ? 'English' : 'فارسی'}
        </button>
      </div>

      <div className={styles.section}>
        <h3>{t.appearance}</h3>
        <button className={styles.btn} onClick={toggleTheme}>
          {theme === 'light' ? t.darkMode : t.lightMode}
        </button>
      </div>

      <div className={styles.section}>
        <h3>{t.resetOnboarding}</h3>
        <p className={styles.note}>{t.resetOnboardingDesc}</p>
        <button className={styles.btn} onClick={resetOnboarding}>
          {t.reset}
        </button>
      </div>

      <div className={styles.section}>
        <h3>{t.privacy}</h3>
        <p className={styles.note}>{t.privacyNote}</p>
      </div>
    </div>
  );
}