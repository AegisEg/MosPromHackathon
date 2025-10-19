import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../../redux/store';
import { createVacancyAction, updateVacancyAction, getVacancyByIdAction } from '../../../redux/vacancy/actions';
import { getCompaniesAction } from '../../../redux/company/actions';
import { getProfessionsAction } from '../../../redux/profession/actions';
import { selectCompaniesData, selectCompaniesStatus } from '../../../redux/company/selectors';
import { selectProfessionsData, selectProfessionsStatus } from '../../../redux/profession/selectors';
import { selectCurrentVacancyData, selectCurrentVacancyStatus } from '../../../redux/vacancy/selectors';
import { LoadStatus } from '../../../utils/types';
import Button, { ButtonType } from '../../UI/Button';
import { getProfessionSkills } from '../../../api/profession';
import { BackendSkillData } from '../../../redux/profession/types';
import Loader from '../../default/Loader';
import './styles.scss';

interface VacancyFormProps {
    vacancyId?: number; // Если передан, то режим редактирования
    onSuccess?: () => void;
    onCancel?: () => void;
}

const VacancyForm: React.FC<VacancyFormProps> = ({ vacancyId, onSuccess, onCancel }) => {
    const dispatch = useTypedDispatch();
    const isEditMode = !!vacancyId;
    
    const companies = useSelector(selectCompaniesData);
    const companiesStatus = useSelector(selectCompaniesStatus);
    const professions = useSelector(selectProfessionsData);
    const professionsStatus = useSelector(selectProfessionsStatus);
    const currentVacancy = useSelector(selectCurrentVacancyData);
    const currentVacancyStatus = useSelector(selectCurrentVacancyStatus);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        companyId: 0,
        professionId: 0,
        employmentType: 'Полная занятость',
        experienceWide: 'Без опыта',
        salaryFrom: 0,
        salaryTo: 0,
        status: true,
        skills: [] as string[]
    });

    const [availableSkills, setAvailableSkills] = useState<BackendSkillData[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(getCompaniesAction());
        dispatch(getProfessionsAction());
        
        if (isEditMode && vacancyId) {
            dispatch(getVacancyByIdAction(vacancyId));
        }
    }, [dispatch, isEditMode, vacancyId]);

    useEffect(() => {
        if (isEditMode && currentVacancy) {
            console.log('Загружена вакансия для редактирования:', currentVacancy);
            console.log('ProfessionId вакансии:', currentVacancy.professionId);
            
            setFormData({
                title: currentVacancy.title || '',
                description: currentVacancy.description || '',
                companyId: currentVacancy.companyId || 0,
                professionId: currentVacancy.professionId || 0,
                employmentType: currentVacancy.employmentType || 'Полная занятость',
                experienceWide: currentVacancy.experienceWide || 'Без опыта',
                salaryFrom: currentVacancy.salaryFrom || 0,
                salaryTo: currentVacancy.salaryTo || 0,
                status: currentVacancy.status ?? true,
                skills: currentVacancy.skills || []
            });
            
            // Загружаем навыки для профессии при редактировании
            if (currentVacancy.professionId && currentVacancy.professionId > 0) {
                console.log('Загружаем навыки для профессии:', currentVacancy.professionId);
                loadSkills(currentVacancy.professionId);
            }
        }
    }, [isEditMode, currentVacancy]);

    const loadSkills = async (professionId: number) => {
        try {
            console.log('Загружаем навыки для профессии:', professionId);
            const skills = await getProfessionSkills(professionId);
            console.log('Загружены навыки:', skills);
            setAvailableSkills(skills);
        } catch (error) {
            console.error('Ошибка при загрузке навыков:', error);
            setAvailableSkills([]);
        }
    };

    const handleInputChange = (field: string, value: string | number | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Очищаем ошибку при изменении поля
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
        
        // Если изменилась профессия, загружаем навыки для неё
        if (field === 'professionId' && typeof value === 'number' && value > 0) {
            loadSkills(value);
            // Очищаем выбранные навыки при смене профессии
            setFormData(prev => ({ ...prev, skills: [] }));
        }
    };

    const handleSkillToggle = (skillName: string) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.includes(skillName)
                ? prev.skills.filter(name => name !== skillName)
                : [...prev.skills, skillName]
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Заголовок обязателен';
        } else if (formData.title.length > 255) {
            newErrors.title = 'Заголовок не должен превышать 255 символов';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Описание обязательно';
        } else if (formData.description.length < 10) {
            newErrors.description = 'Описание должно быть не менее 10 символов';
        }

        if (!formData.companyId) {
            newErrors.companyId = 'Выберите компанию';
        }

        if (!formData.professionId) {
            newErrors.professionId = 'Выберите профессию';
        }

        if (formData.salaryFrom < 0) {
            newErrors.salaryFrom = 'Зарплата не может быть отрицательной';
        }

        if (formData.salaryTo < 0) {
            newErrors.salaryTo = 'Зарплата не может быть отрицательной';
        }

        if (formData.salaryFrom > formData.salaryTo) {
            newErrors.salaryTo = 'Зарплата "до" должна быть больше зарплаты "от"';
        }

        if (formData.skills.length === 0) {
            newErrors.skills = 'Выберите хотя бы один навык';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            if (isEditMode && vacancyId) {
                await dispatch(updateVacancyAction({ id: vacancyId, ...formData })).unwrap();
            } else {
                await dispatch(createVacancyAction(formData)).unwrap();
            }
            onSuccess?.();
        } catch (error) {
            console.error('Ошибка при сохранении вакансии:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (companiesStatus === LoadStatus.IN_PROGRESS || professionsStatus === LoadStatus.IN_PROGRESS) {
        return (
            <div className="vacancy-form">
                <div className="loading-container">
                    <Loader />
                    <p>Загрузка данных...</p>
                </div>
            </div>
        );
    }

    if (isEditMode && currentVacancyStatus === LoadStatus.IN_PROGRESS) {
        return (
            <div className="vacancy-form">
                <div className="loading-container">
                    <Loader />
                </div>
            </div>
        );
    }

    return (
        <div className="vacancy-form">
            <div className="vacancy-form__content">
                <h1 className="vacancy-form__title">
                    {isEditMode ? 'Редактирование вакансии' : 'Создание вакансии'}
                </h1>
                
                <div className="form-container">
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                Заголовок вакансии*
                            </label>
                            <input
                                type="text"
                                className={`form-input ${errors.title ? 'error' : ''}`}
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Введите заголовок вакансии"
                            />
                            {errors.title && <span className="error-message">{errors.title}</span>}
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">
                                Компания*
                            </label>
                            <select
                                className={`form-select ${errors.companyId ? 'error' : ''}`}
                                value={formData.companyId}
                                onChange={(e) => handleInputChange('companyId', parseInt(e.target.value))}
                            >
                                <option value={0}>Выберите компанию</option>
                                {companies.map(company => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                            {errors.companyId && <span className="error-message">{errors.companyId}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                Профессия*
                            </label>
                            <select
                                className={`form-select ${errors.professionId ? 'error' : ''}`}
                                value={formData.professionId}
                                onChange={(e) => handleInputChange('professionId', parseInt(e.target.value))}
                            >
                                <option value={0}>Выберите профессию</option>
                                {professions.map(profession => (
                                    <option key={profession.id} value={profession.id}>
                                        {profession.name}
                                    </option>
                                ))}
                            </select>
                            {errors.professionId && <span className="error-message">{errors.professionId}</span>}
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">
                                Тип занятости*
                            </label>
                            <select
                                className="form-select"
                                value={formData.employmentType}
                                onChange={(e) => handleInputChange('employmentType', parseInt(e.target.value))}
                            >
                                <option value={1}>Полная занятость</option>
                                <option value={2}>Частичная занятость</option>
                                <option value={3}>Договор</option>
                                <option value={4}>Стажировка</option>
                                <option value={5}>Фриланс</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                Опыт работы*
                            </label>
                            <select
                                className="form-select"
                                value={formData.experienceWide}
                                onChange={(e) => handleInputChange('experienceWide', parseInt(e.target.value))}
                            >
                                <option value={0}>Без опыта</option>
                                <option value={12}>1 год</option>
                                <option value={36}>3 года</option>
                                <option value={60}>5 лет</option>
                                <option value={120}>10+ лет</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">
                                Размер заработной платы*
                            </label>
                            <div className="salary-inputs">
                                <input
                                    type="number"
                                    className={`form-input ${errors.salaryFrom ? 'error' : ''}`}
                                    value={formData.salaryFrom || ''}
                                    onChange={(e) => handleInputChange('salaryFrom', parseInt(e.target.value) || 0)}
                                    placeholder="От"
                                    min="0"
                                />
                                <input
                                    type="number"
                                    className={`form-input ${errors.salaryTo ? 'error' : ''}`}
                                    value={formData.salaryTo || ''}
                                    onChange={(e) => handleInputChange('salaryTo', parseInt(e.target.value) || 0)}
                                    placeholder="До"
                                    min="0"
                                />
                            </div>
                            {(errors.salaryFrom || errors.salaryTo) && (
                                <span className="error-message">{errors.salaryFrom || errors.salaryTo}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Введите описание вакансии*
                        </label>
                        <div className="rich-text-editor">
                            <div className="editor-toolbar">
                                <button type="button" className="toolbar-btn">B</button>
                                <button type="button" className="toolbar-btn">I</button>
                                <button type="button" className="toolbar-btn">U</button>
                                <button type="button" className="toolbar-btn">A</button>
                                <button type="button" className="toolbar-btn">H1-</button>
                                <button type="button" className="toolbar-btn">•</button>
                                <button type="button" className="toolbar-btn">1.</button>
                            </div>
                            <textarea
                                className={`form-textarea ${errors.description ? 'error' : ''}`}
                                placeholder="Введите полное описание вакансии, для разбивки используйте заголовки и маркированный список"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                rows={8}
                            />
                        </div>
                        {errors.description && <span className="error-message">{errors.description}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Навыки*
                        </label>
                        <div className="skills-section">
                            <div className="skills-grid">
                                {formData.professionId === 0 ? (
                                    <div style={{ color: '#666', fontStyle: 'italic' }}>
                                        Сначала выберите профессию
                                    </div>
                                ) : availableSkills.length > 0 ? (
                                    availableSkills.map(skill => (
                                        <div
                                            key={skill.id}
                                            className={`skill-tag ${formData.skills.includes(skill.name) ? 'selected' : ''}`}
                                            onClick={() => handleSkillToggle(skill.name)}
                                        >
                                            {skill.name}
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ color: '#666', fontStyle: 'italic' }}>
                                        Загрузка навыков...
                                    </div>
                                )}
                            </div>
                            {errors.skills && <span className="error-message">{errors.skills}</span>}
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    {onCancel && (
                        <Button
                            variant={ButtonType.OUTLINE}
                            onClick={onCancel}
                        >
                            Отмена
                        </Button>
                    )}
                    <Button
                        variant={ButtonType.OUTLINE}
                        onClick={() => {/* Предпросмотр */}}
                    >
                        Предпросмотр
                    </Button>
                    <Button
                        variant={ButtonType.OUTLINE}
                        onClick={() => {/* В черновик */}}
                    >
                        В черновик
                    </Button>
                    <Button
                        variant={ButtonType.RED}
                        onClick={handleSubmit}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        {isLoading 
                            ? (isEditMode ? 'Сохранение...' : 'Создание...') 
                            : (isEditMode ? 'Сохранить изменения' : 'Создать вакансию')
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VacancyForm;
