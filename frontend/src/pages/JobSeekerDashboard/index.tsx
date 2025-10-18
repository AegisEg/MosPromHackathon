import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../../redux/store';
import { selectUserData } from '../../redux/user/selectors';
import {
    selectResumesData,
    selectResumesStatus,
    selectDeleteResumeStatus,
    selectDeleteResumeError
} from '../../redux/resume/selectors';
import {
    getUserResumesAction,
    deleteResumeAction
} from '../../redux/resume/actions';
import { UserRoleLabels } from '../../enums/UserRole';
import { LoadStatus } from '../../utils/types';
import { ResumeData } from '../../redux/resume/types';
import Loader from '../../components/default/Loader';
import Button, { ButtonType } from '../../components/UI/Button';
import { 
    Add as AddIcon,
    Visibility as VisibilityIcon,
    Description as DescriptionIcon,
    Work as WorkIcon,
    School as SchoolIcon,
    BarChart as BarChartIcon,
    Edit as EditIcon,
    CheckCircle as CheckCircleIcon,
    SmartToy as SmartToyIcon
} from '@mui/icons-material';
import './style.scss';
import PanelBlock from '../../components/default/PanelBlock';

const JobSeekerDashboard: React.FC = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const { data: userData, status } = useSelector(selectUserData);

    // Redux selectors
    const resumes = useSelector(selectResumesData);
    const resumesStatus = useSelector(selectResumesStatus);
    const deleteResumeStatus = useSelector(selectDeleteResumeStatus);
    const deleteResumeError = useSelector(selectDeleteResumeError);

    // Загружаем резюме при монтировании
    useEffect(() => {
        dispatch(getUserResumesAction());
    }, [dispatch]);

    const handleDeleteResume = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить это резюме?')) {
            try {
                await dispatch(deleteResumeAction(id)).unwrap();
                alert('Резюме успешно удалено');
                // Обновляем только список резюме
                dispatch(getUserResumesAction());
            } catch (error) {
                alert(deleteResumeError || 'Ошибка при удалении резюме');
            }
        }
    };

    const handleEditResume = (resume: ResumeData) => {
        // Перенаправляем на страницу редактирования с ID резюме
        navigate(`/lk/resume/edit/${resume.id}`);
    };

    const panelBlockArray = [
        {
            icon: <AddIcon />,
            title: "Создание резюме",
            onClick: () => navigate('/lk/resume/create')
        },
        {
            icon: <VisibilityIcon />,
            title: "Просмотр откликов",
            onClick: () => console.log('Просмотр откликов')
        },
        {
            icon: <DescriptionIcon />,
            title: "Ваши резюме",
            onClick: () => console.log('Ваши резюме')
        },
        {
            icon: <WorkIcon />,
            title: "Вакансии",
            onClick: () => navigate('/vacancies')
        },
        {
            icon: <SchoolIcon />,
            title: "Стажировки",
            onClick: () => navigate('/internships')
        },
        {
            icon: <BarChartIcon />,
            title: "Аналитика",
            onClick: () => console.log('Аналитика')
        },
        {
            icon: <EditIcon />,
            title: "Черновики",
            onClick: () => console.log('Черновики')
        },
        {
            icon: <CheckCircleIcon />,
            title: "Подтверждение навыков",
            onClick: () => console.log('Подтверждение навыков')
        },
        {
            icon: <SmartToyIcon />,
            title: "ИИ агент",
            onClick: () => navigate('/chat')
        }
    ];

    if (status === LoadStatus.IN_PROGRESS) {
        return <Loader />;
    }

    console.log('resumes', resumes);

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

                        <div className="dashboard-card dashboard-card--panel">
                            <h2 className="dashboard-card__title">Панель управления</h2>
                            <div className="panel-blocks-grid">
                                {panelBlockArray.map((block) => (
                                    <PanelBlock key={block.title} icon={block.icon} title={block.title} onClick={block.onClick} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default JobSeekerDashboard;
