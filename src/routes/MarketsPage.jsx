import { useNavigate } from 'react-router-dom';
import MarketGlobe from '../components/MarketGlobe/MarketGlobe';

export default function MarketsPage() {
  const navigate = useNavigate();

  return <MarketGlobe onClose={() => navigate('/dashboard')} />;
}
