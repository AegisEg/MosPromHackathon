import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../redux/store';
import {
  fetchTopProfessionsAction,
  fetchTopSkillsAction,
  fetchSalaryDataAction,
  fetchExperienceDataAction,
  fetchAverageCountRespondsAction,
  fetchAverageMedianSalaryRespondsAction,
  fetchRespondsStatusStatsAction,
  fetchAverageAgeRespondsAction,
  fetchRespondsTimelineAction,
} from '../../redux/analytics/actions';
import {
  selectTopProfessions,
  selectTopSkills,
  selectSalaryData,
  selectExperienceData,
  selectAverageCountResponds,
  selectAverageMedianSalaryResponds,
  selectRespondsStatusStats,
  selectAverageAgeResponds,
  selectRespondsTimeline,
  selectTopProfessionsLoading,
  selectTopSkillsLoading,
  selectSalaryDataLoading,
  selectExperienceDataLoading,
  selectAverageCountRespondsLoading,
  selectAverageMedianSalaryRespondsLoading,
  selectRespondsStatusStatsLoading,
  selectAverageAgeRespondsLoading,
  selectRespondsTimelineLoading,
  selectTopProfessionsError,
  selectTopSkillsError,
  selectSalaryDataError,
  selectExperienceDataError,
  selectAverageCountRespondsError,
  selectAverageMedianSalaryRespondsError,
  selectRespondsStatusStatsError,
  selectAverageAgeRespondsError,
  selectRespondsTimelineError,
} from '../../redux/analytics/selectors';
import { selectUserData } from '../../redux/user/selectors';
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
import Loader from '../../components/default/Loader';

const COLORS = [
  '#D00E46', // Основной фирменный цвет
  'rgba(208, 14, 70, 0.8)', // 80% прозрачности
  'rgba(208, 14, 70, 0.6)', // 60% прозрачности
  'rgba(208, 14, 70, 0.4)', // 40% прозрачности
  'rgba(208, 14, 70, 0.2)', // 20% прозрачности
  'rgba(208, 14, 70, 0.1)', // 10% прозрачности
  'rgba(208, 14, 70, 0.05)' // 5% прозрачности
];

