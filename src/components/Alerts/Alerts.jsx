import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../i18n/translations';
import { getAlerts, addAlert, toggleAlert } from '../../services/alertService';
import { getSummary } from '../../services/marketService';
import { unwrapService } from '../../providers/QueryProvider';
import LoadingSkeleton, { ErrorMessage } from '../ui/QueryState';
import styles from './Alerts.module.css';

export default function Alerts() {
  const { language } = useLanguage();
  const t = translations[language].alerts;
  const queryClient = useQueryClient();
  const [newAlert, setNewAlert] = useState({ assetId: '', condition: 'above', value: '' });

  const {
    data: alerts,
    isLoading: alertsLoading,
    error: alertsError,
    refetch: refetchAlerts,
  } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => unwrapService(getAlerts()),
  });

  const { data: summary } = useQuery({
    queryKey: ['marketSummary'],
    queryFn: () => unwrapService(getSummary()),
  });

  const addMutation = useMutation({
    mutationFn: (alert) => unwrapService(addAlert(alert)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id) => unwrapService(toggleAlert(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] }),
  });

  const handleAddAlert = () => {
    if (!newAlert.assetId || !newAlert.value || !summary) return;
    const asset = summary.assets.find((a) => a.id === newAlert.assetId);
    if (!asset) return;

    const alertObj = {
      id: Date.now(),
      type: 'price',
      assetId: newAlert.assetId,
      condition: newAlert.condition,
      value: parseFloat(newAlert.value),
      active: true,
      message: `${asset.name} ${newAlert.condition === 'above' ? '>' : '<'} ${newAlert.value}`,
    };
    addMutation.mutate(alertObj);
    setNewAlert({ assetId: '', condition: 'above', value: '' });
  };

  if (alertsLoading) return <LoadingSkeleton variant="list" />;
  if (alertsError) return <ErrorMessage message={alertsError.message} onRetry={refetchAlerts} />;

  const assets = summary?.assets ?? [];

  return (
    <div className={styles.alerts}>
      <h2 className={styles.title}>{t.title}</h2>

      <div className={styles.addSection}>
        <h3>{language === 'fa' ? 'هشدار جدید' : 'New Alert'}</h3>
        <div className={styles.addForm}>
          <select
            value={newAlert.assetId}
            onChange={(e) => setNewAlert({ ...newAlert, assetId: e.target.value })}
          >
            <option value="">{language === 'fa' ? 'انتخاب دارایی' : 'Select asset'}</option>
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <select
            value={newAlert.condition}
            onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
          >
            <option value="above">{language === 'fa' ? 'بالاتر از' : 'Above'}</option>
            <option value="below">{language === 'fa' ? 'پایین‌تر از' : 'Below'}</option>
          </select>
          <input
            type="number"
            placeholder={language === 'fa' ? 'مقدار' : 'Value'}
            value={newAlert.value}
            onChange={(e) => setNewAlert({ ...newAlert, value: e.target.value })}
          />
          <button onClick={handleAddAlert} disabled={addMutation.isPending}>
            {language === 'fa' ? 'افزودن' : 'Add'}
          </button>
        </div>
      </div>

      <div className={styles.alertList}>
        {(alerts ?? []).map((alert) => (
          <div
            key={alert.id}
            className={`${styles.alertCard} ${alert.active ? styles.active : styles.inactive}`}
          >
            <div>
              <span className={styles.alertIcon}>{alert.type === 'price' ? '💰' : '📊'}</span>
              <span>{alert.message}</span>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={alert.active}
                disabled={toggleMutation.isPending}
                onChange={() => toggleMutation.mutate(alert.id)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
