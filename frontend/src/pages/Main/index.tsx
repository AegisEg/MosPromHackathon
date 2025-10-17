import React, { useState } from 'react';
import './style.scss';

function Main() {
  return (
    <div className="main-page">
      <div className="wrapper">
        <h1 className="main-page__title">Главная страница</h1>
        <p className="main-page__description">
          Это главная страница вашего сайта. Здесь вы можете разместить основную информацию о вашем сайте.
        </p>
      </div>
    </div>
  );
}

export default Main;
