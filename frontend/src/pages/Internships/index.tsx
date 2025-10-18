import React, { useState } from 'react';
import './style.scss';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';
import { DefaultValue } from '../../types/default.types';
import HR from '../../components/default/HR';

function Internships() {
  // Состояния фильтров
  const [searchQuery, setSearchQuery] = useState<DefaultValue<string>>({ 
    value: '', success: false, error: '', isDisabled: false 
  });
  const [city, setCity] = useState<any>(null);
  const [duration, setDuration] = useState<any>(null);
  const [format, setFormat] = useState<any>(null);
  const [salary, setSalary] = useState<DefaultValue<string>>({ 
    value: '', success: false, error: '', isDisabled: false 
  });

  // Опции для фильтров
  const cityOptions = [
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'novosibirsk', label: 'Новосибирск' },
    { value: 'ekaterinburg', label: 'Екатеринбург' },
  ];

  const durationOptions = [
    { value: '1-3', label: '1-3 месяца' },
    { value: '3-6', label: '3-6 месяцев' },
    { value: '6+', label: 'Более 6 месяцев' },
  ];

  const formatOptions = [
    { value: 'office', label: 'В офисе' },
    { value: 'remote', label: 'Удаленно' },
    { value: 'hybrid', label: 'Гибрид' },
  ];

  // Моковые данные стажировок
  const internships = [
    {
      id: 1,
      company: 'Tech Innovations',
      location: 'Москва, Российская федерация',
      title: 'Стажер Frontend разработчик',
      description: 'Ищем начинающего разработчика для работы над веб-приложениями. Обучение и менторство включены.',
      publishedTime: '2 часа назад',
    },
    {
      id: 2,
      company: 'Digital Solutions',
      location: 'Санкт-Петербург, Россия',
      title: 'Стажер UX/UI дизайнер',
      description: 'Присоединяйтесь к команде дизайнеров для создания современных интерфейсов мобильных приложений.',
      publishedTime: '5 часов назад',
    },
    {
      id: 3,
      company: 'StartUp Lab',
      location: 'Москва, Российская федерация',
      title: 'Стажер Data Analyst',
      description: 'Работа с большими данными, создание отчетов и визуализаций. Python и SQL приветствуются.',
      publishedTime: '1 день назад',
    },
    {
      id: 4,
      company: 'Creative Agency',
      location: 'Новосибирск, Россия',
      title: 'Стажер Project Manager',
      description: 'Помощь в управлении проектами, координация команды, работа с документацией.',
      publishedTime: '2 дня назад',
    },
  ];

  const handleResetFilters = () => {
    setSearchQuery({ value: '', success: false, error: '', isDisabled: false });
    setCity(null);
    setDuration(null);
    setFormat(null);
    setSalary({ value: '', success: false, error: '', isDisabled: false });
  };

  return (
    <div className="internships-page">
      <div className="container">
        <div className="internships-page__content">
          <div className="internships-page__wrapper">
            {/* Sidebar с фильтрами */}
            <aside className="internships-page__filters">
              <div className="internships-page__filters-sticky">
              <h2 className="internships-page__filters-title">Фильтры</h2>
              
              <div className="internships-page__filters-group">
                <Input
                  label="Поиск по названию"
                  placeholder="Введите название стажировки"
                  value={searchQuery.value}
                  onChange={(value) => setSearchQuery({ ...searchQuery, value })}
                  error={searchQuery.error}
                  disabled={searchQuery.isDisabled}
                />
              </div>

              <div className="internships-page__filters-group">
                <Select
                  label="Город"
                  options={cityOptions}
                  value={city}
                  onChange={(option) => setCity(option)}
                  placeholder="Выберите город"
                  isClearable
                />
              </div>

              <div className="internships-page__filters-group">
                <Select
                  label="Длительность"
                  options={durationOptions}
                  value={duration}
                  onChange={(option) => setDuration(option)}
                  placeholder="Выберите длительность"
                  isClearable
                />
              </div>

              <div className="internships-page__filters-group">
                <Select
                  label="Формат работы"
                  options={formatOptions}
                  value={format}
                  onChange={(option) => setFormat(option)}
                  placeholder="Выберите формат"
                  isClearable
                />
              </div>

              <div className="internships-page__filters-group">
                <Input
                  label="Стипендия от"
                  placeholder="Например: 30000"
                  type="number"
                  value={salary.value}
                  onChange={(value) => setSalary({ ...salary, value })}
                  error={salary.error}
                  disabled={salary.isDisabled}
                />
              </div>

              <div className="internships-page__filters-actions">
                <Button onClick={handleResetFilters}>
                  Сбросить фильтры
                </Button>
              </div>
              </div>
            </aside>

            {/* Список стажировок */}
            <div className="inner-wrapper">
              <div className="inner-wrapper_title">Популярные стажировки</div>
              <div className="internships-page__list">
                {internships.map((internship) => (
                  <div key={internship.id} className="internship-card">
                    <p className="internship-card__company">{internship.company}</p>
                    <p className="internship-card__location">{internship.location}</p>
                    <h3 className="internship-card__title">{internship.title}</h3>
                    <p className="internship-card__description">{internship.description}</p>
                    <p className="internship-card__published">
                      Стажировка опубликована: {internship.publishedTime}
                    </p>
                  </div>
                ))}
              </div>
              <HR margin={36} />
              <div className="inner-wrapper_title">Другие стажировки</div>
              <div className="internships-page__list">
                {internships.map((internship) => (
                  <div key={internship.id} className="internship-card">
                    <p className="internship-card__company">{internship.company}</p>
                    <p className="internship-card__location">{internship.location}</p>
                    <h3 className="internship-card__title">{internship.title}</h3>
                    <p className="internship-card__description">{internship.description}</p>
                    <p className="internship-card__published">
                      Стажировка опубликована: {internship.publishedTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Internships;
