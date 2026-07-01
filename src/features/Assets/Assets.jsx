import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../providers/LanguageContext';
import { usePreferences } from '../../store/useAppStore';
import { getSummary } from '../../services/marketService';
import { unwrapService } from '../../providers/QueryProvider';
import translations from '../../i18n/translations';
import LoadingSkeleton, { ErrorMessage } from '../../components/ui/QueryState';
import styles from './Assets.module.css';

export default function Assets() {
  const { language } = useLanguage();
  const preferences = usePreferences();
  const t = translations[language].assets;
  const [customAssets, setCustomAssets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('other');

  const { data: summary, isLoading, error, refetch } = useQuery({
    queryKey: ['marketSummary'],
    queryFn: () => unwrapService(getSummary()),
  });

  if (isLoading) return <LoadingSkeleton variant="cards" />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;

  const baseAssets = (summary?.assets ?? []).filter((asset) => {
    if (preferences.interests.length === 0) return true;
    return preferences.interests.some((interest) => asset.name.includes(interest));
  });

  const allAssets = [...baseAssets, ...customAssets];

  const addCustomAsset = () => {
    if (!name || !price) return;
    const newAsset = {
      id: 'custom_' + Date.now(),
      name,
      type,
      price: parseFloat(price),
      change: 0,
      history: [parseFloat(price)],
    };
    setCustomAssets([...customAssets, newAsset]);
    setName('');
    setPrice('');
    setShowForm(false);
  };

  return (
    <div className={styles.assets}>
      <h2 className={styles.title}>{t.title}</h2>
      <button className={styles.addBtn} onClick={() => setShowForm(!showForm)}>
        {language === 'fa' ? '+ افزودن دارایی' : '+ Add Asset'}
      </button>

      {showForm && (
        <div className={styles.form}>
          <input
            placeholder={language === 'fa' ? 'نام دارایی' : 'Asset name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder={language === 'fa' ? 'قیمت' : 'Price'}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="stock">{language === 'fa' ? 'سهام' : 'Stock'}</option>
            <option value="crypto">{language === 'fa' ? 'ارز دیجیتال' : 'Crypto'}</option>
            <option value="commodity">{language === 'fa' ? 'کالا' : 'Commodity'}</option>
            <option value="currency">{language === 'fa' ? 'ارز' : 'Currency'}</option>
            <option value="other">{language === 'fa' ? 'سایر' : 'Other'}</option>
          </select>
          <button onClick={addCustomAsset}>{language === 'fa' ? 'افزودن' : 'Add'}</button>
        </div>
      )}

      <div className={styles.assetList}>
        {allAssets.map((asset) => (
          <div key={asset.id} className={styles.assetCard}>
            <div>
              <h3>{asset.name}</h3>
              <span className={styles.type}>{asset.type}</span>
            </div>
            <div className={styles.price}>{asset.price.toLocaleString()}</div>
            <div className={asset.change >= 0 ? styles.green : styles.red}>
              {asset.change > 0 ? '+' : ''}
              {asset.change}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
