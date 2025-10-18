import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../redux/store';
import { 
    selectCompaniesData, 
    selectCompaniesStatus, 
    selectCreateCompany,
    selectUpdateCompany,
    selectDeleteCompany
} from '../../redux/company/selectors';
import { 
    selectVacanciesData, 
    selectVacanciesStatus, 
    selectCreateVacancy,
    selectUpdateVacancy,
    selectDeleteVacancy
} from '../../redux/vacancy/selectors';
import { 
    selectProfessionsData, 
    selectProfessionsStatus,
    selectCurrentProfessionSkillsData,
    selectCurrentProfessionSkillsStatus
} from '../../redux/profession/selectors';
import { 
    getCompaniesAction, 
    createCompanyAction, 
    updateCompanyAction, 
    deleteCompanyAction 
} from '../../redux/company/actions';
import { 
    getVacanciesAction, 
    createVacancyAction, 
    updateVacancyAction, 
    deleteVacancyAction 
} from '../../redux/vacancy/actions';
import { 
    getProfessionsAction,
    getProfessionSkillsAction
} from '../../redux/profession/actions';
import { LoadStatus } from '../../utils/types';
import { CompanyData, CreateCompanyPayload, UpdateCompanyPayload } from '../../redux/company/types';
import { VacancyData, CreateVacancyPayload, UpdateVacancyPayload, EmploymentType, ExperienceLevel } from '../../redux/vacancy/types';
import { ProfessionData, SkillData } from '../../redux/profession/types';
import Button, { ButtonType } from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Checkbox from '../../components/UI/Checkbox';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import './style.scss';

