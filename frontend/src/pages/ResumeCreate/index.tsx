import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../../redux/store';
import {
    selectCreateResumeStatus,
    selectCreateResumeError
} from '../../redux/resume/selectors';
import {
    createResumeAction
} from '../../redux/resume/actions';
import { selectProfessionsData, selectCurrentProfessionSkillsData } from '../../redux/profession/selectors';
import { getProfessionsAction, getProfessionSkillsAction } from '../../redux/profession/actions';
import { LoadStatus } from '../../utils/types';
import { CreateResumePayload } from '../../redux/resume/types';
import Loader from '../../components/default/Loader';
import Button, { ButtonType } from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Checkbox from '../../components/UI/Checkbox';
import './style.scss';

const ResumeCreate: React.FC = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    // Redux selectors
    const createResumeStatus = useSelector(selectCreateResumeStatus);
    const createResumeError = useSelector(selectCreateResumeError);
    const professions = useSelector(selectProfessionsData);
    const currentProfessionSkills = useSelector(selectCurrentProfessionSkillsData);

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

    // Загружаем профессии при монтировании
    useEffect(() => {
        dispatch(getProfessionsAction());
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

    // Функция создания резюме
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
            navigate('/lk'); // Перенаправляем в личный кабинет
        } catch (error) {
            alert(createResumeError || 'Ошибка при создании резюме');
        }
    };
  
    if (createResumeStatus === LoadStatus.IN_PROGRESS) {
        return <Loader />;
    }

    return (
        <div className="resume-create">
            <div className="container">
                <div className="wrapper">
                    <h1 className="resume-create__title">Создание резюме</h1>
                    <p className="resume-create__description">
                        Заполните информацию о себе для создания резюме
                    </p>

                    <form className="resume-create__form" onSubmit={(e) => e.preventDefault()}>
                        {/* Основная информация */}
                        <div className="inner-wrapper">
                            <div className="inner-wrapper_title">Основная информация</div>
                            <div className="resume-create__grid">
                                <Input
                                    label="Дата рождения"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(value) => handleInputChange('dateOfBirth', value)}
                                />
                                <Input
                                    label="Город"
                                    value={formData.city}
                                    onChange={(value) => handleInputChange('city', value)}
                                />
                                <Input
                                    label="Страна"
                                    value={formData.country}
                                    onChange={(value) => handleInputChange('country', value)}
                                />
                                <Input
                                    label="Телефон"
                                    value={formData.phone}
                                    onChange={(value) => handleInputChange('phone', value)}
                                />
                                <Input
                                    label="Образование"
                                    value={formData.education}
                                    onChange={(value) => handleInputChange('education', value)}
                                />
                            </div>
                        </div>

                        {/* Профессиональная информация */}
                        <div className="inner-wrapper">
                            <div className="inner-wrapper_title">Профессиональная информация</div>
                            <div className="resume-create__grid">
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
                                <Input
                                    label="Желаемая зарплата"
                                    type="number"
                                    value={formData.salary?.toString() || ''}
                                    onChange={(value) => handleInputChange('salary', parseInt(value) || 0)}
                                />
                            </div>
                        </div>

                        {/* Навыки */}
                        {formData.professionId > 0 && currentProfessionSkills.length > 0 && (
                            <div className="inner-wrapper">
                                <div className="inner-wrapper_title">Навыки</div>
                                <div className="skills-section">
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
                            </div>
                        )}

                        {/* О себе */}
                        <div className="inner-wrapper">
                            <div className="inner-wrapper_title">О себе</div>
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

                        {/* Кнопки действий */}
                        <div className="resume-create__actions">
                            <Button
                                variant={ButtonType.GRAY}
                                onClick={() => navigate('/lk')}
                            >
                                Отмена
                            </Button>
                            <Button
                                onClick={handleCreateResume}
                                disabled={createResumeStatus !== LoadStatus.NOT_LOADING && createResumeStatus !== LoadStatus.SUCCESS && createResumeStatus !== LoadStatus.ERROR}
                            >
                                {createResumeStatus !== LoadStatus.NOT_LOADING && createResumeStatus !== LoadStatus.SUCCESS && createResumeStatus !== LoadStatus.ERROR ? 'Создание...' : 'Создать резюме'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResumeCreate;

