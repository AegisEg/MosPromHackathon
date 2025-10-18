import React from 'react';
import './style.scss';

function Loader() {
  return (
    <div className="loader_container">
      <div className="technopolis-loader">
        {/* Анимированная паутина */}
        <div className="web-animation">
          <svg viewBox="0 0 130 100" className="web-svg">
            {/* Асимметричная паутина с хаотичными точками */}
            
            {/* Точки в асимметричных позициях */}
            <g className="web-points">
              <circle cx="18" cy="22" r="1.2" className="web-point" />
              <circle cx="32" cy="15" r="2.0" className="web-point" />
              <circle cx="48" cy="28" r="0.6" className="web-point" />
              <circle cx="63" cy="18" r="1.5" className="web-point" />
              <circle cx="78" cy="25" r="0.8" className="web-point" />
              <circle cx="95" cy="12" r="2.2" className="web-point" />
              <circle cx="112" cy="20" r="1.0" className="web-point" />
              <circle cx="22" cy="38" r="2.5" className="web-point web-point-center" />
              <circle cx="35" cy="45" r="0.7" className="web-point" />
              <circle cx="52" cy="35" r="1.8" className="web-point" />
              <circle cx="68" cy="42" r="1.2" className="web-point" />
              <circle cx="82" cy="38" r="2.0" className="web-point" />
              <circle cx="98" cy="48" r="0.6" className="web-point" />
              <circle cx="108" cy="40" r="1.6" className="web-point" />
              <circle cx="28" cy="55" r="1.0" className="web-point" />
              <circle cx="42" cy="62" r="2.2" className="web-point" />
              <circle cx="58" cy="58" r="0.8" className="web-point" />
              <circle cx="72" cy="52" r="1.7" className="web-point" />
              <circle cx="88" cy="60" r="0.6" className="web-point" />
              <circle cx="102" cy="55" r="2.3" className="web-point" />
              <circle cx="115" cy="62" r="1.1" className="web-point" />
              <circle cx="25" cy="72" r="1.6" className="web-point" />
              <circle cx="38" cy="78" r="0.7" className="web-point" />
              <circle cx="55" cy="75" r="2.1" className="web-point" />
              <circle cx="68" cy="82" r="0.9" className="web-point" />
              <circle cx="85" cy="70" r="1.8" className="web-point" />
              <circle cx="98" cy="78" r="1.3" className="web-point" />
              <circle cx="110" cy="75" r="2.4" className="web-point" />
              <circle cx="15" cy="88" r="1.5" className="web-point" />
              <circle cx="45" cy="85" r="0.6" className="web-point" />
              <circle cx="62" cy="90" r="1.9" className="web-point" />
              <circle cx="78" cy="88" r="1.1" className="web-point" />
              <circle cx="92" cy="85" r="2.0" className="web-point" />
              <circle cx="105" cy="92" r="0.8" className="web-point" />
              <circle cx="118" cy="85" r="1.6" className="web-point" />
            </g>
            
            <g className="web-lines">
              {/* Линии соединяющие точки - хаотично */}
              <line x1="18" y1="22" x2="32" y2="15" className="web-line web-line-1" />
              <line x1="32" y1="15" x2="48" y2="28" className="web-line web-line-2" />
              <line x1="48" y1="28" x2="63" y2="18" className="web-line web-line-3" />
              <line x1="63" y1="18" x2="78" y2="25" className="web-line web-line-4" />
              <line x1="78" y1="25" x2="95" y2="12" className="web-line web-line-5" />
              <line x1="95" y1="12" x2="112" y2="20" className="web-line web-line-6" />
              
              <line x1="18" y1="22" x2="22" y2="38" className="web-line web-line-7" />
              <line x1="32" y1="15" x2="35" y2="45" className="web-line web-line-8" />
              <line x1="48" y1="28" x2="52" y2="35" className="web-line web-line-9" />
              <line x1="63" y1="18" x2="68" y2="42" className="web-line web-line-10" />
              <line x1="78" y1="25" x2="82" y2="38" className="web-line web-line-11" />
              <line x1="95" y1="12" x2="98" y2="48" className="web-line web-line-12" />
              <line x1="112" y1="20" x2="108" y2="40" className="web-line web-line-13" />
              
              <line x1="22" y1="38" x2="35" y2="45" className="web-line web-line-14" />
              <line x1="35" y1="45" x2="52" y2="35" className="web-line web-line-15" />
              <line x1="52" y1="35" x2="68" y2="42" className="web-line web-line-16" />
              <line x1="68" y1="42" x2="82" y2="38" className="web-line web-line-17" />
              <line x1="82" y1="38" x2="98" y2="48" className="web-line web-line-18" />
              <line x1="98" y1="48" x2="108" y2="40" className="web-line web-line-19" />
              
              <line x1="22" y1="38" x2="28" y2="55" className="web-line web-line-20" />
              <line x1="35" y1="45" x2="42" y2="62" className="web-line web-line-21" />
              <line x1="52" y1="35" x2="58" y2="58" className="web-line web-line-22" />
              <line x1="68" y1="42" x2="72" y2="52" className="web-line web-line-23" />
              <line x1="82" y1="38" x2="88" y2="60" className="web-line web-line-24" />
              <line x1="98" y1="48" x2="102" y2="55" className="web-line web-line-25" />
              <line x1="108" y1="40" x2="115" y2="62" className="web-line web-line-26" />
              
              <line x1="28" y1="55" x2="42" y2="62" className="web-line web-line-27" />
              <line x1="42" y1="62" x2="58" y2="58" className="web-line web-line-28" />
              <line x1="58" y1="58" x2="72" y2="52" className="web-line web-line-29" />
              <line x1="72" y1="52" x2="88" y2="60" className="web-line web-line-30" />
              <line x1="88" y1="60" x2="102" y2="55" className="web-line web-line-31" />
              <line x1="102" y1="55" x2="115" y2="62" className="web-line web-line-32" />
              
              <line x1="28" y1="55" x2="25" y2="72" className="web-line web-line-33" />
              <line x1="42" y1="62" x2="38" y2="78" className="web-line web-line-34" />
              <line x1="58" y1="58" x2="55" y2="75" className="web-line web-line-35" />
              <line x1="72" y1="52" x2="68" y2="82" className="web-line web-line-36" />
              <line x1="88" y1="60" x2="85" y2="70" className="web-line web-line-37" />
              <line x1="102" y1="55" x2="98" y2="78" className="web-line web-line-38" />
              <line x1="115" y1="62" x2="110" y2="75" className="web-line web-line-39" />
              
              <line x1="25" y1="72" x2="38" y2="78" className="web-line web-line-40" />
              <line x1="38" y1="78" x2="55" y2="75" className="web-line web-line-41" />
              <line x1="55" y1="75" x2="68" y2="82" className="web-line web-line-42" />
              <line x1="68" y1="82" x2="85" y2="70" className="web-line web-line-43" />
              <line x1="85" y1="70" x2="98" y2="78" className="web-line web-line-44" />
              <line x1="98" y1="78" x2="110" y2="75" className="web-line web-line-45" />
              
              <line x1="25" y1="72" x2="15" y2="88" className="web-line web-line-46" />
              <line x1="38" y1="78" x2="45" y2="85" className="web-line web-line-47" />
              <line x1="55" y1="75" x2="62" y2="90" className="web-line web-line-48" />
              <line x1="68" y1="82" x2="78" y2="88" className="web-line web-line-49" />
              <line x1="85" y1="70" x2="92" y2="85" className="web-line web-line-50" />
              <line x1="98" y1="78" x2="105" y2="92" className="web-line web-line-51" />
              <line x1="110" y1="75" x2="118" y2="85" className="web-line web-line-52" />
              
              {/* Диагональные связи для асимметрии */}
              <line x1="18" y1="22" x2="52" y2="35" className="web-line web-line-53" />
              <line x1="32" y1="15" x2="68" y2="42" className="web-line web-line-54" />
              <line x1="48" y1="28" x2="82" y2="38" className="web-line web-line-55" />
              <line x1="63" y1="18" x2="102" y2="55" className="web-line web-line-56" />
              <line x1="22" y1="38" x2="72" y2="52" className="web-line web-line-57" />
              <line x1="35" y1="45" x2="85" y2="70" className="web-line web-line-58" />
              <line x1="28" y1="55" x2="68" y2="82" className="web-line web-line-59" />
              <line x1="42" y1="62" x2="92" y2="85" className="web-line web-line-60" />
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
