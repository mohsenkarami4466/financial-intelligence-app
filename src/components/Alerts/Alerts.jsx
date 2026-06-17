import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../i18n/translations';
import mockData from '../../data/mockData';
import styles from './Alerts.module.css';

export default function Alerts() {
  const { language } = useLanguage();
  const t = translations[language].alerts;
  const [alerts, setAlerts] = useState(mockData.alerts);
  const [newAlert, setNewAlert] = useState({ assetId: '', condition: 'above', value: '' });

  const toggleActive = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const addAlert = () => {
    if (!newAlert.assetId || !newAlert.value) return;
    const asset = mockData.assets.find(a => a.id === newAlert.assetId);
    const alertObj = {
      id: Date.now(),
      type: 'price',
      assetId: newAlert.assetId,
      condition: newAlert.condition,
      value: parseFloat(newAlert.value),
      active: true,
      message: `${asset.name} ${newAlert.condition === 'above' ? '>' : '<'} ${newAlert.value}`,
    };
    setAlerts([...alerts, alertObj]);
    setNewAlert({ assetId: '', condition: 'above', value: '' });
  };

  return (
    <div className={styles.alerts}>
      <h2 className={styles.title}>{t.title}</h2>

      <div className={styles.addSection}>
        <h3>{language === 'fa' ? 'هشدار جدید' : 'New Alert'}</h3>
        <div className={styles.addForm}>
          <select value={newAlert.assetId} onChange={e => setNewAlert({ ...newAlert, assetId: e.target.value })}>
            <option value="">{language === 'fa' ? 'انتخاب دارایی' : 'Select asset'}</option>
            {mockData.assets.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <select value={newAlert.condition} onChange={e => setNewAlert({ ...newAlert, condition: e.target.value })}>
            <option value="above">{language === 'fa' ? 'بالاتر از' : 'Above'}</option>
            <option value="below">{language === 'fa' ? 'پایین‌تر از' : 'Below'}</option>
          </select>
          <input type="number" placeholder={language === 'fa' ? 'مقدار' : 'Value'} value={newAlert.value} onChange={e => setNewAlert({ ...newAlert, value: e.target.value })} />
          <button onClick={addAlert}>{language === 'fa' ? 'افزودن' : 'Add'}</button>
        </div>
      </div>

      <div className={styles.alertList}>
        {alerts.map(alert => (
          <div key={alert.id} className={`${styles.alertCard} ${alert.active ? styles.active : styles.inactive}`}>
            <div>
              <span className={styles.alertIcon}>{alert.type === 'price' ? '💰' : '📊'}</span>
              <span>{alert.message}</span>
            </div>
            <label className={styles.toggle}>
              <input type="checkbox" checked={alert.active} onChange={() => toggleActive(alert.id)} />
              <span className={styles.slider}></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}