import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import FloatingThemeButton from '../components/FloatingThemeButton';

/** لایهٔ اصلی با ناوبری پایین – dashboard، alerts، assets، settings */
export default function MainLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
      <FloatingThemeButton />
    </>
  );
}
