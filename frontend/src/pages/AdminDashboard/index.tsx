import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/user/selectors';
import { UserRoleLabels } from '../../enums/UserRole';
import { LoadStatus } from '../../utils/types';
import Loader from '../../components/default/Loader';
import Button, { ButtonType } from '../../components/UI/Button';
import './style.scss';

const AdminDashboard: React.FC = () => {
    const { data: userData, status } = useSelector(selectUserData);

    if (status === LoadStatus.IN_PROGRESS) {
        return <Loader />;
    }

    return (
        <div className="admin-dashboard-page">
            <div className="container">
                <div className="wrapper">
                    <h1 className="admin-dashboard-page__title">
                        Личный кабинет администратора
                    </h1>

                    <div className="admin-dashboard-page__content">
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
                                    <div className="stat-card__icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-card__info">
                                        <div className="stat-card__value">0</div>
                                        <div className="stat-card__label">Пользователей</div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card dashboard-card--stat">
                                <div className="stat-card">
                                    <div className="stat-card__icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-card__info">
                                        <div className="stat-card__value">0</div>
                                        <div className="stat-card__label">Компаний</div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card dashboard-card--stat">
                                <div className="stat-card">
                                    <div className="stat-card__icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M8 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-card__info">
                                        <div className="stat-card__value">0</div>
                                        <div className="stat-card__label">Вакансий</div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card dashboard-card--stat">
                                <div className="stat-card">
                                    <div className="stat-card__icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-card__info">
                                        <div className="stat-card__value">0</div>
                                        <div className="stat-card__label">Активность</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-card dashboard-card--actions">
                            <h2 className="dashboard-card__title">Быстрые действия</h2>
                            <div className="quick-actions">
                                <Button variant={ButtonType.RED} onClick={() => console.log('Управление пользователями')}>
                                    Управление пользователями
                                </Button>
                                <Button variant={ButtonType.BLACK} onClick={() => console.log('Модерация')}>
                                    Модерация
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
