import styles from './Sparkline.module.css';

/**
 * مینی‌چارت canvas ساده برای نمایش history قیمت
 * @param {{ history: number[], positive?: boolean }} props
 */
export default function Sparkline({ history = [], positive = true }) {
  if (!history.length) return null;

  const min = Math.min(...history);
  const max = Math.max(...history);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pad = 2;

  const points = history
    .map((v, i) => {
      const x = pad + (i / (history.length - 1 || 1)) * (w - pad * 2);
      const y = pad + (1 - (v - min) / range) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(' ');

  const color = positive ? '#2ecc71' : '#e74c3c';

  return (
    <svg className={styles.sparkline} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
    </svg>
  );
}
