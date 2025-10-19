import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../redux/store';
import {
  fetchTopProfessionsAction,
  fetchTopSkillsAction,
  fetchSalaryDataAction,
  fetchExperienceDataAction,
} from '../../redux/analytics/actions';
import {
  selectTopProfessions,
  selectTopSkills,
  selectSalaryData,
  selectExperienceData,
  selectTopProfessionsLoading,
  selectTopSkillsLoading,
  selectSalaryDataLoading,
  selectExperienceDataLoading,
  selectTopProfessionsError,
  selectTopSkillsError,
  selectSalaryDataError,
  selectExperienceDataError,
} from '../../redux/analytics/selectors';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import './style.scss';

const COLORS = ['#D00E46', '#FF6B9D', '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'];

const AdminAnalytics: React.FC = () => {
  const dispatch = useTypedDispatch();

  // Данные
  const topProfessions = useSelector(selectTopProfessions);
  const topSkills = useSelector(selectTopSkills);
  const salaryData = useSelector(selectSalaryData);
  const experienceData = useSelector(selectExperienceData);

  // Состояния загрузки
  const topProfessionsLoading = useSelector(selectTopProfessionsLoading);
  const topSkillsLoading = useSelector(selectTopSkillsLoading);
  const salaryDataLoading = useSelector(selectSalaryDataLoading);
  const experienceDataLoading = useSelector(selectExperienceDataLoading);

  // Ошибки
  const topProfessionsError = useSelector(selectTopProfessionsError);
  const topSkillsError = useSelector(selectTopSkillsError);
  const salaryDataError = useSelector(selectSalaryDataError);
  const experienceDataError = useSelector(selectExperienceDataError);

  useEffect(() => {
    dispatch(fetchTopProfessionsAction());
    dispatch(fetchTopSkillsAction());
    dispatch(fetchSalaryDataAction());
    dispatch(fetchExperienceDataAction());
  }, [dispatch]);

  const formatSalary = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
  };

  const formatCount = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  if (topProfessionsLoading || topSkillsLoading || salaryDataLoading || experienceDataLoading) {
    return (
      <div className="admin-analytics">
        <div className="container">
          <div className="wrapper">
            <div className="loading">
              <h2>Загрузка аналитики...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-analytics">
      <div className="container">
        <div className="wrapper">
          <h1 className="page-title">Аналитика резюме</h1>

          {/* Топ профессии */}
          <div className="analytics-section">
            <h2 className="section-title">Топ профессий</h2>
            {topProfessionsError ? (
              <div className="error">Ошибка: {topProfessionsError}</div>
            ) : (
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={topProfessions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [formatCount(value), 'Количество']}
                    />
                    <Legend />
                    <Bar dataKey="count" fill="#D00E46" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Топ навыки */}
          <div className="analytics-section">
            <h2 className="section-title">Топ навыков</h2>
            {topSkillsError ? (
              <div className="error">Ошибка: {topSkillsError}</div>
            ) : (
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={topSkills}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [formatCount(value), 'Количество']}
                    />
                    <Legend />
                    <Bar dataKey="count" fill="#FF6B9D" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Данные о зарплатах */}
          <div className="analytics-section">
            <h2 className="section-title">Статистика зарплат</h2>
            {salaryDataError ? (
              <div className="error">Ошибка: {salaryDataError}</div>
            ) : salaryData ? (
              <div className="salary-stats">
                <div className="stat-card">
                  <h3>Средняя зарплата</h3>
                  <div className="stat-value">{formatSalary(salaryData.averageSalary)}</div>
                </div>
                <div className="stat-card">
                  <h3>Медианная зарплата</h3>
                  <div className="stat-value">{formatSalary(salaryData.medianSalary)}</div>
                </div>
                <div className="stat-card">
                  <h3>Минимальная зарплата</h3>
                  <div className="stat-value">{formatSalary(salaryData.min || 0)}</div>
                </div>
                <div className="stat-card">
                  <h3>Максимальная зарплата</h3>
                  <div className="stat-value">{formatSalary(salaryData.max || 0)}</div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Данные об опыте */}
          <div className="analytics-section">
            <h2 className="section-title">Статистика опыта</h2>
            {experienceDataError ? (
              <div className="error">Ошибка: {experienceDataError}</div>
            ) : experienceData ? (
              <div className="salary-stats">
                <div className="stat-card">
                  <h3>Средний опыт</h3>
                  <div className="stat-value">{experienceData.averageExperience?.toFixed(1) || 0} лет</div>
                </div>
                <div className="stat-card">
                  <h3>Медианный опыт</h3>
                  <div className="stat-value">{experienceData.medianExperience?.toFixed(1) || 0} лет</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
