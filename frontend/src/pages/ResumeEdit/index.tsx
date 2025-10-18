import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { UpdateResumePayload } from '../../redux/resume/types';
import Loader from '../../components/default/Loader';
import Button, { ButtonType } from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Checkbox from '../../components/UI/Checkbox';
import './style.scss';

const ResumeEdit: React.FC = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const resumeId = searchParams.get('id');

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

    // Загружаем профессии и резюме при монтировании
    useEffect(() => {
        dispatch(getProfessionsAction());
        if (resumeId) {
            dispatch(getResumeAction(parseInt(resumeId)));
        }
    }, [dispatch, resumeId]);

    // Заполняем форму данными резюме
    useEffect(() => {
        if (currentResume) {
            setFormData({
                id: currentResume.id || 0,
                dateOfBirth: currentResume.dateOfBirth || '',
                city: currentResume.city || '',
                country: currentResume.country || '',
                education: currentResume.education || '',
                phone: currentResume.phone || '',
                about: currentResume.about || '',
                professionId: currentResume.professionId || 0,
                salary: currentResume.salary || 0,
                status: currentResume.status ?? true,
                skills: currentResume.skills || [],
                educations: currentResume.educations || [],
                experiences: currentResume.experiences || [],
            });
            
            // Загружаем навыки для выбранной профессии
            if (currentResume.professionId) {
                dispatch(getProfessionSkillsAction(currentResume.professionId));
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

    const handleSkillToggle = (skillId: number) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills?.includes(skillId)
                ? prev.skills.filter(id => id !== skillId)
                : [...(prev.skills || []), skillId]
        }));
    };

    // Функция обновления резюме
    const handleUpdateResume = async () => {
        if (!formData.id) {
            alert('Резюме не найдено');
            return;
        }
        if (!formData.dateOfBirth?.trim()) {
            alert('Дата рождения обязательна');
            return;
        }
        if (!formData.city?.trim()) {
            alert('Город обязателен');
            return;
        }
        if (!formData.country?.trim()) {
            alert('Страна обязательна');
            return;
        }
        if (!formData.phone?.trim()) {
            alert('Телефон обязателен');
            return;
        }
        if (!formData.about?.trim()) {
            alert('Информация о себе обязательна');
            return;
        }
        if (!formData.professionId || formData.professionId === 0) {
            alert('Выберите профессию');
            return;
        }

        try {
            await dispatch(updateResumeAction(formData)).unwrap();
            alert('Резюме успешно обновлено');
            navigate('/lk'); // Перенаправляем в личный кабинет
        } catch (error) {
            alert(updateResumeError || 'Ошибка при обновлении резюме');
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
                            <div className="resume-edit__grid">
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
                        {formData.professionId && formData.professionId > 0 && currentProfessionSkills.length > 0 && (
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
