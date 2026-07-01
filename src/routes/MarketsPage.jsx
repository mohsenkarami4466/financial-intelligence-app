import { useNavigate } from 'react-router-dom';
import MarketGlobe from '../features/MarketGlobe/MarketGlobe';

export default function MarketsPage() {
  const navigate = useNavigate();

  return <MarketGlobe onClose={() => navigate('/dashboard')} />;
}
