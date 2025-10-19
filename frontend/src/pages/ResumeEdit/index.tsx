import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedDispatch } from '../../redux/store';
import {
    selectCurrentResumeData,
    selectCurrentResumeStatus,
    selectUpdateResumeStatus,
    selectUpdateResumeError
} from '../../redux/resume/selectors';
import {
    getResumeAction,
    updateResumeAction
} from '../../redux/resume/actions';
import { selectProfessionsData, selectCurrentProfessionSkillsData } from '../../redux/profession/selectors';
import { getProfessionsAction, getProfessionSkillsAction } from '../../redux/profession/actions';
import { LoadStatus } from '../../utils/types';
import { UpdateResumePayload, EducationData, ExperienceData } from '../../redux/resume/types';
import Loader from '../../components/default/Loader';
import Button, { ButtonType } from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Textarea from '../../components/UI/Textarea';
import DateInput from '../../components/UI/DateInput';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import './style.scss';

// Функция для преобразования даты из формата YYYY-MM-DD в DD.MM.YYYY
const formatDateForInput = (dateString: string | undefined): string => {
    if (!dateString) return '';
    
    // Если дата уже в формате DD.MM.YYYY, возвращаем как есть
    if (dateString.includes('.')) return dateString;
    
    // Если дата в формате YYYY-MM-DD, преобразуем в DD.MM.YYYY
    if (dateString.includes('-')) {
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year}`;
    }
    
    return dateString;
};

// Функция для преобразования даты из формата DD.MM.YYYY в YYYY-MM-DD для отправки на сервер
const formatDateForServer = (dateString: string, isBirthDate: boolean = false): string => {
    if (!dateString) return '';
    
    let formattedDate = '';
    
    // Если дата в формате DD.MM.YYYY, преобразуем в YYYY-MM-DD
    if (dateString.includes('.')) {
        const [day, month, year] = dateString.split('.');
        formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } else if (dateString.includes('-')) {
        formattedDate = dateString;
    } else {
        return '';
    }
    
    // Проверяем корректность даты
    const date = new Date(formattedDate);
    if (isNaN(date.getTime())) {
        return ''; // Некорректная дата
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Сбрасываем время для корректного сравнения
    
    // Для даты рождения проверяем, что она не в будущем
    if (isBirthDate && date > today) {
        return ''; // Дата рождения не может быть в будущем
    }
    
    // Проверяем, что дата не слишком далеко в будущем (более 10 лет)
    const currentYear = new Date().getFullYear();
    if (date.getFullYear() > currentYear + 10) {
        return ''; // Дата слишком далеко в будущем
    }
    
    return formattedDate;
};

// Функция для преобразования данных фронтенда в формат, ожидаемый бэкендом
const transformDataForBackend = (formData: UpdateResumePayload) => {
    // Проверяем и форматируем дату рождения
    const birthDate = formatDateForServer(formData.dateOfBirth || '', true);
    if (!birthDate) {
        throw new Error('Дата рождения некорректна или в будущем');
    }

    // Преобразуем основные поля в snake_case
    const backendData: any = {
        id: formData.id,
        date_of_birth: birthDate,
        city: formData.city || '',
        country: formData.country || '',
        phone: formData.phone || '',
        about: formData.about || '',
        profession_id: formData.professionId || 0,
        education: typeof formData.education === 'string' ? formData.education : '',
        salary: formData.salary || 0,
        status: formData.status ?? true,
        skills: formData.skills?.filter(skill => typeof skill === 'number') || [],
    };

    // Преобразуем образование в snake_case
    if (formData.educations && formData.educations.length > 0) {
        backendData.educations = formData.educations
            .filter(edu => edu.institutionName && edu.institutionName.trim() !== '') // Фильтруем только с заполненным названием
            .map(edu => {
                const startDate = formatDateForServer(edu.startDate || '');
                const endDate = formatDateForServer(edu.endDate || '');
                
                // Проверяем, что дата окончания не раньше даты начала
                if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
                    return {
                        institution_name: edu.institutionName || '',
                        degree: edu.degree || '',
                        specialization: edu.specialization || '',
                        start_date: startDate,
                        end_date: '' // Очищаем некорректную дату окончания
                    };
                }
                
                return {
                    institution_name: edu.institutionName || '',
                    degree: edu.degree || '',
                    specialization: edu.specialization || '',
                    start_date: startDate,
                    end_date: endDate
                };
            });
    }

    // Преобразуем опыт работы в snake_case
    if (formData.experiences && formData.experiences.length > 0) {
        backendData.experiences = formData.experiences
            .filter(exp => exp.companyName && exp.companyName.trim() !== '' && exp.position && exp.position.trim() !== '') // Фильтруем только с заполненными обязательными полями
            .map(exp => {
                const startDate = formatDateForServer(exp.startDate || '');
                const endDate = formatDateForServer(exp.endDate || '');
                
                // Проверяем, что дата окончания не раньше даты начала
                if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
                    return {
                        company_name: exp.companyName || '',
                        position: exp.position || '',
                        start_date: startDate,
                        end_date: '', // Очищаем некорректную дату окончания
                        description: exp.description || ''
                    };
                }
                
                return {
                    company_name: exp.companyName || '',
                    position: exp.position || '',
                    start_date: startDate,
                    end_date: endDate,
                    description: exp.description || ''
                };
            });
    }

    return backendData;
};

const ResumeEdit: React.FC = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const resumeId = id;

    // Redux selectors
    const currentResume = useSelector(selectCurrentResumeData);
    const currentResumeStatus = useSelector(selectCurrentResumeStatus);
    const updateResumeStatus = useSelector(selectUpdateResumeStatus);
    const updateResumeError = useSelector(selectUpdateResumeError);
    const professions = useSelector(selectProfessionsData);
    const currentProfessionSkills = useSelector(selectCurrentProfessionSkillsData);

    // Состояния для формы резюме
    const [formData, setFormData] = useState<UpdateResumePayload>({
        id: 0,
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

    // Варианты образования
    const educationOptions = [
        { value: 'неоконченное среднее', label: 'Неоконченное среднее' },
        { value: 'среднее', label: 'Среднее' },
        { value: 'неоконченное высшее', label: 'Неоконченное высшее' },
        { value: 'высшее', label: 'Высшее' }
    ];

    // Загружаем профессии и резюме при монтировании
    useEffect(() => {
        dispatch(getProfessionsAction());
        if (resumeId) {
            dispatch(getResumeAction(parseInt(resumeId))).unwrap().catch(() => {
                navigate('/not-found');
            });
        }
    }, [dispatch, resumeId]);

    // Заполняем форму данными резюме
    useEffect(() => {
        if (currentResume) {
            console.log(currentResume);
            const professionId = professions.find(p => p.name === currentResume.profession)?.id;

            const newFormData = {
                id: currentResume.id || 0,
                dateOfBirth: currentResume.dateOfBirth || '',
                city: currentResume.city || '',
                country: currentResume.country || '',
                education: typeof currentResume.education === 'string' ? currentResume.education : '',
                phone: currentResume.phone || '',
                about: currentResume.about || '',
                professionId: professionId || 0,
                salary: currentResume.salary || 0,
                status: currentResume.status ?? true,
                skills: currentResume.skills?.map(skill => typeof skill === 'object' ? skill.id : skill) || [],
                educations: currentResume.educations || [],
                experiences: currentResume.experiences || [],
            };
            
            setFormData(newFormData);
            
            // Загружаем навыки для выбранной профессии
            if (professionId) {
                dispatch(getProfessionSkillsAction(professionId));
            }
        }
    }, [currentResume, dispatch]);


    // Функции для работы с формой
    const handleInputChange = (field: keyof UpdateResumePayload, value: any) => {
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

    const handleEducationChange = (option: any) => {
        if (option && option.value) {
            handleInputChange('education', option.value);
        } else {
            handleInputChange('education', '');
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

    // Функции для работы с образованием
    const addEducation = () => {
        const newEducation: Omit<EducationData, 'id' | 'resumeId' | 'createdAt' | 'updatedAt'> = {
            institutionName: '',
            degree: '',
            specialization: '',
            startDate: '',
            endDate: ''
        };
        setFormData(prev => ({
            ...prev,
            educations: [...(prev.educations || []), newEducation]
        }));
    };

    const updateEducation = (index: number, field: keyof Omit<EducationData, 'id' | 'resumeId' | 'createdAt' | 'updatedAt'>, value: string) => {
        setFormData(prev => ({
            ...prev,
            educations: prev.educations?.map((edu, i) => 
                i === index ? { 
                    ...edu, 
                    [field]: (field === 'startDate' || field === 'endDate') ? formatDateForServer(value) : value 
                } : edu
            ) || []
        }));
    };

    const removeEducation = (index: number) => {
        setFormData(prev => ({
            ...prev,
            educations: prev.educations?.filter((_, i) => i !== index) || []
        }));
    };

    // Функции для работы с опытом работы
    const addExperience = () => {
        const newExperience: Omit<ExperienceData, 'id' | 'resumeId' | 'createdAt' | 'updatedAt'> = {
            companyName: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
        };
        setFormData(prev => ({
            ...prev,
            experiences: [...(prev.experiences || []), newExperience]
        }));
    };

    const updateExperience = (index: number, field: keyof Omit<ExperienceData, 'id' | 'resumeId' | 'createdAt' | 'updatedAt'>, value: string) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences?.map((exp, i) => 
                i === index ? { 
                    ...exp, 
                    [field]: (field === 'startDate' || field === 'endDate') ? formatDateForServer(value) : value 
                } : exp
            ) || []
        }));
    };

    const removeExperience = (index: number) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences?.filter((_, i) => i !== index) || []
        }));
    };

    // Функция обновления резюме
    const handleUpdateResume = async () => {
        if (!formData.id) {
            showErrorToast('Резюме не найдено');
            return;
        }
        if (!formData.dateOfBirth?.trim()) {
            showErrorToast('Дата рождения обязательна');
            return;
        }
        if (!formData.city?.trim()) {
            showErrorToast('Город обязателен');
            return;
        }
        if (!formData.country?.trim()) {
            showErrorToast('Страна обязательна');
            return;
        }
        if (!formData.phone?.trim()) {
            showErrorToast('Телефон обязателен');
            return;
        }
        if (!formData.about?.trim()) {
            showErrorToast('Информация о себе обязательна');
            return;
        }
        if (!formData.professionId || formData.professionId === 0) {
            showErrorToast('Выберите профессию');
            return;
        }

        // Проверяем дату рождения
        if (formData.dateOfBirth) {
            const birthDate = formatDateForServer(formData.dateOfBirth, true);
            if (!birthDate) {
                showErrorToast('Дата рождения не может быть в будущем');
                return;
            }
        }

        try {
            // Преобразуем данные в формат, ожидаемый бэкендом
            const backendData = transformDataForBackend(formData);
            
            // Логируем данные для отладки
            console.log('Отправляемые данные на бэкенд:', JSON.stringify(backendData, null, 2));

            await dispatch(updateResumeAction(backendData)).unwrap();
            showSuccessToast('Резюме успешно обновлено');
            navigate('/lk'); // Перенаправляем в личный кабинет
        } catch (error: any) {
            if (error.message === 'Дата рождения некорректна или в будущем') {
                showErrorToast('Дата рождения не может быть в будущем или некорректна');
            } else {
                showErrorToast(updateResumeError || 'Ошибка при обновлении резюме');
            }
        }
    };
  
    if (currentResumeStatus === LoadStatus.IN_PROGRESS || updateResumeStatus === LoadStatus.IN_PROGRESS) {
        return <Loader />;
    }

    if (!currentResume) {
        return (
            <div className="resume-edit">
                <div className="container">
                    <div className="wrapper">
                        <h1>Резюме не найдено</h1>
                        <Button onClick={() => navigate('/lk')}>
                            Вернуться в личный кабинет
                        </Button>
                    </div>
                </div>
            </div>
        );
    }


    // Проверяем, есть ли профессия в списке
    const selectedProfession = professions.find(p => p.id === formData.professionId);
    
    // Проверяем, есть ли образование в списке
    const selectedEducation = educationOptions.find(opt => opt.value === formData.education);

    return (
        <div className="resume-edit">
            <div className="container">
                <div className="wrapper">
                    <h1 className="resume-edit__title">Редактирование резюме</h1>
                    <p className="resume-edit__description">
                        Измените информацию о себе в резюме
                    </p>

                    <form className="resume-edit__form" onSubmit={(e) => e.preventDefault()}>
                        {/* Основная информация */}
                        <div className="inner-wrapper">
                            <div className="inner-wrapper_title">Основная информация</div>
                            <div className="resume-edit__grid">
                                <DateInput
                                    label="Дата рождения"
                                    value={formatDateForInput(formData.dateOfBirth)}
                                    onChange={(value) => handleInputChange('dateOfBirth', formatDateForServer(value))}
                                />
                                <Input
                                    label="Город"
                                    placeholder="Москва"
                                    value={formData.city}
                                    onChange={(value) => handleInputChange('city', value)}
                                />
                                <Input
                                    label="Страна"
                                    placeholder="Россия"
                                    value={formData.country}
                                    onChange={(value) => handleInputChange('country', value)}
                                />
                                <Input
                                    label="Телефон"
                                    placeholder="+7 (999) 123-45-67"
                                    mask="+7 (000) 000-00-00"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(value) => handleInputChange('phone', value)}
                                />
                                <Select
                                    key={`education-${formData.education}`}
                                    label="Образование"
                                    options={educationOptions}
                                    value={formData.education ? {
                                        value: formData.education,
                                        label: formData.education
                                    } : undefined}
                                    onChange={handleEducationChange}
                                    placeholder="Выберите образование"
                                />
                            </div>
                        </div>

                        {/* Профессиональная информация */}
                        <div className="inner-wrapper">
                            <div className="inner-wrapper_title">Профессиональная информация</div>
                            <div className="resume-edit__grid">
                                <Select
                                    key={`profession-${formData.professionId}`}
                                    label="Профессия"
                                    options={professions.map(prof => ({
                                        value: prof.id.toString(),
                                        label: prof.name
                                    }))}
                                    value={(() => {
                                        const professionValue = formData.professionId ? {
                                            value: formData.professionId.toString(),
                                            label: professions.find(p => p.id === formData.professionId)?.name || ''
                                        } : undefined;
                                        console.log('Profession Select Value:', professionValue);
                                        return professionValue;
                                    })()}
                                    onChange={handleProfessionChange}
                                    placeholder="Выберите профессию"
                                />
                                <Input
                                    label="Желаемая зарплата"
                                    type="number"
                                    placeholder="100000"
                                    value={formData.salary?.toString() || ''}
                                    onChange={(value) => {
                                        const numValue = parseInt(value) || 0;
                                        // Ограничиваем максимальное значение зарплаты
                                        const maxSalary = 10000000; // 10 миллионов
                                        handleInputChange('salary', Math.min(numValue, maxSalary));
                                    }}
                                />
                            </div>
                        </div>

                        {(formData.professionId && formData.professionId > 0 && currentProfessionSkills.length > 0) ? (
                            <div className="inner-wrapper">
                                <div className="inner-wrapper_title">Навыки</div>
                                <Select
                                    label="Выберите навыки"
                                    options={currentProfessionSkills.map(skill => ({
                                        value: skill.id.toString(),
                                        label: skill.name
                                    }))}
                                    value={formData.skills?.map(skillId => {
                                        const skill = currentProfessionSkills.find(s => s.id === skillId);
                                        return skill ? {
                                            value: skill.id.toString(),
                                            label: skill.name
                                        } : null;
                                    }).filter((item): item is { value: string; label: string } => item !== null) || []}
                                    onChange={(selectedOptions: any) => {
                                        const skillIds = selectedOptions ? selectedOptions.map((option: any) => parseInt(option.value)) : [];
                                        handleInputChange('skills', skillIds);
                                    }}
                                    isMulti={true}
                                    placeholder="Выберите навыки"
                                    closeMenuOnSelect={false}
                                />
                            </div>
                        ) : <></>}

                        {/* Образование */}
                        <div className="inner-wrapper">
                            <div className="inner-wrapper_title">
                                Образование
                                <Button
                                    variant={ButtonType.GRAY}
                                    onClick={addEducation}
                                >
                                    <AddIcon />
                                    Добавить образование
                                </Button>
                            </div>
                            {formData.educations && formData.educations.length > 0 ? (
                                <div className="items-list">
                                    {formData.educations.map((education, index) => (
                                        <div key={index} className="item-card">
                                            <div className="item-card__header">
                                                <h4>Образование {index + 1}</h4>
                                                <Button
                                                    variant={ButtonType.DANGER}
                                                    onClick={() => removeEducation(index)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </div>
                                            <div className="item-card__grid">
                                                <div className="item-card__row">
                                                    <Input
                                                        label="Учебное заведение"
                                                        placeholder="МГУ им. М.В. Ломоносова"
                                                        value={education.institutionName || ''}
                                                        onChange={(value) => updateEducation(index, 'institutionName', value)}
                                                    />
                                                    <Input
                                                        label="Степень"
                                                        placeholder="Бакалавр"
                                                        value={education.degree || ''}
                                                        onChange={(value) => updateEducation(index, 'degree', value)}
                                                    />
                                                    <Input
                                                        label="Специализация"
                                                        placeholder="Информатика и вычислительная техника"
                                                        value={education.specialization || ''}
                                                        onChange={(value) => updateEducation(index, 'specialization', value)}
                                                    />
                                                </div>
                                                <div className="item-card__row">
                                                    <DateInput
                                                        key={`eduStartDate-${index}-${education.startDate}`}
                                                        label="Дата начала"
                                                        value={formatDateForInput(education.startDate)}
                                                        onChange={(value) => updateEducation(index, 'startDate', value)}
                                                    />
                                                    <DateInput
                                                        key={`eduEndDate-${index}-${education.endDate}`}
                                                        label="Дата окончания"
                                                        value={formatDateForInput(education.endDate)}
                                                        onChange={(value) => updateEducation(index, 'endDate', value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="empty-state">Добавьте информацию об образовании</p>
                            )}
                        </div>

                        {/* Опыт работы */}
                        <div className="inner-wrapper">
                            <div className="inner-wrapper_title">
                                Опыт работы
                                <Button
                                    variant={ButtonType.GRAY}
                                    onClick={addExperience}
                                >
                                    <AddIcon />
                                    Добавить опыт
                                </Button>
                            </div>
                            {formData.experiences && formData.experiences.length > 0 ? (
                                <div className="items-list">
                                    {formData.experiences.map((experience, index) => (
                                        <div key={index} className="item-card">
                                            <div className="item-card__header">
                                                <h4>Опыт работы {index + 1}</h4>
                                                <Button
                                                    variant={ButtonType.DANGER}
                                                    onClick={() => removeExperience(index)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </div>
                                            <div className="item-card__grid">
                                                <div className="item-card__row">
                                                    <Input
                                                        label="Компания"
                                                        placeholder="ООО Рога и копыта"
                                                        value={experience.companyName || ''}
                                                        onChange={(value) => updateExperience(index, 'companyName', value)}
                                                    />
                                                    <Input
                                                        label="Должность"
                                                        placeholder="Frontend разработчик"
                                                        value={experience.position || ''}
                                                        onChange={(value) => updateExperience(index, 'position', value)}
                                                    />
                                                </div>
                                                <div className="item-card__row">
                                                    <DateInput
                                                        key={`startDate-${index}-${experience.startDate}`}
                                                        label="Дата начала"
                                                        value={formatDateForInput(experience.startDate)}
                                                        onChange={(value) => updateExperience(index, 'startDate', value)}
                                                    />
                                                    <DateInput
                                                        key={`endDate-${index}-${experience.endDate}`}
                                                        label="Дата окончания"
                                                        value={formatDateForInput(experience.endDate)}
                                                        onChange={(value) => updateExperience(index, 'endDate', value)}
                                                    />
                                                </div>
                                                <div className="item-card__full-width">
                                                    <Textarea
                                                        label="Описание обязанностей"
                                                        placeholder="Опишите ваши обязанности и достижения на этой должности..."
                                                        value={experience.description || ''}
                                                        onChange={(value) => updateExperience(index, 'description', value)}
                                                        rows={3}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="empty-state">Добавьте информацию об опыте работы</p>
                            )}
                        </div>

                        {/* О себе */}
                        <div className="inner-wrapper">
                            <div className="inner-wrapper_title">О себе</div>
                            <Textarea
                                label="О себе"
                                placeholder="Расскажите о себе, своих навыках и опыте работы..."
                                value={formData.about}
                                onChange={(value) => handleInputChange('about', value)}
                                rows={4}
                            />
                        </div>

                        {/* Кнопки действий */}
                        <div className="resume-edit__actions">
                            <Button
                                variant={ButtonType.GRAY}
                                onClick={() => navigate('/lk')}
                            >
                                Отмена
                            </Button>
                            <Button
                                onClick={handleUpdateResume}
                                disabled={updateResumeStatus !== LoadStatus.NOT_LOADING && updateResumeStatus !== LoadStatus.SUCCESS && updateResumeStatus !== LoadStatus.ERROR}
                            >
                                {updateResumeStatus !== LoadStatus.NOT_LOADING && updateResumeStatus !== LoadStatus.SUCCESS && updateResumeStatus !== LoadStatus.ERROR ? 'Сохранение...' : 'Сохранить резюме'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResumeEdit;