const EmployerDashboard: React.FC = () => {
    const dispatch = useTypedDispatch();
    
    const companies = useSelector(selectCompaniesData);
    const companiesStatus = useSelector(selectCompaniesStatus);
    const createCompanyState = useSelector(selectCreateCompany);
    const updateCompanyState = useSelector(selectUpdateCompany);
    const deleteCompanyState = useSelector(selectDeleteCompany);

    const vacancies = useSelector(selectVacanciesData);
    const vacanciesStatus = useSelector(selectVacanciesStatus);
    const createVacancyState = useSelector(selectCreateVacancy);
    const updateVacancyState = useSelector(selectUpdateVacancy);
    const deleteVacancyState = useSelector(selectDeleteVacancy);

    const professions = useSelector(selectProfessionsData);
    const professionsStatus = useSelector(selectProfessionsStatus);
    const currentProfessionSkills = useSelector(selectCurrentProfessionSkillsData);
    const currentProfessionSkillsStatus = useSelector(selectCurrentProfessionSkillsStatus);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCompany, setEditingCompany] = useState<CompanyData | null>(null);

    const [isCreateVacancyModalOpen, setIsCreateVacancyModalOpen] = useState(false);
    const [isEditVacancyModalOpen, setIsEditVacancyModalOpen] = useState(false);
    const [editingVacancy, setEditingVacancy] = useState<VacancyData | null>(null);

    // Форма для создания/редактирования компании
    const [formData, setFormData] = useState<CreateCompanyPayload>({
        name: '',
        description: '',
        website: '',
        size: undefined,
        city: '',
        country: '',
        logoUrl: '',
    });

    // Форма для создания/редактирования вакансии
    const [vacancyFormData, setVacancyFormData] = useState<CreateVacancyPayload>({
        title: '',
        description: '',
        companyId: 0,
        professionId: 0,
        employmentType: EmploymentType.FULL_TIME,
        experienceWide: ExperienceLevel.NO_EXPERIENCE,
        salaryFrom: 0,
        salaryTo: 0,
        status: true,
        skills: [],
    });

    useEffect(() => {
        dispatch(getCompaniesAction());
        dispatch(getVacanciesAction());
        dispatch(getProfessionsAction());
    }, [dispatch]);


    useEffect(() => {
        console.log('vacancies', vacancies);
    }, [vacancies]);

    const handleCreateCompany = async () => {
        if (!formData.name.trim()) {
            showErrorToast('Название компании обязательно');
            return;
        }

        try {
            await dispatch(createCompanyAction(formData)).unwrap();
            showSuccessToast('Компания успешно создана');
            setIsCreateModalOpen(false);
            resetForm();
        } catch (error) {
            showErrorToast(createCompanyState.error || 'Ошибка при создании компании');
        }
    };

    useEffect(() => {
        console.log('companies', companies);
    }, [companies]);

    const handleUpdateCompany = async () => {
        if (!editingCompany?.id || !formData.name.trim()) {
            showErrorToast('Название компании обязательно');
            return;
        }

        try {
            const updatePayload: UpdateCompanyPayload = {
                id: editingCompany.id,
                ...formData,
            };
            await dispatch(updateCompanyAction(updatePayload)).unwrap();
            showSuccessToast('Компания успешно обновлена');
            setIsEditModalOpen(false);
            setEditingCompany(null);
            resetForm();
        } catch (error) {
            showErrorToast(updateCompanyState.error || 'Ошибка при обновлении компании');
        }
    };

    const handleDeleteCompany = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить эту компанию?')) {
            try {
                await dispatch(deleteCompanyAction(id)).unwrap();
                showSuccessToast('Компания успешно удалена');
            } catch (error) {
                showErrorToast(deleteCompanyState.error || 'Ошибка при удалении компании');
            }
        }
    };

    const handleEditCompany = (company: CompanyData) => {
        setEditingCompany(company);
        setFormData({
            name: company.name || '',
            description: company.description || '',
            website: company.website || '',
            size: company.size,
            city: company.city || '',
            country: company.country || '',
            logoUrl: company.logoUrl || '',
        });
        setIsEditModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            website: '',
            size: undefined,
            city: '',
            country: '',
            logoUrl: '',
        });
    };

    const handleInputChange = (field: keyof CreateCompanyPayload, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    // Функции для работы с вакансиями
    const handleCreateVacancy = async () => {
        if (!vacancyFormData.title.trim()) {
            showErrorToast('Название вакансии обязательно');
            return;
        }
        if (!vacancyFormData.description.trim()) {
            showErrorToast('Описание вакансии обязательно');
            return;
        }
        if (vacancyFormData.companyId === 0) {
            showErrorToast('Выберите компанию');
            return;
        }

        try {
            await dispatch(createVacancyAction(vacancyFormData)).unwrap();
            showSuccessToast('Вакансия успешно создана');
            setIsCreateVacancyModalOpen(false);
            resetVacancyForm();
        } catch (error) {
            showErrorToast(createVacancyState.error || 'Ошибка при создании вакансии');
        }
    };

    const handleUpdateVacancy = async () => {
        if (!editingVacancy?.id || !vacancyFormData.title.trim()) {
            showErrorToast('Название вакансии обязательно');
            return;
        }

        try {
            const updatePayload: UpdateVacancyPayload = {
                id: editingVacancy.id,
                ...vacancyFormData,
            };
            await dispatch(updateVacancyAction(updatePayload)).unwrap();
            showSuccessToast('Вакансия успешно обновлена');
            setIsEditVacancyModalOpen(false);
            setEditingVacancy(null);
            resetVacancyForm();
        } catch (error) {
            showErrorToast(updateVacancyState.error || 'Ошибка при обновлении вакансии');
        }
    };

    const handleDeleteVacancy = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить эту вакансию?')) {
            try {
                await dispatch(deleteVacancyAction(id)).unwrap();
                showSuccessToast('Вакансия успешно удалена');
            } catch (error) {
                showErrorToast(deleteVacancyState.error || 'Ошибка при удалении вакансии');
            }
        }
    };

    const handleEditVacancy = (vacancy: VacancyData) => {
        setEditingVacancy(vacancy);
        setVacancyFormData({
            title: vacancy.title || '',
            description: vacancy.description || '',
            companyId: vacancy.companyId || 0,
            professionId: vacancy.professionId || 0,
            employmentType: vacancy.employmentType || EmploymentType.FULL_TIME,
            experienceWide: vacancy.experienceWide || ExperienceLevel.NO_EXPERIENCE,
            salaryFrom: vacancy.salaryFrom || 0,
            salaryTo: vacancy.salaryTo || 0,
            status: vacancy.status || true,
            skills: vacancy.skills || [],
        });
        // Загружаем навыки для выбранной профессии
        if (vacancy.professionId) {
            dispatch(getProfessionSkillsAction(vacancy.professionId));
        }
        setIsEditVacancyModalOpen(true);
    };

    const resetVacancyForm = () => {
        setVacancyFormData({
            title: '',
            description: '',
            companyId: 0,
            professionId: 0,
            employmentType: EmploymentType.FULL_TIME,
            experienceWide: ExperienceLevel.NO_EXPERIENCE,
            salaryFrom: 0,
            salaryTo: 0,
            status: true,
            skills: [],
        });
    };

    const handleVacancyInputChange = (field: keyof CreateVacancyPayload, value: string | number | boolean | number[]) => {
        setVacancyFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    // Обработка выбора профессии
    const handleProfessionChange = (professionId: number) => {
        setVacancyFormData(prev => ({
            ...prev,
            professionId: professionId,
            skills: [], // Сбрасываем навыки при смене профессии
        }));
        // Загружаем навыки для выбранной профессии
        dispatch(getProfessionSkillsAction(professionId));
    };

    // Обработка выбора навыка
    const handleSkillToggle = (skillId: number, checked: boolean) => {
        setVacancyFormData(prev => {
            const currentSkills = prev.skills || [];
            if (checked) {
                return {
                    ...prev,
                    skills: [...currentSkills, skillId],
                };
            } else {
                return {
                    ...prev,
                    skills: currentSkills.filter(id => id !== skillId),
                };
            }
        });
    };

    // Функции для получения лейблов enum'ов
    const getEmploymentTypeLabel = (type?: EmploymentType): string => {
        switch (type) {
            case EmploymentType.FULL_TIME: return 'Полная занятость';
            case EmploymentType.PART_TIME: return 'Частичная занятость';
            case EmploymentType.CONTRACT: return 'Договор';
            case EmploymentType.INTERNSHIP: return 'Стажировка';
            case EmploymentType.FREELANCE: return 'Фриланс';
            default: return 'Не указано';
        }
    };

    const getExperienceLevelLabel = (level?: ExperienceLevel): string => {
        switch (level) {
            case ExperienceLevel.NO_EXPERIENCE: return 'Без опыта';
            case ExperienceLevel.JUNIOR: return '1 год';
            case ExperienceLevel.MIDDLE: return '3 года';
            case ExperienceLevel.SENIOR: return '5 лет';
            case ExperienceLevel.LEAD: return '10+ лет';
            default: return 'Не указано';
        }
    };

    if (companiesStatus === LoadStatus.IN_PROGRESS || vacanciesStatus === LoadStatus.IN_PROGRESS || professionsStatus === LoadStatus.IN_PROGRESS) {
        return <div className="employer-dashboard">Загрузка...</div>;
    }

    return (
        <div className="employer-dashboard">
            <div className="employer-dashboard__header">
                <h1>Личный кабинет работодателя</h1>
                {companies.length === 0 && (
                    <Button 
                        onClick={() => setIsCreateModalOpen(true)}
                        disabled={createCompanyState.status === LoadStatus.IN_PROGRESS}
                    >
                        Создать компанию
                    </Button>
                )}
            </div>

            <div className="employer-dashboard__content">
                <h2>Мои компании</h2>
                
                {companies.length === 0 ? (
                    <p>У вас пока нет компаний</p>
                ) : (
                    <div className="companies-list">
                        {companies.map((company) => (
                            <div key={company.id} className="company-card">
                                <div className="company-card__content">
                                    <h3>{company.name}</h3>
                                    {company.description && (
                                        <p className="company-card__description">{company.description}</p>
                                    )}
                                    <div className="company-card__details">
                                        {company.city && <span>📍 {company.city}</span>}
                                        {company.size && <span>👥 {company.size} сотрудников</span>}
                                        {company.website && (
                                            <a href={company.website} target="_blank" rel="noopener noreferrer">
                                                🌐 Сайт
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="company-card__actions">
                                    <Button 
                                        variant={ButtonType.SECONDARY}
                                        onClick={() => handleEditCompany(company)}
                                        disabled={updateCompanyState.status === LoadStatus.IN_PROGRESS}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button 
                                        variant={ButtonType.DANGER}
                                        onClick={() => handleDeleteCompany(company.id!)}
                                        disabled={deleteCompanyState.status === LoadStatus.IN_PROGRESS}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Секция вакансий */}
            {companies.length > 0 && (
                <div className="employer-dashboard__content">
                    <div className="vacancies-header">
                        <h2>Мои вакансии</h2>
                        <Button 
                            onClick={() => setIsCreateVacancyModalOpen(true)}
                            disabled={createVacancyState.status === LoadStatus.IN_PROGRESS}
                        >
                            Создать вакансию
                        </Button>
                    </div>
                    
                    {vacancies.length === 0 ? (
                        <p>У вас пока нет вакансий</p>
                    ) : (
                        <div className="vacancies-list">
                            {vacancies.map((vacancy) => (
                                <div key={vacancy.id} className="vacancy-card">
                                    <div className="vacancy-card__content">
                                        <h3>{vacancy.title}</h3>
                                        <p className="vacancy-card__description">{vacancy.description}</p>
                                        <div className="vacancy-card__details">
                                            <span>💰 {vacancy.salaryFrom} - {vacancy.salaryTo} руб.</span>
                                            <span>👥 {getEmploymentTypeLabel(vacancy.employmentType)}</span>
                                            <span>📈 {getExperienceLevelLabel(vacancy.experienceWide)}</span>
                                            <span className={`status ${vacancy.status ? 'active' : 'inactive'}`}>
                                                {vacancy.status ? 'Активна' : 'Неактивна'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="vacancy-card__actions">
                                        <Button 
                                            variant={ButtonType.SECONDARY}
                                            onClick={() => handleEditVacancy(vacancy)}
                                            disabled={updateVacancyState.status === LoadStatus.IN_PROGRESS}
                                        >
                                            Редактировать
                                        </Button>
                                        <Button 
                                            variant={ButtonType.DANGER}
                                            onClick={() => handleDeleteVacancy(vacancy.id!)}
                                            disabled={deleteVacancyState.status === LoadStatus.IN_PROGRESS}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Модальное окно создания компании */}
            {isCreateModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal__header">
                            <h3>Создать компанию</h3>
                            <button 
                                className="modal__close"
                                onClick={() => {
                                    setIsCreateModalOpen(false);
                                    resetForm();
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal__content">
                            <Input
                                label="Название компании *"
                                value={formData.name}
                                onChange={(value) => handleInputChange('name', value)}
                                placeholder="Введите название компании"
                            />
                            <Input
                                label="Описание"
                                value={formData.description || ''}
                                onChange={(value) => handleInputChange('description', value)}
                                placeholder="Описание компании"
                            />
                            <Input
                                label="Веб-сайт"
                                value={formData.website || ''}
                                onChange={(value) => handleInputChange('website', value)}
                                placeholder="https://example.com"
                            />
                            <Input
                                label="Количество сотрудников"
                                value={formData.size?.toString() || ''}
                                onChange={(value) => handleInputChange('size', parseInt(value) || 0)}
                                placeholder="100"
                                type="number"
                            />
                            <Input
                                label="Город"
                                value={formData.city || ''}
                                onChange={(value) => handleInputChange('city', value)}
                                placeholder="Москва"
                            />
                            <Input
                                label="Страна"
                                value={formData.country || ''}
                                onChange={(value) => handleInputChange('country', value)}
                                placeholder="Россия"
                            />
                            <Input
                                label="URL логотипа"
                                value={formData.logoUrl || ''}
                                onChange={(value) => handleInputChange('logoUrl', value)}
                                placeholder="https://example.com/logo.png"
                            />
                        </div>
                        <div className="modal__footer">
                            <Button 
                                variant={ButtonType.SECONDARY}
                                onClick={() => {
                                    setIsCreateModalOpen(false);
                                    resetForm();
                                }}
                            >
                                Отмена
                            </Button>
                            <Button 
                                onClick={handleCreateCompany}
                                disabled={createCompanyState.status === LoadStatus.IN_PROGRESS}
                            >
                                {createCompanyState.status === LoadStatus.IN_PROGRESS ? 'Создание...' : 'Создать'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно редактирования компании */}
            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal__header">
                            <h3>Редактировать компанию</h3>
                            <button 
                                className="modal__close"
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setEditingCompany(null);
                                    resetForm();
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal__content">
                            <Input
                                label="Название компании *"
                                value={formData.name}
                                onChange={(value) => handleInputChange('name', value)}
                                placeholder="Введите название компании"
                            />
                            <Input
                                label="Описание"
                                value={formData.description || ''}
                                onChange={(value) => handleInputChange('description', value)}
                                placeholder="Описание компании"
                            />
                            <Input
                                label="Веб-сайт"
                                value={formData.website || ''}
                                onChange={(value) => handleInputChange('website', value)}
                                placeholder="https://example.com"
                            />
                            <Input
                                label="Количество сотрудников"
                                value={formData.size?.toString() || ''}
                                onChange={(value) => handleInputChange('size', parseInt(value) || 0)}
                                placeholder="100"
                                type="number"
                            />
                            <Input
                                label="Город"
                                value={formData.city || ''}
                                onChange={(value) => handleInputChange('city', value)}
                                placeholder="Москва"
                            />
                            <Input
                                label="Страна"
                                value={formData.country || ''}
                                onChange={(value) => handleInputChange('country', value)}
                                placeholder="Россия"
                            />
                            <Input
                                label="URL логотипа"
                                value={formData.logoUrl || ''}
                                onChange={(value) => handleInputChange('logoUrl', value)}
                                placeholder="https://example.com/logo.png"
                            />
                        </div>
                        <div className="modal__footer">
                            <Button 
                                variant={ButtonType.SECONDARY}
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setEditingCompany(null);
                                    resetForm();
                                }}
                            >
                                Отмена
                            </Button>
                            <Button 
                                onClick={handleUpdateCompany}
                                disabled={updateCompanyState.status === LoadStatus.IN_PROGRESS}
                            >
                                {updateCompanyState.status === LoadStatus.IN_PROGRESS ? 'Сохранение...' : 'Сохранить'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно создания вакансии */}
            {isCreateVacancyModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal__header">
                            <h3>Создать вакансию</h3>
                            <button 
                                className="modal__close"
                                onClick={() => {
                                    setIsCreateVacancyModalOpen(false);
                                    resetVacancyForm();
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal__content">
                            <Input
                                label="Название вакансии *"
                                value={vacancyFormData.title}
                                onChange={(value) => handleVacancyInputChange('title', value)}
                                placeholder="Введите название вакансии"
                            />
                            <Input
                                label="Описание *"
                                value={vacancyFormData.description}
                                onChange={(value) => handleVacancyInputChange('description', value)}
                                placeholder="Описание вакансии"
                            />
                            <Select
                                label="Компания *"
                                value={vacancyFormData.companyId ? {
                                    value: vacancyFormData.companyId.toString(),
                                    label: companies.find(c => c.id === vacancyFormData.companyId)?.name || ''
                                } : undefined}
                                onChange={(value) => handleVacancyInputChange('companyId', value ? parseInt(value.value) : 0)}
                                options={companies.map(company => ({
                                    value: company.id!.toString(),
                                    label: company.name!
                                }))}
                                placeholder="Выберите компанию"
                            />
                            <Select
                                label="Профессия *"
                                value={vacancyFormData.professionId ? {
                                    value: vacancyFormData.professionId.toString(),
                                    label: professions.find(p => p.id === vacancyFormData.professionId)?.name || ''
                                } : undefined}
                                onChange={(value) => handleProfessionChange(value ? parseInt(value.value) : 0)}
                                options={professions.map(profession => ({
                                    value: profession.id.toString(),
                                    label: profession.name
                                }))}
                                placeholder="Выберите профессию"
                            />
                            {vacancyFormData.professionId > 0 && (
                                <div className="skills-section">
                                    <label className="skills-section__label">Навыки *</label>
                                    {currentProfessionSkillsStatus === LoadStatus.IN_PROGRESS ? (
                                        <div>Загрузка навыков...</div>
                                    ) : (
                                        <div className="skills-section__checkboxes">
                                            {currentProfessionSkills.map((skill) => (
                                                <Checkbox
                                                    key={skill.id}
                                                    label={skill.name}
                                                    checked={vacancyFormData.skills?.includes(skill.id) || false}
                                                    onChange={(checked) => handleSkillToggle(skill.id, checked)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                            <Select
                                label="Тип занятости *"
                                value={{
                                    value: vacancyFormData.employmentType.toString(),
                                    label: getEmploymentTypeLabel(vacancyFormData.employmentType)
                                }}
                                onChange={(value) => handleVacancyInputChange('employmentType', value ? parseInt(value.value) as EmploymentType : EmploymentType.FULL_TIME)}
                                options={[
                                    { value: EmploymentType.FULL_TIME.toString(), label: 'Полная занятость' },
                                    { value: EmploymentType.PART_TIME.toString(), label: 'Частичная занятость' },
                                    { value: EmploymentType.CONTRACT.toString(), label: 'Договор' },
                                    { value: EmploymentType.INTERNSHIP.toString(), label: 'Стажировка' },
                                    { value: EmploymentType.FREELANCE.toString(), label: 'Фриланс' },
                                ]}
                                placeholder="Выберите тип занятости"
                            />
                            <Select
                                label="Уровень опыта *"
                                value={{
                                    value: vacancyFormData.experienceWide.toString(),
                                    label: getExperienceLevelLabel(vacancyFormData.experienceWide)
                                }}
                                onChange={(value) => handleVacancyInputChange('experienceWide', value ? parseInt(value.value) as ExperienceLevel : ExperienceLevel.NO_EXPERIENCE)}
                                options={[
                                    { value: ExperienceLevel.NO_EXPERIENCE.toString(), label: 'Без опыта' },
                                    { value: ExperienceLevel.JUNIOR.toString(), label: '1 год' },
                                    { value: ExperienceLevel.MIDDLE.toString(), label: '3 года' },
                                    { value: ExperienceLevel.SENIOR.toString(), label: '5 лет' },
                                    { value: ExperienceLevel.LEAD.toString(), label: '10+ лет' },
                                ]}
                                placeholder="Выберите уровень опыта"
                            />
                            <Input
                                label="Зарплата от *"
                                value={vacancyFormData.salaryFrom.toString()}
                                onChange={(value) => handleVacancyInputChange('salaryFrom', parseInt(value) || 0)}
                                placeholder="50000"
                                type="number"
                            />
                            <Input
                                label="Зарплата до *"
                                value={vacancyFormData.salaryTo.toString()}
                                onChange={(value) => handleVacancyInputChange('salaryTo', parseInt(value) || 0)}
                                placeholder="100000"
                                type="number"
                            />
                        </div>
                        <div className="modal__footer">
                            <Button 
                                variant={ButtonType.SECONDARY}
                                onClick={() => {
                                    setIsCreateVacancyModalOpen(false);
                                    resetVacancyForm();
                                }}
                            >
                                Отмена
                            </Button>
                            <Button 
                                onClick={handleCreateVacancy}
                                disabled={createVacancyState.status === LoadStatus.IN_PROGRESS}
                            >
                                {createVacancyState.status === LoadStatus.IN_PROGRESS ? 'Создание...' : 'Создать'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно редактирования вакансии */}
            {isEditVacancyModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal__header">
                            <h3>Редактировать вакансию</h3>
                            <button 
                                className="modal__close"
                                onClick={() => {
                                    setIsEditVacancyModalOpen(false);
                                    setEditingVacancy(null);
                                    resetVacancyForm();
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal__content">
                            <Input
                                label="Название вакансии *"
                                value={vacancyFormData.title}
                                onChange={(value) => handleVacancyInputChange('title', value)}
                                placeholder="Введите название вакансии"
                            />
                            <Input
                                label="Описание *"
                                value={vacancyFormData.description}
                                onChange={(value) => handleVacancyInputChange('description', value)}
                                placeholder="Описание вакансии"
                            />
                            <Select
                                label="Компания *"
                                value={vacancyFormData.companyId ? {
                                    value: vacancyFormData.companyId.toString(),
                                    label: companies.find(c => c.id === vacancyFormData.companyId)?.name || ''
                                } : undefined}
                                onChange={(value) => handleVacancyInputChange('companyId', value ? parseInt(value.value) : 0)}
                                options={companies.map(company => ({
                                    value: company.id!.toString(),
                                    label: company.name!
                                }))}
                                placeholder="Выберите компанию"
                            />
                            <Select
                                label="Профессия *"
                                value={vacancyFormData.professionId ? {
                                    value: vacancyFormData.professionId.toString(),
                                    label: professions.find(p => p.id === vacancyFormData.professionId)?.name || ''
                                } : undefined}
                                onChange={(value) => handleProfessionChange(value ? parseInt(value.value) : 0)}
                                options={professions.map(profession => ({
                                    value: profession.id.toString(),
                                    label: profession.name
                                }))}
                                placeholder="Выберите профессию"
                            />
                            {vacancyFormData.professionId > 0 && (
                                <div className="skills-section">
                                    <label className="skills-section__label">Навыки *</label>
                                    {currentProfessionSkillsStatus === LoadStatus.IN_PROGRESS ? (
                                        <div>Загрузка навыков...</div>
                                    ) : (
                                        <div className="skills-section__checkboxes">
                                            {currentProfessionSkills.map((skill) => (
                                                <Checkbox
                                                    key={skill.id}
                                                    label={skill.name}
                                                    checked={vacancyFormData.skills?.includes(skill.id) || false}
                                                    onChange={(checked) => handleSkillToggle(skill.id, checked)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                            <Select
                                label="Тип занятости *"
                                value={{
                                    value: vacancyFormData.employmentType.toString(),
                                    label: getEmploymentTypeLabel(vacancyFormData.employmentType)
                                }}
                                onChange={(value) => handleVacancyInputChange('employmentType', value ? parseInt(value.value) as EmploymentType : EmploymentType.FULL_TIME)}
                                options={[
                                    { value: EmploymentType.FULL_TIME.toString(), label: 'Полная занятость' },
                                    { value: EmploymentType.PART_TIME.toString(), label: 'Частичная занятость' },
                                    { value: EmploymentType.CONTRACT.toString(), label: 'Договор' },
                                    { value: EmploymentType.INTERNSHIP.toString(), label: 'Стажировка' },
                                    { value: EmploymentType.FREELANCE.toString(), label: 'Фриланс' },
                                ]}
                                placeholder="Выберите тип занятости"
                            />
                            <Select
                                label="Уровень опыта *"
                                value={{
                                    value: vacancyFormData.experienceWide.toString(),
                                    label: getExperienceLevelLabel(vacancyFormData.experienceWide)
                                }}
                                onChange={(value) => handleVacancyInputChange('experienceWide', value ? parseInt(value.value) as ExperienceLevel : ExperienceLevel.NO_EXPERIENCE)}
                                options={[
                                    { value: ExperienceLevel.NO_EXPERIENCE.toString(), label: 'Без опыта' },
                                    { value: ExperienceLevel.JUNIOR.toString(), label: '1 год' },
                                    { value: ExperienceLevel.MIDDLE.toString(), label: '3 года' },
                                    { value: ExperienceLevel.SENIOR.toString(), label: '5 лет' },
                                    { value: ExperienceLevel.LEAD.toString(), label: '10+ лет' },
                                ]}
                                placeholder="Выберите уровень опыта"
                            />
                            <Input
                                label="Зарплата от *"
                                value={vacancyFormData.salaryFrom.toString()}
                                onChange={(value) => handleVacancyInputChange('salaryFrom', parseInt(value) || 0)}
                                placeholder="50000"
                                type="number"
                            />
                            <Input
                                label="Зарплата до *"
                                value={vacancyFormData.salaryTo.toString()}
                                onChange={(value) => handleVacancyInputChange('salaryTo', parseInt(value) || 0)}
                                placeholder="100000"
                                type="number"
                            />
                        </div>
                        <div className="modal__footer">
                            <Button 
                                variant={ButtonType.SECONDARY}
                                onClick={() => {
                                    setIsEditVacancyModalOpen(false);
                                    setEditingVacancy(null);
                                    resetVacancyForm();
                                }}
                            >
                                Отмена
                            </Button>
                            <Button 
                                onClick={handleUpdateVacancy}
                                disabled={updateVacancyState.status === LoadStatus.IN_PROGRESS}
                            >
                                {updateVacancyState.status === LoadStatus.IN_PROGRESS ? 'Сохранение...' : 'Сохранить'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployerDashboard;