const Analytics: React.FC = () => {
  const dispatch = useTypedDispatch();
  const user = useSelector(selectUserData);

  // Данные для админа
  const topProfessions = useSelector(selectTopProfessions);
  const topSkills = useSelector(selectTopSkills);
  const salaryData = useSelector(selectSalaryData);
  const experienceData = useSelector(selectExperienceData);

  // Данные для компании
  const averageCountResponds = useSelector(selectAverageCountResponds);
  const averageMedianSalaryResponds = useSelector(selectAverageMedianSalaryResponds);
  const respondsStatusStats = useSelector(selectRespondsStatusStats);
  const averageAgeResponds = useSelector(selectAverageAgeResponds);
  const respondsTimeline = useSelector(selectRespondsTimeline);

  // Состояния загрузки
  const topProfessionsLoading = useSelector(selectTopProfessionsLoading);
  const topSkillsLoading = useSelector(selectTopSkillsLoading);
  const salaryDataLoading = useSelector(selectSalaryDataLoading);
  const experienceDataLoading = useSelector(selectExperienceDataLoading);
  const averageCountRespondsLoading = useSelector(selectAverageCountRespondsLoading);
  const averageMedianSalaryRespondsLoading = useSelector(selectAverageMedianSalaryRespondsLoading);
  const respondsStatusStatsLoading = useSelector(selectRespondsStatusStatsLoading);
  const averageAgeRespondsLoading = useSelector(selectAverageAgeRespondsLoading);
  const respondsTimelineLoading = useSelector(selectRespondsTimelineLoading);

  // Ошибки
  const topProfessionsError = useSelector(selectTopProfessionsError);
  const topSkillsError = useSelector(selectTopSkillsError);
  const salaryDataError = useSelector(selectSalaryDataError);
  const experienceDataError = useSelector(selectExperienceDataError);
  const averageCountRespondsError = useSelector(selectAverageCountRespondsError);
  const averageMedianSalaryRespondsError = useSelector(selectAverageMedianSalaryRespondsError);
  const respondsStatusStatsError = useSelector(selectRespondsStatusStatsError);
  const averageAgeRespondsError = useSelector(selectAverageAgeRespondsError);
  const respondsTimelineError = useSelector(selectRespondsTimelineError);

  useEffect(() => {
    console.log('Analytics useEffect triggered, user role:', user?.data?.role);
    if (user?.data?.role === 'admin') {
      console.log('Loading admin analytics data...');
      // Загружаем данные для админа
      dispatch(fetchTopProfessionsAction());
      dispatch(fetchTopSkillsAction());
      dispatch(fetchSalaryDataAction());
      dispatch(fetchExperienceDataAction());
    } else if (user?.data?.role === 'employer') {
      console.log('Loading employer analytics data...');
      // Загружаем данные для работодателя
      dispatch(fetchAverageCountRespondsAction());
      dispatch(fetchAverageMedianSalaryRespondsAction());
      dispatch(fetchRespondsStatusStatsAction());
      dispatch(fetchAverageAgeRespondsAction());
      dispatch(fetchRespondsTimelineAction());
    }
  }, [dispatch, user?.data?.role]);

  const formatSalary = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
  };

  const formatCount = (value: number) => {
    return !!value ? new Intl.NumberFormat('ru-RU').format(value) : 0;
  };

  const formatDate = (dateString: string) => {
    try {
      // Если дата в формате YYYY-MM-DD, парсим напрямую
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return new Date(dateString).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
        });
      }
      
      // Если дата в формате DD.MM.YYYY, конвертируем в Date
      if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
        const [day, month, year] = dateString.split('.');
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
        });
      }
      
      // Пытаемся распарсить как есть
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
        });
      }
      
      // Если ничего не подошло, возвращаем исходную строку
      return dateString;
    } catch (error) {
      console.warn('Error formatting date:', dateString, error);
      return dateString;
    }
  };

  // Подготовка данных для статусов откликов
  const statusData = respondsStatusStats ? [
    { name: 'Ожидают', value: respondsStatusStats.pending, color: '#D00E46' },
    { name: 'Приняты', value: respondsStatusStats.accepted, color: 'rgba(208, 14, 70, 0.8)' },
    { name: 'Отклонены', value: respondsStatusStats.rejected, color: 'rgba(208, 14, 70, 0.6)' },
  ] : [];

  const isLoading = user?.data?.role === 'admin' 
    ? (topProfessionsLoading || topSkillsLoading || salaryDataLoading || experienceDataLoading)
    : (averageCountRespondsLoading || averageMedianSalaryRespondsLoading || respondsStatusStatsLoading || averageAgeRespondsLoading || respondsTimelineLoading);

  // Логирование данных для отладки
  console.log('Analytics data:', {
    userRole: user?.data?.role,
    isLoading,
    topProfessions,
    topSkills,
    salaryData,
    experienceData,
    averageCountResponds,
    averageMedianSalaryResponds,
    respondsStatusStats,
    averageAgeResponds,
    respondsTimeline,
    errors: {
      topProfessionsError,
      topSkillsError,
      salaryDataError,
      experienceDataError,
      averageCountRespondsError,
      averageMedianSalaryRespondsError,
      respondsStatusStatsError,
      averageAgeRespondsError,
      respondsTimelineError,
    }
  });

  if (isLoading) {
    return (
      <div className="analytics">
        <div className="container">
          <div className="wrapper">
            <Loader />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="analytics">
      <div className="container">
        <div className="wrapper">
          <h1 className="page-title">
            {user.data?.role === 'admin' ? 'Аналитика резюме' : 'Аналитика откликов'}
          </h1>

          <div className="dashboard-grid">
            {user.data?.role === 'admin' ? (
              // Админская аналитика
              <>
                {/* Статистика зарплат */}
                <div className="analytics-section section-full">
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

                {/* Топ профессии */}
                <div className="analytics-section section-half">
                  <h2 className="section-title">Топ профессий</h2>
                  {topProfessionsError ? (
                    <div className="error">Ошибка: {topProfessionsError}</div>
                  ) : (
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={topProfessions}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="professionName" 
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            interval={0}
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number) => [formatCount(value), 'Количество']}
                          />
                          <Bar dataKey="resumesCount" fill="#D00E46" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* Топ навыки */}
                <div className="analytics-section section-half">
                  <h2 className="section-title">Топ навыков</h2>
                  {topSkillsError ? (
                    <div className="error">Ошибка: {topSkillsError}</div>
                  ) : (
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={topSkills}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="skillName" 
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            interval={0}
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number) => [formatCount(value), 'Количество']}
                          />
                          <Bar dataKey="vacanciesCount" fill="rgba(208, 14, 70, 0.8)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* Данные об опыте */}
                <div className="analytics-section section-full">
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
              </>
            ) : (
              // Аналитика компании
              <>
                {/* Общая статистика */}
                <div className="analytics-section section-full">
                  <h2 className="section-title">Общая статистика</h2>
                  {averageCountRespondsError || respondsStatusStatsError ? (
                    <div className="error">
                      {averageCountRespondsError && `Ошибка: ${averageCountRespondsError}`}
                      {respondsStatusStatsError && `Ошибка: ${respondsStatusStatsError}`}
                    </div>
                  ) : (
                    <div className="salary-stats">
                      {averageCountResponds !== null && (
                        <div className="stat-card">
                          <h3>Среднее количество откликов</h3>
                          <div className="stat-value">{formatCount(averageCountResponds)}</div>
                        </div>
                      )}
                      
                      {respondsStatusStats && (
                        <>
                          <div className="stat-card">
                            <h3>Всего откликов</h3>
                            <div className="stat-value">{formatCount(respondsStatusStats.total)}</div>
                          </div>
                          <div className="stat-card">
                            <h3>Ожидают</h3>
                            <div className="stat-value">{formatCount(respondsStatusStats.pending)}</div>
                          </div>
                          <div className="stat-card">
                            <h3>Приняты</h3>
                            <div className="stat-value">{formatCount(respondsStatusStats.accepted)}</div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Статистика зарплат откликов */}
                <div className="analytics-section section-full">
                  <h2 className="section-title">Статистика зарплат откликов</h2>
                  {averageMedianSalaryRespondsError ? (
                    <div className="error">Ошибка: {averageMedianSalaryRespondsError}</div>
                  ) : averageMedianSalaryResponds ? (
                    <div className="salary-stats">
                      <div className="stat-card">
                        <h3>Средняя зарплата</h3>
                        <div className="stat-value">{formatSalary(averageMedianSalaryResponds.averageSalary)}</div>
                      </div>
                      <div className="stat-card">
                        <h3>Медианная зарплата</h3>
                        <div className="stat-value">{formatSalary(averageMedianSalaryResponds.medianSalary)}</div>
                      </div>
                      <div className="stat-card">
                        <h3>Минимальная зарплата</h3>
                        <div className="stat-value">{formatSalary(averageMedianSalaryResponds.min || 0)}</div>
                      </div>
                      <div className="stat-card">
                        <h3>Максимальная зарплата</h3>
                        <div className="stat-value">{formatSalary(averageMedianSalaryResponds.max || 0)}</div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Статусы откликов */}
                <div className="analytics-section section-half">
                  <h2 className="section-title">Статусы откликов</h2>
                  {respondsStatusStatsError ? (
                    <div className="error">Ошибка: {respondsStatusStatsError}</div>
                  ) : statusData.length > 0 ? (
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => [formatCount(value), 'Количество']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : null}
                </div>

                {/* Средний возраст */}
                <div className="analytics-section section-half">
                  <h2 className="section-title">Средний возраст откликов</h2>
                  {averageAgeRespondsError ? (
                    <div className="error">Ошибка: {averageAgeRespondsError}</div>
                  ) : averageAgeResponds !== null ? (
                    <div className="salary-stats">
                      <div className="stat-card">
                        <h3>Средний возраст</h3>
                        <div className="stat-value">{averageAgeResponds?.toFixed(1) || 0} лет</div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Временная линия откликов */}
                <div className="analytics-section section-full">
                  <h2 className="section-title">Динамика откликов</h2>
                  {respondsTimelineError ? (
                    <div className="error">Ошибка: {respondsTimelineError}</div>
                  ) : respondsTimeline.length > 0 ? (
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={respondsTimeline}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={formatDate}
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number) => [formatCount(value), 'Количество']}
                            labelFormatter={(label) => `Дата: ${formatDate(label)}`}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="count" 
                            stroke="#D00E46" 
                            strokeWidth={3}
                            dot={{ fill: '#D00E46', strokeWidth: 2, r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
