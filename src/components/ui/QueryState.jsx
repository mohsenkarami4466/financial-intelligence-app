import { useLanguage } from '../../providers/LanguageContext';
import styles from './LoadingSkeleton.module.css';

export function CardSkeleton({ count = 3 }) {
  return (
    <div className={styles.skeletonGroup}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.cardSkeleton} />
      ))}
    </div>
  );
}

export function ListSkeleton({ count = 4 }) {
  return (
    <div className={styles.skeletonGroup}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.lineSkeleton} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className={styles.pageSkeleton}>
      <div className={styles.titleSkeleton} />
      <CardSkeleton count={2} />
      <ListSkeleton count={3} />
    </div>
  );
}

export default function LoadingSkeleton({ variant = 'page' }) {
  if (variant === 'cards') return <CardSkeleton />;
  if (variant === 'list') return <ListSkeleton />;
  return <PageSkeleton />;
}

export function ErrorMessage({ message, onRetry }) {
  const { language } = useLanguage();
  const defaultMsg = language === 'fa' ? 'خطا در بارگذاری داده‌ها' : 'Failed to load data';

  return (
    <div className={styles.errorBox} role="alert">
      <p>{message || defaultMsg}</p>
      {onRetry && (
        <button type="button" className={styles.retryBtn} onClick={onRetry}>
          {language === 'fa' ? 'تلاش مجدد' : 'Retry'}
        </button>
      )}
    </div>
  );
}
