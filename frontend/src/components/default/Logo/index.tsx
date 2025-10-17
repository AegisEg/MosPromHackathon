import './style.scss';
import logoRed from '../../../assets/logo_red.png';
import logoWhite from '../../../assets/logo_white.png';
import { useNavigate } from 'react-router-dom';

function Logo({ type = 'red' }: { type?: 'red' | 'white' }) {
  const navigate = useNavigate();
    
  return (
    <button onClick={() => navigate('/')} className="logo">
      <img src={type === 'red' ? logoRed : logoWhite} alt="Logo" />
    </button>
  );
}

export default Logo;
