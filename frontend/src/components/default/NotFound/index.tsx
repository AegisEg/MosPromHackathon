import React from 'react';
import './style.scss';
import Button from '../../UI/Button';
import { useNavigate } from 'react-router-dom';
import tehnarik from '../../../assets/tehnarik.png';

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__image">
          <img src={tehnarik} alt="Not found" />
        </div>
        <div className="not-found__title">Ничего не нашёл</div>
        <div className="not-found__button">
          <Button onClick={() => navigate('/')}>На главную</Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
