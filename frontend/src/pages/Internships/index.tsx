import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../redux/store';
import { 
    selectSearchInternshipsData, 
    selectSearchInternshipsStatus,
    selectSearchInternshipsError
} from '../../redux/search/selectors';
import { searchInternshipsAction } from '../../redux/search/actions';
import { InternshipData } from '../../redux/internship/types';
import { LoadStatus } from '../../utils/types';
import './style.scss';
import Input from '../../components/UI/Input';
import Button, { ButtonType } from '../../components/UI/Button';
import DateInput from '../../components/UI/DateInput';
import Slider from '../../components/UI/Slider';
import { DefaultValue } from '../../types/default.types';
import Loader from '../../components/default/Loader';

function Internships() {
  const dispatch = useTypedDispatch();
  
  // Redux selectors
  const searchResults = useSelector(selectSearchInternshipsData);
  const searchStatus = useSelector(selectSearchInternshipsStatus);
  const searchError = useSelector(selectSearchInternshipsError);

  // Состояния фильтров
  const [searchQuery, setSearchQuery] = useState<DefaultValue<string>>({ 
    value: '', success: false, error: '', isDisabled: false 
  });
  const [countStudentsRange, setCountStudentsRange] = useState<number[]>([1, 50]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Функция для выполнения поиска
  const performSearch = useCallback(() => {
    const searchParams: any = {};
    
    if (searchQuery.value.trim()) {
      searchParams.speciality = searchQuery.value.trim();
    }
    
    // Отправляем диапазон только если он изменён от начального
    if (countStudentsRange[0] !== 1 || countStudentsRange[1] !== 50) {
      searchParams.count_students_from = countStudentsRange[0];
      searchParams.count_students_to = countStudentsRange[1];
    }
    
    if (startDate) {
      searchParams.start_date_from = convertDateToISO(startDate);
    }
    
    if (endDate) {
      searchParams.end_date_to = convertDateToISO(endDate);
    }

    dispatch(searchInternshipsAction(searchParams));
  }, [dispatch, searchQuery.value, countStudentsRange, startDate, endDate]);

  // Выполняем начальный поиск при загрузке страницы
  useEffect(() => {
    performSearch();
  }, []);

  // Функция для конвертации даты из DD.MM.YYYY в YYYY-MM-DD
  const convertDateToISO = (dateStr: string): string => {
    if (!dateStr) return '';
    const parts = dateStr.split('.');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  // Функция для форматирования даты из YYYY-MM-DD в DD.MM.YYYY
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleResetFilters = () => {
    setSearchQuery({ value: '', success: false, error: '', isDisabled: false });
    setCountStudentsRange([1, 50]);
    setStartDate('');
    setEndDate('');
  };

  const handleSearch = () => {
    performSearch();
  };

  // Получаем стажировки из результатов поиска
  const internships = useMemo(() => {
    return searchResults?.internships || [];
  }, [searchResults]);

  const totalInternships = useMemo(() => {
    return searchResults?.total || 0;
  }, [searchResults]);

  return (
    <div className="internships-page">
      <div className="container">
        <div className="internships-page__content">
          <div className="internships-page__wrapper">
            {/* Фильтры */}
            <div className="internships-page__filters">
              <h2 className="internships-page__filters-title">Фильтры</h2>
              
              <div className="internships-page__filters-content">
                <div className="internships-page__filters-group">
                  <Input
                    label="Поиск по специальности"
                    placeholder="Введите специальность"
                    value={searchQuery.value}
                    onChange={(value) => setSearchQuery({ ...searchQuery, value })}
                    error={searchQuery.error}
                    disabled={searchQuery.isDisabled}
                  />
                </div>

                <div className="internships-page__filters-group">
                  <Slider
                    label="Количество студентов"
                    min={1}
                    max={50}
                    value={countStudentsRange}
                    onChange={(_, value) => setCountStudentsRange(value as number[])}
                    valueLabelDisplay="auto"
                  />
                </div>

                <div className="internships-page__filters-group">
                  <DateInput
                    label="Начало стажировки (от)"
                    placeholder="ДД.ММ.ГГГГ"
                    value={startDate}
                    onChange={(value) => setStartDate(value)}
                    dateFormat="DD.MM.YYYY"
                  />
                </div>

                <div className="internships-page__filters-group">
                  <DateInput
                    label="Конец стажировки (до)"
                    placeholder="ДД.ММ.ГГГГ"
                    value={endDate}
                    onChange={(value) => setEndDate(value)}
                    dateFormat="DD.MM.YYYY"
                  />
                </div>
              </div>

              <div className="internships-page__filters-actions">
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

            {/* Список стажировок */}
            <div className="inner-wrapper">
              <div className="inner-wrapper_title">
                Найдено стажировок: {totalInternships}
              </div>
              {searchError && (
                <div className="search-error">
                  <p>Ошибка поиска: {searchError}</p>
                </div>
              )}
              <div className="internships-page__list">
                {(searchStatus as any) === LoadStatus.IN_PROGRESS ? (
                  <div className="internships-loading">
                    <Loader />
                    <p>Поиск стажировок...</p>
                  </div>
                ) : internships.length === 0 ? (
                  <div className="no-internships">
                    <p>По вашим критериям стажировки не найдены</p>
                    <Button onClick={handleResetFilters}>
                      Сбросить фильтры
                    </Button>
                  </div>
                ) : (
                  internships.map((internship: InternshipData) => (
                    <div key={internship.id} className="internship-card">
                      <div className="internship-card__header">
                        <h3 className="internship-card__title">{internship.speciality}</h3>
                      </div>
                      
                      <div className="internship-card__info">
                        <div className="internship-card__info-item">
                          <span className="internship-card__info-label">Количество студентов:</span>
                          <span className="internship-card__info-value">{internship.countStudents}</span>
                        </div>
                        
                        <div className="internship-card__info-item">
                          <span className="internship-card__info-label">Период:</span>
                          <span className="internship-card__info-value">
                            {formatDate(internship.startDatePeriod || '')} - {formatDate(internship.endDatePeriod || '')}
                          </span>
                        </div>
                      </div>
                      
                      {internship.createdAt && (
                        <p className="internship-card__published">
                          Опубликовано: {formatDate(internship.createdAt.split('T')[0])}
                        </p>
                      )}
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

export default Internships;
