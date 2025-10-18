import React from 'react';
import './style.scss';

function LoaderSmall() {
  return (
    <div className="loader-small">
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default LoaderSmall;
