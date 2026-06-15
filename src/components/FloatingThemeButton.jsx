import { useTheme } from '../contexts/ThemeContext';   // تصحیح شد: ../ به جای ../../
import styles from './FloatingThemeButton.module.css';

export default function FloatingThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.floatingBtn} onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}