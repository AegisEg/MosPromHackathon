import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../redux/store';
import { selectUserData } from '../../redux/user/selectors';
import {
    selectResumesData,
    selectResumesStatus,
    selectCreateResumeStatus,
    selectCreateResumeError,
    selectUpdateResumeStatus,
    selectUpdateResumeError,
    selectDeleteResumeStatus,
    selectDeleteResumeError
} from '../../redux/resume/selectors';
import {
    getUserResumesAction,
    createResumeAction,
    updateResumeAction,
    deleteResumeAction
} from '../../redux/resume/actions';
import { UserRoleLabels } from '../../enums/UserRole';
import { LoadStatus } from '../../utils/types';
import { ResumeData, CreateResumePayload, UpdateResumePayload } from '../../redux/resume/types';
import Loader from '../../components/default/Loader';
import Button, { ButtonType } from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Checkbox from '../../components/UI/Checkbox';
import { selectProfessionsData, selectCurrentProfessionSkillsData } from '../../redux/profession/selectors';
import { getProfessionsAction, getProfessionSkillsAction } from '../../redux/profession/actions';
import './style.scss';

const JobSeekerDashboard: React.FC = () => {
    const dispatch = useTypedDispatch();
    const { data: userData, status } = useSelector(selectUserData);

    // Redux selectors
    const resumes = useSelector(selectResumesData);
    const resumesStatus = useSelector(selectResumesStatus);
    const createResumeStatus = useSelector(selectCreateResumeStatus);
    const createResumeError = useSelector(selectCreateResumeError);
    const updateResumeStatus = useSelector(selectUpdateResumeStatus);
    const updateResumeError = useSelector(selectUpdateResumeError);
    const deleteResumeStatus = useSelector(selectDeleteResumeStatus);
    const deleteResumeError = useSelector(selectDeleteResumeError);

    const professions = useSelector(selectProfessionsData);
    const currentProfessionSkills = useSelector(selectCurrentProfessionSkillsData);

    // Состояния для модальных окон
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingResume, setEditingResume] = useState<ResumeData | null>(null);

    // Состояния для формы резюме
    const [formData, setFormData] = useState<CreateResumePayload>({
        dateOfBirth: '',
        city: '',
        country: '',
        education: '',
        phone: '',
        about: '',
        professionId: 0,
        salary: 0,
        status: true,
        skills: [],
        educations: [],
        experiences: [],
    });

    // Загружаем профессии и резюме при монтировании
    useEffect(() => {
        dispatch(getProfessionsAction());
        dispatch(getUserResumesAction());
    }, [dispatch]);

    // Функции для работы с формой
    const resetForm = () => {
        setFormData({
            dateOfBirth: '',
            city: '',
            country: '',
            education: '',
            phone: '',
            about: '',
            professionId: 0,
            salary: 0,
            status: true,
            skills: [],
            educations: [],
            experiences: [],
        });
    };

    const handleInputChange = (field: keyof CreateResumePayload, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleProfessionChange = (option: any) => {
        if (option && option.value) {
            const professionId = parseInt(option.value);
            handleInputChange('professionId', professionId);
            dispatch(getProfessionSkillsAction(professionId));
        } else {
            handleInputChange('professionId', 0);
        }
    };

    const handleSkillToggle = (skillId: number) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills?.includes(skillId)
                ? prev.skills.filter(id => id !== skillId)
                : [...(prev.skills || []), skillId]
        }));
    };

    // Функции для CRUD операций
    const handleCreateResume = async () => {
        if (!formData.dateOfBirth.trim()) {
            alert('Дата рождения обязательна');
            return;
        }
        if (!formData.city.trim()) {
            alert('Город обязателен');
            return;
        }
        if (!formData.country.trim()) {
            alert('Страна обязательна');
            return;
        }
        if (!formData.phone.trim()) {
            alert('Телефон обязателен');
            return;
        }
        if (!formData.about.trim()) {
            alert('Информация о себе обязательна');
            return;
        }
        if (formData.professionId === 0) {
            alert('Выберите профессию');
            return;
        }

        try {
            await dispatch(createResumeAction(formData)).unwrap();
            alert('Резюме успешно создано');
            setIsCreateModalOpen(false);
            resetForm();
            // Обновляем только список резюме
            dispatch(getUserResumesAction());
        } catch (error) {
            alert(createResumeError || 'Ошибка при создании резюме');
        }
    };

    const handleUpdateResume = async () => {
        if (!editingResume?.id) {
            alert('Резюме не выбрано');
            return;
        }

        try {
            const updatePayload: UpdateResumePayload = {
                id: editingResume.id,
                ...formData,
            };
            await dispatch(updateResumeAction(updatePayload)).unwrap();
            alert('Резюме успешно обновлено');
            setIsEditModalOpen(false);
            setEditingResume(null);
            resetForm();
            // Обновляем только список резюме
            dispatch(getUserResumesAction());
        } catch (error) {
            alert(updateResumeError || 'Ошибка при обновлении резюме');
        }
    };

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
        setEditingResume(resume);
        setFormData({
            dateOfBirth: resume.dateOfBirth || '',
            city: resume.city || '',
            country: resume.country || '',
            education: resume.education || '',
            phone: resume.phone || '',
            about: resume.about || '',
            professionId: resume.professionId || 0,
            salary: resume.salary || 0,
            status: resume.status ?? true,
            skills: resume.skills || [],
            educations: resume.educations || [],
            experiences: resume.experiences || [],
        });
        
        // Загружаем навыки для выбранной профессии
        if (resume.professionId) {
            dispatch(getProfessionSkillsAction(resume.professionId));
        }
        
        setIsEditModalOpen(true);
    };

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

                        {/* Секция резюме */}
                        <div className="dashboard-card dashboard-card--resume">
                            <div className="resume-header">
                                <h2 className="dashboard-card__title">Мои резюме</h2>
                                <Button
                                    variant={ButtonType.RED}
                                    onClick={() => setIsCreateModalOpen(true)}
                                >
                                    Создать резюме
                                </Button>
                            </div>

                            {resumesStatus === LoadStatus.IN_PROGRESS ? (
                                <div className="resumes-loading">
                                    <p>Загрузка резюме...</p>
                                </div>
                            ) : resumes.length > 0 ? (
                                <div className="resumes-list">
                                    {resumes.map((resume) => (
                                        <div key={resume.id} className="resume-card">
                                            <div className="resume-card__content">
                                                   <h3 className="resume-card__title">
                                                       {resume.profession || 'Резюме'}
                                                   </h3>
                                                <div className="resume-card__details">
                                                    <p><strong>Город:</strong> {resume.city}</p>
                                                    <p><strong>Страна:</strong> {resume.country}</p>
                                                    <p><strong>Телефон:</strong> {resume.phone}</p>
                                                    {resume.salary && (
                                                        <p><strong>Желаемая зарплата:</strong> {resume.salary.toLocaleString()} ₽</p>
                                                    )}
                                                    <p><strong>Статус:</strong>
                                                        <span className={`status ${resume.status ? 'active' : 'inactive'}`}>
                                                            {resume.status ? 'Активно' : 'Неактивно'}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="resume-card__actions">
                                                    <Button
                                                        variant={ButtonType.BLACK}
                                                        onClick={() => handleEditResume(resume)}
                                                    >
                                                        Редактировать
                                                    </Button>
                                                    <Button
                                                        variant={ButtonType.GRAY}
                                                        onClick={() => handleDeleteResume(resume.id!)}
                                                    >
                                                        Удалить
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-resume">
                                    <p>У вас пока нет резюме</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальное окно создания резюме */}
            {isCreateModalOpen && (
                <div className="modal-overlay" onClick={() => setIsCreateModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Создать резюме</h2>
                            <button
                                className="modal-close"
                                onClick={() => setIsCreateModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <Input
                                    label="Дата рождения"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(value) => handleInputChange('dateOfBirth', value)}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    label="Город"
                                    value={formData.city}
                                    onChange={(value) => handleInputChange('city', value)}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    label="Страна"
                                    value={formData.country}
                                    onChange={(value) => handleInputChange('country', value)}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    label="Телефон"
                                    value={formData.phone}
                                    onChange={(value) => handleInputChange('phone', value)}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    label="Образование"
                                    value={formData.education}
                                    onChange={(value) => handleInputChange('education', value)}
                                />
                            </div>

                            <div className="form-group">
                                <Select
                                    label="Профессия"
                                    options={professions.map(prof => ({
                                        value: prof.id.toString(),
                                        label: prof.name
                                    }))}
                                    value={formData.professionId ? {
                                        value: formData.professionId.toString(),
                                        label: professions.find(p => p.id === formData.professionId)?.name || ''
                                    } : undefined}
                                    onChange={handleProfessionChange}
                                    placeholder="Выберите профессию"
                                />
                            </div>

                            {formData.professionId > 0 && currentProfessionSkills.length > 0 && (
                                <div className="skills-section">
                                    <label className="skills-section__label">Навыки</label>
                                    <div className="skills-section__checkboxes">
                                        {currentProfessionSkills.map(skill => (
                                            <Checkbox
                                                key={skill.id}
                                                label={skill.name}
                                                checked={formData.skills?.includes(skill.id) || false}
                                                onChange={() => handleSkillToggle(skill.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <Input
                                    label="Желаемая зарплата"
                                    type="number"
                                    value={formData.salary?.toString() || ''}
                                    onChange={(value) => handleInputChange('salary', parseInt(value) || 0)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="textarea-label">О себе</label>
                                <textarea
                                    className="textarea-input"
                                    value={formData.about}
                                    onChange={(e) => handleInputChange('about', e.target.value)}
                                    rows={4}
                                    placeholder="Расскажите о себе, своих навыках и опыте..."
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <Button
                                variant={ButtonType.GRAY}
                                onClick={() => setIsCreateModalOpen(false)}
                            >
                                Отмена
                            </Button>
                            <Button
                                onClick={handleCreateResume}
                                disabled={createResumeStatus === LoadStatus.IN_PROGRESS}
                            >
                                {createResumeStatus === LoadStatus.IN_PROGRESS ? 'Создание...' : 'Создать'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно редактирования резюме */}
            {isEditModalOpen && editingResume && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Редактировать резюме</h2>
                            <button
                                className="modal-close"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <Input
                                    label="Дата рождения"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(value) => handleInputChange('dateOfBirth', value)}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    label="Город"
                                    value={formData.city}
                                    onChange={(value) => handleInputChange('city', value)}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    label="Страна"
                                    value={formData.country}
                                    onChange={(value) => handleInputChange('country', value)}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    label="Телефон"
                                    value={formData.phone}
                                    onChange={(value) => handleInputChange('phone', value)}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    label="Образование"
                                    value={formData.education}
                                    onChange={(value) => handleInputChange('education', value)}
                                />
                            </div>

                            <div className="form-group">
                                <Select
                                    label="Профессия"
                                    options={professions.map(prof => ({
                                        value: prof.id.toString(),
                                        label: prof.name
                                    }))}
                                    value={formData.professionId ? {
                                        value: formData.professionId.toString(),
                                        label: professions.find(p => p.id === formData.professionId)?.name || ''
                                    } : undefined}
                                    onChange={handleProfessionChange}
                                    placeholder="Выберите профессию"
                                />
                            </div>

                            {formData.professionId > 0 && currentProfessionSkills.length > 0 && (
                                <div className="skills-section">
                                    <label className="skills-section__label">Навыки</label>
                                    <div className="skills-section__checkboxes">
                                        {currentProfessionSkills.map(skill => (
                                            <Checkbox
                                                key={skill.id}
                                                label={skill.name}
                                                checked={formData.skills?.includes(skill.id) || false}
                                                onChange={() => handleSkillToggle(skill.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <Input
                                    label="Желаемая зарплата"
                                    type="number"
                                    value={formData.salary?.toString() || ''}
                                    onChange={(value) => handleInputChange('salary', parseInt(value) || 0)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="textarea-label">О себе</label>
                                <textarea
                                    className="textarea-input"
                                    value={formData.about}
                                    onChange={(e) => handleInputChange('about', e.target.value)}
                                    rows={4}
                                    placeholder="Расскажите о себе, своих навыках и опыте..."
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <Button
                                variant={ButtonType.GRAY}
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Отмена
                            </Button>
                            <Button
                                onClick={handleUpdateResume}
                                disabled={updateResumeStatus === LoadStatus.IN_PROGRESS}
                            >
                                {updateResumeStatus === LoadStatus.IN_PROGRESS ? 'Сохранение...' : 'Сохранить'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobSeekerDashboard;
