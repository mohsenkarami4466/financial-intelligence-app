import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../i18n/translations';
import mockData from '../../data/mockData';
import styles from './Assets.module.css';

export default function Assets() {
  const { language } = useLanguage();
  const t = translations[language].assets;
  const assets = mockData.assets;

  return (
    <div className={styles.assets}>
      <h2 className={styles.title}>{t.title}</h2>
      <p className={styles.subtitle}>{t.subtitle}</p>

      <div className={styles.assetList}>
        {assets.map(asset => (
          <div key={asset.name} className={styles.assetCard}>
            <div className={styles.assetInfo}>
              <span className={styles.assetIcon}>
                {asset.name === 'Gold' ? '🟡' : 
                 asset.name === 'USD' ? '💵' : 
                 asset.name === 'Crypto' ? '₿' : '📈'}
              </span>
              <div>
                <h3 className={styles.assetName}>{asset.name}</h3>
                <p className={styles.assetChange}>
                  <span className={asset.change >= 0 ? styles.green : styles.red}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </span>
                  {' '}
                  <span className={styles.label}>{t.today}</span>
                </p>
              </div>
            </div>
            <div className={styles.assetTrend}>
              {asset.change >= 0 ? '▲' : '▼'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}