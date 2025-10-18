import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/user/selectors';
import { UserRoleLabels } from '../../enums/UserRole';
import { LoadStatus } from '../../utils/types';
import Loader from '../../components/default/Loader';
import Button, { ButtonType } from '../../components/UI/Button';
import './style.scss';

const InstituteDashboard: React.FC = () => {
    const { data: userData, status } = useSelector(selectUserData);

    if (status === LoadStatus.IN_PROGRESS) {
        return <Loader />;
    }

    return (
        <div className="institute-dashboard-page">
            <div className="container">
                <div className="wrapper">
                    <h1 className="institute-dashboard-page__title">
                        Личный кабинет института
                    </h1>

                    <div className="institute-dashboard-page__content">
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
                                            <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-card__info">
                                        <div className="stat-card__value">0</div>
                                        <div className="stat-card__label">Студентов</div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card dashboard-card--stat">
                                <div className="stat-card">
                                    <div className="stat-card__icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 10V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 3L2 7L12 11L22 7L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-card__info">
                                        <div className="stat-card__value">0</div>
                                        <div className="stat-card__label">Стажировок</div>
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
                                        <div className="stat-card__label">Партнеров</div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card dashboard-card--stat">
                                <div className="stat-card">
                                    <div className="stat-card__icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-card__info">
                                        <div className="stat-card__value">0</div>
                                        <div className="stat-card__label">Трудоустроено</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-card dashboard-card--actions">
                            <h2 className="dashboard-card__title">Быстрые действия</h2>
                            <div className="quick-actions">
                                <Button variant={ButtonType.RED} onClick={() => console.log('Создать стажировку')}>
                                    Создать стажировку
                                </Button>
                                <Button variant={ButtonType.BLACK} onClick={() => console.log('Управление студентами')}>
                                    Управление студентами
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstituteDashboard;
