import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../redux/store';
import {
  fetchAverageCountRespondsAction,
  fetchAverageMedianSalaryRespondsAction,
  fetchRespondsStatusStatsAction,
  fetchAverageAgeRespondsAction,
  fetchRespondsTimelineAction,
} from '../../redux/analytics/actions';
import {
  selectAverageCountResponds,
  selectAverageMedianSalaryResponds,
  selectRespondsStatusStats,
  selectAverageAgeResponds,
  selectRespondsTimeline,
  selectAverageCountRespondsLoading,
  selectAverageMedianSalaryRespondsLoading,
  selectRespondsStatusStatsLoading,
  selectAverageAgeRespondsLoading,
  selectRespondsTimelineLoading,
  selectAverageCountRespondsError,
  selectAverageMedianSalaryRespondsError,
  selectRespondsStatusStatsError,
  selectAverageAgeRespondsError,
  selectRespondsTimelineError,
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

const CompanyAnalytics: React.FC = () => {
  const dispatch = useTypedDispatch();

  // Данные
  const averageCountResponds = useSelector(selectAverageCountResponds);
  const averageMedianSalaryResponds = useSelector(selectAverageMedianSalaryResponds);
  const respondsStatusStats = useSelector(selectRespondsStatusStats);
  const averageAgeResponds = useSelector(selectAverageAgeResponds);
  const respondsTimeline = useSelector(selectRespondsTimeline);

  // Состояния загрузки
  const averageCountRespondsLoading = useSelector(selectAverageCountRespondsLoading);
  const averageMedianSalaryRespondsLoading = useSelector(selectAverageMedianSalaryRespondsLoading);
  const respondsStatusStatsLoading = useSelector(selectRespondsStatusStatsLoading);
  const averageAgeRespondsLoading = useSelector(selectAverageAgeRespondsLoading);
  const respondsTimelineLoading = useSelector(selectRespondsTimelineLoading);

  // Ошибки
  const averageCountRespondsError = useSelector(selectAverageCountRespondsError);
  const averageMedianSalaryRespondsError = useSelector(selectAverageMedianSalaryRespondsError);
  const respondsStatusStatsError = useSelector(selectRespondsStatusStatsError);
  const averageAgeRespondsError = useSelector(selectAverageAgeRespondsError);
  const respondsTimelineError = useSelector(selectRespondsTimelineError);

  useEffect(() => {
    dispatch(fetchAverageCountRespondsAction());
    dispatch(fetchAverageMedianSalaryRespondsAction());
    dispatch(fetchRespondsStatusStatsAction());
    dispatch(fetchAverageAgeRespondsAction());
    dispatch(fetchRespondsTimelineAction());
  }, [dispatch]);

  const formatSalary = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
  };

  const formatCount = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  // Подготовка данных для статусов откликов
  const statusData = respondsStatusStats ? [
    { name: 'Ожидают', value: respondsStatusStats.pending, color: '#FFB3BA' },
    { name: 'Приняты', value: respondsStatusStats.accepted, color: '#BAFFC9' },
    { name: 'Отклонены', value: respondsStatusStats.rejected, color: '#FFB3BA' },
  ] : [];

  const isLoading = averageCountRespondsLoading || 
    averageMedianSalaryRespondsLoading || 
    respondsStatusStatsLoading || 
    averageAgeRespondsLoading || 
    respondsTimelineLoading;

  if (isLoading) {
    return (
      <div className="company-analytics">
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
    <div className="company-analytics">
      <div className="container">
        <div className="wrapper">
          <h1 className="page-title">Аналитика откликов</h1>

          {/* Общая статистика */}
          <div className="analytics-section">
            <h2 className="section-title">Общая статистика</h2>
            <div className="stats-grid">
              {averageCountRespondsError ? (
                <div className="error">Ошибка: {averageCountRespondsError}</div>
              ) : averageCountResponds !== null ? (
                <div className="stat-card primary">
                  <h3>Среднее количество откликов</h3>
                  <div className="stat-value">{formatCount(averageCountResponds)}</div>
                </div>
              ) : null}

              {respondsStatusStatsError ? (
                <div className="error">Ошибка: {respondsStatusStatsError}</div>
              ) : respondsStatusStats ? (
                <div className="stat-card success">
                  <h3>Всего откликов</h3>
                  <div className="stat-value">{formatCount(respondsStatusStats.total)}</div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Статистика зарплат откликов */}
          <div className="analytics-section">
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
          <div className="analytics-section">
            <h2 className="section-title">Статусы откликов</h2>
            {respondsStatusStatsError ? (
              <div className="error">Ошибка: {respondsStatusStatsError}</div>
            ) : statusData.length > 0 ? (
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
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
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : null}
          </div>

          {/* Средний возраст */}
          <div className="analytics-section">
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
          <div className="analytics-section">
            <h2 className="section-title">Динамика откликов</h2>
            {respondsTimelineError ? (
              <div className="error">Ошибка: {respondsTimelineError}</div>
            ) : respondsTimeline.length > 0 ? (
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
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
                    <Legend />
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
        </div>
      </div>
    </div>
  );
};

export default CompanyAnalytics;
