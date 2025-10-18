import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../redux/store';
import { 
    selectSearchResultsData, 
    selectSearchResultsStatus,
    selectSearchResultsError
} from '../../redux/search/selectors';
import { 
    selectProfessionsData, 
    selectProfessionsStatus 
} from '../../redux/profession/selectors';
import { searchVacanciesAction } from '../../redux/search/actions';
import { getProfessionsAction } from '../../redux/profession/actions';
import { VacancyData, EmploymentType, ExperienceLevel } from '../../redux/vacancy/types';
import { LoadStatus } from '../../utils/types';
import './style.scss';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button, { ButtonType } from '../../components/UI/Button';
import { DefaultValue } from '../../types/default.types';
import HR from '../../components/default/HR';
import Loader from '../../components/default/Loader';
import RespondButton from '../../components/UI/RespondButton';

function Vacancies() {
  const dispatch = useTypedDispatch();
  
  // Redux selectors
  const searchResults = useSelector(selectSearchResultsData);
  const searchStatus = useSelector(selectSearchResultsStatus);
  const searchError = useSelector(selectSearchResultsError);
  const professions = useSelector(selectProfessionsData);
  const professionsStatus = useSelector(selectProfessionsStatus);

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

  // Функция для выполнения поиска
  const performSearch = useCallback(() => {
    const searchParams: any = {};
    
    if (searchQuery.value.trim()) {
      searchParams.title = searchQuery.value.trim();
    }
    
    if (experience && experience.value) {
      searchParams.experience_wide = parseInt(experience.value);
    }
    
    if (employment && employment.value) {
      searchParams.employment_type = parseInt(employment.value);
    }
    
    if (salary.value && parseInt(salary.value) > 0) {
      searchParams.salary_from = parseInt(salary.value);
    }

    dispatch(searchVacanciesAction(searchParams));
  }, [dispatch, searchQuery.value, experience, employment, salary.value]);

  // Загружаем профессии при монтировании компонента
  useEffect(() => {
    dispatch(getProfessionsAction());
  }, [dispatch]);

  // Выполняем начальный поиск при загрузке страницы
  useEffect(() => {
    performSearch();
  }, []);

  // Опции для фильтров
  const cityOptions = [
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'novosibirsk', label: 'Новосибирск' },
    { value: 'ekaterinburg', label: 'Екатеринбург' },
  ];

  const experienceOptions = [
    { value: ExperienceLevel.NO_EXPERIENCE.toString(), label: 'Без опыта' },
    { value: ExperienceLevel.JUNIOR.toString(), label: '1 год' },
    { value: ExperienceLevel.MIDDLE.toString(), label: '3 года' },
    { value: ExperienceLevel.SENIOR.toString(), label: '5 лет' },
    { value: ExperienceLevel.LEAD.toString(), label: '10+ лет' },
  ];

  const employmentOptions = [
    { value: EmploymentType.FULL_TIME.toString(), label: 'Полная занятость' },
    { value: EmploymentType.PART_TIME.toString(), label: 'Частичная занятость' },
    { value: EmploymentType.CONTRACT.toString(), label: 'Договор' },
    { value: EmploymentType.FREELANCE.toString(), label: 'Фриланс' },
  ];

  // Функция для получения названия профессии по ID
  const getProfessionName = (professionId: number): string => {
    const profession = professions.find(p => p.id === professionId);
    return profession ? profession.name : 'Неизвестная профессия';
  };

  // Функция для получения названия типа занятости
  const getEmploymentTypeLabel = (type: EmploymentType): string => {
    const option = employmentOptions.find(opt => opt.value === type.toString());
    return option ? option.label : 'Неизвестный тип';
  };

  // Функция для получения названия уровня опыта
  const getExperienceLevelLabel = (level: ExperienceLevel): string => {
    const option = experienceOptions.find(opt => opt.value === level.toString());
    return option ? option.label : 'Неизвестный уровень';
  };

  // Получаем вакансии из результатов поиска
  const vacancies = useMemo(() => {
    return searchResults?.vacancies || [];
  }, [searchResults]);

  const totalVacancies = useMemo(() => {
    return searchResults?.total || 0;
  }, [searchResults]);

  const handleResetFilters = () => {
    setSearchQuery({ value: '', success: false, error: '', isDisabled: false });
    setCity(null);
    setExperience(null);
    setEmployment(null);
    setSalary({ value: '', success: false, error: '', isDisabled: false });
  };

  const handleSearch = () => {
    performSearch();
  };

  // Показываем загрузку только для профессий при первой загрузке
  if (professionsStatus === LoadStatus.IN_PROGRESS) {
    return (
      <div className="vacancies-page">
        <div className="container">
          <div className="vacancies-page__content">
            <Loader />
          </div>
        </div>
      </div>
    );
  }
  console.log('vacancies', vacancies);
  return (
    <div className="vacancies-page">
      <div className="container">
        <div className="vacancies-page__content">
          <div className="vacancies-page__wrapper">
            {/* Фильтры */}
            <div className="vacancies-page__filters">
              <h2 className="vacancies-page__filters-title">Фильтры</h2>
              
              <div className="vacancies-page__filters-content">
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
              </div>

              <div className="vacancies-page__filters-actions">
                <Button 
                  onClick={handleSearch}
                  disabled={(searchStatus as any) === LoadStatus.IN_PROGRESS}
                >
                  {(searchStatus as any) === LoadStatus.IN_PROGRESS ? 'Поиск...' : 'Поиск'}
                </Button>
                <Button 
                  onClick={handleResetFilters}
                  variant={ButtonType.GRAY}
                >
                  Сбросить фильтры
                </Button>
              </div>
            </div>

            {/* Список вакансий */}
            <div className="inner-wrapper">
              <div className="inner-wrapper_title">
                Найдено вакансий: {totalVacancies}
              </div>
              {searchError && (
                <div className="search-error">
                  <p>Ошибка поиска: {searchError}</p>
                </div>
              )}
              <div className="vacancies-page__list">
                {(searchStatus as any) === LoadStatus.IN_PROGRESS ? (
                  <div className="vacancies-loading">
                    <Loader />
                    <p>Поиск вакансий...</p>
                  </div>
                ) : vacancies.length === 0 ? (
                  <div className="no-vacancies">
                    <p>По вашим критериям вакансии не найдены</p>
                    <Button onClick={handleResetFilters}>
                      Сбросить фильтры
                    </Button>
                  </div>
                ) : (
                  vacancies.map((vacancy: VacancyData) => (
                    <div key={vacancy.id} className="vacancy-card">
                      <div className="vacancy-card__header">
                        <h3 className="vacancy-card__title">{vacancy.title}</h3>
                        <div className="vacancy-card__header-right">
                          <RespondButton vacancyId={vacancy.id!} />
                        </div>
                      </div>
                      <p className="vacancy-card__profession">
                        {getProfessionName(vacancy.professionId || 0)}
                      </p>
                      {vacancy.salaryFrom && (
                            <div className="vacancy-card__salary">
                              {vacancy.salaryFrom.toLocaleString()} ₽
                              {vacancy.salaryTo && ` - ${vacancy.salaryTo.toLocaleString()} ₽`}
                            </div>
                          )}
                      <p className="vacancy-card__description">{vacancy.description}</p>
                      <div className="vacancy-card__details">
                        <span className="vacancy-card__employment">
                          {getEmploymentTypeLabel(vacancy.employmentType || EmploymentType.FULL_TIME)}
                        </span>
                        <span className="vacancy-card__experience">
                          {getExperienceLevelLabel(vacancy.experienceWide || ExperienceLevel.NO_EXPERIENCE)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vacancies;

