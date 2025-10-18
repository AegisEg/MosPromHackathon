import React, { useState } from 'react';
import './style.scss';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';
import { DefaultValue } from '../../types/default.types';
import HR from '../../components/default/HR';

function Vacancies() {
  // Состояния фильтров
  const [searchQuery, setSearchQuery] = useState<DefaultValue<string>>({ 
    value: '', success: false, error: '', isDisabled: false 
  });
  const [city, setCity] = useState<any>(null);
  const [experience, setExperience] = useState<any>(null);
  const [employment, setEmployment] = useState<any>(null);
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

  const experienceOptions = [
    { value: 'no_experience', label: 'Без опыта' },
    { value: '1-3', label: '1-3 года' },
    { value: '3-6', label: '3-6 лет' },
    { value: '6+', label: 'Более 6 лет' },
  ];

  const employmentOptions = [
    { value: 'full', label: 'Полная занятость' },
    { value: 'part', label: 'Частичная занятость' },
    { value: 'project', label: 'Проектная работа' },
    { value: 'internship', label: 'Стажировка' },
  ];

  // Моковые данные вакансий
  const vacancies = [
    {
      id: 1,
      company: 'Summit company',
      location: 'Москва, Российская федерация',
      title: 'Senior Product Designer (Mobile & Game Interfaces)',
      description: 'Ищем дизайнера-интерфейсов для работы в крупной студии, специализирующейся на мобильной разработке.',
      publishedTime: '8 часов назад',
    },
    {
      id: 2,
      company: 'Tech Solutions',
      location: 'Санкт-Петербург, Россия',
      title: 'Backend разработчик',
      description: 'Разработка и поддержка серверной части веб-приложений. Опыт работы с Node.js и PostgreSQL.',
      publishedTime: '1 день назад',
    },
    {
      id: 3,
      company: 'Digital Agency',
      location: 'Москва, Российская федерация',
      title: 'Frontend разработчик',
      description: 'Создание современных веб-интерфейсов с использованием React и TypeScript.',
      publishedTime: '3 дня назад',
    },
    {
      id: 4,
      company: 'Startup Inc',
      location: 'Новосибирск, Россия',
      title: 'Project Manager',
      description: 'Управление проектами разработки программного обеспечения, координация команды.',
      publishedTime: '5 дней назад',
    },
  ];

  const handleResetFilters = () => {
    setSearchQuery({ value: '', success: false, error: '', isDisabled: false });
    setCity(null);
    setExperience(null);
    setEmployment(null);
    setSalary({ value: '', success: false, error: '', isDisabled: false });
  };

  return (
    <div className="vacancies-page">
      <div className="container">
        <div className="vacancies-page__content">
          <div className="vacancies-page__wrapper">
            {/* Sidebar с фильтрами */}
            <aside className="vacancies-page__filters">
              <div className="vacancies-page__filters-sticky">
              <h2 className="vacancies-page__filters-title">Фильтры</h2>
              
              <div className="vacancies-page__filters-group">
                <Input
                  label="Поиск по названию"
                  placeholder="Введите название вакансии"
                  value={searchQuery.value}
                  onChange={(value) => setSearchQuery({ ...searchQuery, value })}
                  error={searchQuery.error}
                  disabled={searchQuery.isDisabled}
                />
              </div>

              <div className="vacancies-page__filters-group">
                <Select
                  label="Город"
                  options={cityOptions}
                  value={city}
                  onChange={(option) => setCity(option)}
                  placeholder="Выберите город"
                  isClearable
                />
              </div>

              <div className="vacancies-page__filters-group">
                <Select
                  label="Опыт работы"
                  options={experienceOptions}
                  value={experience}
                  onChange={(option) => setExperience(option)}
                  placeholder="Выберите опыт"
                  isClearable
                />
              </div>

              <div className="vacancies-page__filters-group">
                <Select
                  label="Тип занятости"
                  options={employmentOptions}
                  value={employment}
                  onChange={(option) => setEmployment(option)}
                  placeholder="Выберите тип"
                  isClearable
                />
              </div>

              <div className="vacancies-page__filters-group">
                <Input
                  label="Зарплата от"
                  placeholder="Например: 100000"
                  type="number"
                  value={salary.value}
                  onChange={(value) => setSalary({ ...salary, value })}
                  error={salary.error}
                  disabled={salary.isDisabled}
                />
              </div>

              <div className="vacancies-page__filters-actions">
                <Button onClick={handleResetFilters}>
                  Сбросить фильтры
                </Button>
              </div>
              </div>
            </aside>

            {/* Список вакансий */}
            <div className="inner-wrapper">
              <div className="inner-wrapper_title">Популярные вакансии</div>
              <div className="vacancies-page__list">
                {vacancies.map((vacancy) => (
                  <div key={vacancy.id} className="vacancy-card">
                    <p className="vacancy-card__company">{vacancy.company}</p>
                    <p className="vacancy-card__location">{vacancy.location}</p>
                    <h3 className="vacancy-card__title">{vacancy.title}</h3>
                    <p className="vacancy-card__description">{vacancy.description}</p>
                    <p className="vacancy-card__published">
                      Вакансия опубликована: {vacancy.publishedTime}
                    </p>
                  </div>
                ))}
              </div>
              <HR margin={36} />
              <div className="inner-wrapper_title">Другие вакансии</div>
              <div className="vacancies-page__list">
                {vacancies.map((vacancy) => (
                  <div key={vacancy.id} className="vacancy-card">
                    <p className="vacancy-card__company">{vacancy.company}</p>
                    <p className="vacancy-card__location">{vacancy.location}</p>
                    <h3 className="vacancy-card__title">{vacancy.title}</h3>
                    <p className="vacancy-card__description">{vacancy.description}</p>
                    <p className="vacancy-card__published">
                      Вакансия опубликована: {vacancy.publishedTime}
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

export default Vacancies;

