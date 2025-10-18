import React from 'react';
import './style.scss';

function LoaderSmall() {
  return (
    <div className="loader-small">
      <div className="loader-small__text">Загрузка...</div>
      <div className="loader-small__spinner">
        <div className="loader-small__line"></div>
        <div className="loader-small__dots">
          <div className="loader-small__dot"></div>
          <div className="loader-small__dot"></div>
          <div className="loader-small__dot"></div>
          <div className="loader-small__dot"></div>
          <div className="loader-small__dot"></div>
          <div className="loader-small__dot"></div>
          <div className="loader-small__dot"></div>
          <div className="loader-small__dot"></div>
          <div className="loader-small__dot"></div>
          <div className="loader-small__dot"></div>
          <div className="loader-small__dot"></div>
          <div className="loader-small__dot"></div>
        </div>
      </div>
    </div>
  );
}

export default LoaderSmall;
