import marketLocations from '../../data/marketLocations';
import { useMarketOpenStatus } from '../../store/useAppStore';
import styles from './MarketMap2D.module.css';

/** تبدیل lng/lat به مختصات SVG (Equirectangular) */
function toSvgCoords(lat, lng, width, height) {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

export default function MarketMap2D({ onSelectMarket, selectedId }) {
  const marketOpenStatus = useMarketOpenStatus();
  const W = 720;
  const H = 360;

  return (
    <div className={styles.map2d}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} role="img">
        <rect width={W} height={H} className={styles.ocean} />
        {/* قاره‌های ساده‌شده */}
        <ellipse cx="160" cy="140" rx="90" ry="70" className={styles.land} />
        <ellipse cx="200" cy="260" rx="50" ry="80" className={styles.land} />
        <ellipse cx="380" cy="120" rx="70" ry="50" className={styles.land} />
        <ellipse cx="380" cy="240" rx="60" ry="90" className={styles.land} />
        <ellipse cx="540" cy="150" rx="100" ry="75" className={styles.land} />
        <ellipse cx="620" cy="300" rx="35" ry="40" className={styles.land} />

        {marketLocations.map((m) => {
          const { x, y } = toSvgCoords(m.lat, m.lng, W, H);
          const open = marketOpenStatus[m.id];
          return (
            <circle
              key={m.id}
              cx={x}
              cy={y}
              r={selectedId === m.id ? 7 : 5}
              className={open ? styles.open : styles.closed}
              onClick={() => onSelectMarket(m)}
            />
          );
        })}
      </svg>
    </div>
  );
}
