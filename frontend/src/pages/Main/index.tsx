import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <div className="container">
        <div className="wrapper">
          <div className="main-page__content">
            <h1 className="main-page__title">
              Выберите нужный раздел для продолжения работы
            </h1>
            <div className="main-page__cards">
              <div 
                className="main-page__card"
                onClick={() => navigate('/vacancies')}
              >
                <h2 className="main-page__card-title">Вакансии</h2>
                <p className="main-page__card-description">
                  Просмотр и поиск вакансий
                </p>
              </div>
              
              <div 
                className="main-page__card"
                onClick={() => navigate('/internships')}
              >
                <h2 className="main-page__card-title">Стажировки</h2>
                <p className="main-page__card-description">
                  Просмотр и поиск стажировок
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
