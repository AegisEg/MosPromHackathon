import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/user/selectors';
import { UserRoleLabels } from '../../enums/UserRole';
import { LoadStatus } from '../../utils/types';
import Loader from '../../components/default/Loader';
import './style.scss';

const JobSeekerDashboard: React.FC = () => {
    const { data: userData, status } = useSelector(selectUserData);

    if (status === LoadStatus.IN_PROGRESS) {
        return <Loader />;
    }

    return (
        <div className="job-seeker-dashboard-page">
            <div className="container">
                <div className="wrapper">
                    <h1 className="job-seeker-dashboard-page__title">
                        Личный кабинет соискателя
                    </h1>

                    <div className="job-seeker-dashboard-page__content">
                        {/* Карточка с информацией о пользователе */}
                        <div className="dashboard-card dashboard-card--user">
                            <h2 className="dashboard-card__title">Личная информация</h2>
                            <div className="dashboard-card__content">
                                <div className="user-info">
                                    <div className="user-info__avatar">
                                        <div className="avatar-placeholder">
                                            {userData?.firstName?.charAt(0) || 'П'}
                                            {userData?.lastName?.charAt(0) || 'П'}
                                        </div>
                                    </div>
                                    <div className="user-info__details">
                                        <div className="user-info__row">
                                            <span className="user-info__label">ФИО:</span>
                                            <span className="user-info__value">
                                                {userData?.lastName || 'Не указана'} {userData?.firstName || ''} {userData?.middleName || ''}
                                            </span>
                                        </div>
                                        <div className="user-info__row">
                                            <span className="user-info__label">Email:</span>
                                            <span className="user-info__value">{userData?.email || 'Не указан'}</span>
                                        </div>
                                        <div className="user-info__row">
                                            <span className="user-info__label">Роль:</span>
                                            <span className="user-info__value">
                                                {userData?.role ? UserRoleLabels[userData.role] : 'Не указана'}
                                            </span>
                                        </div>
                                        <div className="user-info__row">
                                            <span className="user-info__label">Статус:</span>
                                            <span className={`user-info__value user-info__value--status ${userData?.isActive ? 'active' : 'inactive'}`}>
                                                {userData?.isActive ? 'Активен' : 'Неактивен'}
                                            </span>
                                        </div>
                                        {userData?.emailVerifiedAt && (
                                            <div className="user-info__row">
                                                <span className="user-info__label">Email подтвержден:</span>
                                                <span className="user-info__value">
                                                    {new Date(userData.emailVerifiedAt).toLocaleDateString('ru-RU')}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Статистика */}
                        <div className="dashboard-stats">
                            <div className="dashboard-card dashboard-card--stat">
                                <div className="stat-card">
                                    <div className="stat-card__icon stat-card__icon--blue">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-card__info">
                                        <div className="stat-card__value">0</div>
                                        <div className="stat-card__label">Резюме</div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card dashboard-card--stat">
                                <div className="stat-card">
                                    <div className="stat-card__icon stat-card__icon--green">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-card__info">
                                        <div className="stat-card__value">0</div>
                                        <div className="stat-card__label">Откликов</div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card dashboard-card--stat">
                                <div className="stat-card">
                                    <div className="stat-card__icon stat-card__icon--purple">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-card__info">
                                        <div className="stat-card__value">0</div>
                                        <div className="stat-card__label">Приглашений</div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card dashboard-card--stat">
                                <div className="stat-card">
                                    <div className="stat-card__icon stat-card__icon--orange">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-card__info">
                                        <div className="stat-card__value">0</div>
                                        <div className="stat-card__label">Просмотров</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Быстрые действия */}
                        <div className="dashboard-card dashboard-card--actions">
                            <h2 className="dashboard-card__title">Быстрые действия</h2>
                            <div className="dashboard-card__content">
                                <div className="quick-actions">
                                    <button className="quick-action-btn">
                                        <span className="quick-action-btn__icon">+</span>
                                        <span className="quick-action-btn__text">Создать резюме</span>
                                    </button>
                                    <button className="quick-action-btn">
                                        <span className="quick-action-btn__icon">🔍</span>
                                        <span className="quick-action-btn__text">Найти вакансии</span>
                                    </button>
                                    <button className="quick-action-btn">
                                        <span className="quick-action-btn__icon">📊</span>
                                        <span className="quick-action-btn__text">Мои отклики</span>
                                    </button>
                                    <button className="quick-action-btn">
                                        <span className="quick-action-btn__icon">⚙️</span>
                                        <span className="quick-action-btn__text">Настройки</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Недавняя активность */}
                        <div className="dashboard-card dashboard-card--activity">
                            <h2 className="dashboard-card__title">Недавняя активность</h2>
                            <div className="dashboard-card__content">
                                <div className="activity-empty">
                                    <div className="activity-empty__icon">📋</div>
                                    <div className="activity-empty__text">Активности пока нет</div>
                                    <div className="activity-empty__subtext">
                                        Создайте резюме и начните откликаться на вакансии
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerDashboard;
