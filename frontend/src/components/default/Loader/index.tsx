import React from 'react';
import './style.scss';

function Loader() {
  return (
    <div className="loader_container">
      <div className="technopolis-loader">
        {/* Анимированная паутина */}
        <div className="web-animation">
          <svg viewBox="0 0 130 100" className="web-svg">
            {/* Прямоугольная паутина - шире чем высота */}
            <g className="web-lines">
              {/* Вертикальные линии - больше линий для ширины (без контурных) */}
              <line x1="25" y1="18" x2="25" y2="82" className="web-line web-line-1" />
              <line x1="40" y1="20" x2="40" y2="80" className="web-line web-line-2" />
              <line x1="55" y1="16" x2="55" y2="84" className="web-line web-line-3" />
              <line x1="70" y1="22" x2="70" y2="78" className="web-line web-line-4" />
              <line x1="85" y1="19" x2="85" y2="81" className="web-line web-line-5" />
              <line x1="100" y1="17" x2="100" y2="83" className="web-line web-line-6" />
              <line x1="115" y1="21" x2="115" y2="79" className="web-line web-line-7" />
              
              {/* Горизонтальные линии - не ровные (без контурных) */}
              <line x1="12" y1="32" x2="118" y2="32" className="web-line web-line-10" />
              <line x1="8" y1="48" x2="122" y2="48" className="web-line web-line-11" />
              <line x1="15" y1="65" x2="115" y2="65" className="web-line web-line-12" />
              
              {/* Диагональные линии - хаотичные */}
              <line x1="25" y1="18" x2="55" y2="48" className="web-line web-line-8" />
              <line x1="40" y1="20" x2="70" y2="65" className="web-line web-line-9" />
              <line x1="55" y1="16" x2="85" y2="48" className="web-line web-line-13" />
              <line x1="70" y1="22" x2="100" y2="32" className="web-line web-line-14" />
              <line x1="85" y1="19" x2="115" y2="48" className="web-line web-line-15" />
              <line x1="100" y1="17" x2="115" y2="65" className="web-line web-line-16" />
              <line x1="25" y1="32" x2="70" y2="48" className="web-line web-line-17" />
              <line x1="40" y1="32" x2="85" y2="65" className="web-line web-line-18" />
              <line x1="55" y1="48" x2="100" y2="65" className="web-line web-line-19" />
              <line x1="70" y1="48" x2="115" y2="32" className="web-line web-line-20" />
              <line x1="25" y1="82" x2="70" y2="48" className="web-line web-line-21" />
              <line x1="85" y1="81" x2="115" y2="65" className="web-line web-line-22" />
              
              {/* Дополнительные короткие линии */}
              <line x1="32" y1="25" x2="47" y2="40" className="web-line web-line-23" />
              <line x1="62" y1="28" x2="77" y2="42" className="web-line web-line-24" />
              <line x1="92" y1="26" x2="107" y2="38" className="web-line web-line-25" />
              <line x1="35" y1="55" x2="50" y2="70" className="web-line web-line-26" />
              <line x1="65" y1="58" x2="80" y2="72" className="web-line web-line-27" />
            </g>
            
            {/* Точки на пересечениях - не ровные (без контурных) */}
            <g className="web-points">
              <circle cx="25" cy="18" r="0.8" className="web-point" />
              <circle cx="40" cy="20" r="1.2" className="web-point" />
              <circle cx="55" cy="16" r="0.9" className="web-point" />
              <circle cx="70" cy="22" r="1.0" className="web-point" />
              <circle cx="85" cy="19" r="0.7" className="web-point" />
              <circle cx="100" cy="17" r="1.3" className="web-point" />
              <circle cx="115" cy="21" r="0.8" className="web-point" />
              <circle cx="25" cy="32" r="1.4" className="web-point web-point-center" />
              <circle cx="40" cy="32" r="0.9" className="web-point" />
              <circle cx="55" cy="32" r="1.0" className="web-point" />
              <circle cx="70" cy="32" r="0.8" className="web-point" />
              <circle cx="85" cy="32" r="1.2" className="web-point" />
              <circle cx="100" cy="32" r="0.7" className="web-point" />
              <circle cx="115" cy="32" r="1.1" className="web-point" />
              <circle cx="25" cy="48" r="0.8" className="web-point" />
              <circle cx="40" cy="48" r="1.2" className="web-point" />
              <circle cx="55" cy="48" r="0.9" className="web-point" />
              <circle cx="70" cy="48" r="1.1" className="web-point" />
              <circle cx="85" cy="48" r="0.7" className="web-point" />
              <circle cx="100" cy="48" r="1.3" className="web-point" />
              <circle cx="115" cy="48" r="0.8" className="web-point" />
              <circle cx="25" cy="65" r="1.1" className="web-point" />
              <circle cx="40" cy="65" r="0.8" className="web-point" />
              <circle cx="55" cy="65" r="1.2" className="web-point" />
              <circle cx="70" cy="65" r="0.7" className="web-point" />
              <circle cx="85" cy="65" r="1.0" className="web-point" />
              <circle cx="100" cy="65" r="0.9" className="web-point" />
              <circle cx="115" cy="65" r="1.3" className="web-point" />
              <circle cx="25" cy="82" r="1.1" className="web-point" />
              <circle cx="40" cy="80" r="0.6" className="web-point" />
              <circle cx="55" cy="84" r="1.0" className="web-point" />
              <circle cx="70" cy="78" r="0.9" className="web-point" />
              <circle cx="85" cy="81" r="1.2" className="web-point" />
              <circle cx="100" cy="83" r="0.7" className="web-point" />
              <circle cx="115" cy="79" r="1.1" className="web-point" />
            </g>
          </svg>
        </div>
        
        {/* Текст логотипа */}
        <div className="logo-text">
          <div className="logo-line logo-line-1">ТЕХНОПОЛИС</div>
          <div className="logo-line logo-line-2">МОСКВА</div>
          <div className="logo-line logo-line-3">ОСОБАЯ ЭКОНОМИЧЕСКАЯ ЗОНА</div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
