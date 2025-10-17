import './style.scss';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Logo() {
  const navigate = useNavigate();
    
  return (
    <button onClick={() => navigate('/')} className="logo">
      <img src={logo} alt="Logo" />
    </button>
  );
}

export default Logo;
