import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch, RootState } from '../../../redux/store';
import { getRespondsByVacancyAction, updateRespondStatusAction, getBestMatchesAction } from '../../../redux/responds/actions';
import { selectRespondsData, selectRespondsStatus, selectRespondsError, selectBestMatchesData, selectBestMatchesStatus, selectBestMatchesError } from '../../../redux/responds/selectors';
import { LoadStatus } from '../../../utils/types';
import { RespondData, BestMatchData } from '../../../api/responds';
import Loader from '../../../components/default/Loader';
import './VacancyResponses.scss';
import Button, { ButtonType } from '../../../components/UI/Button';

interface VacancyResponsesProps {
    vacancyId: number;
}

interface Response {
    id: number;
    candidateName: string;
    position: string;
    salary?: number;
    region: string;
    status: string;
    avatar?: string;
}

const VacancyResponses: React.FC<VacancyResponsesProps> = ({ vacancyId }) => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const responds = useSelector((state: RootState) => selectRespondsData(state, vacancyId));
    const respondsStatus = useSelector((state: RootState) => selectRespondsStatus(state, vacancyId));
    const respondsError = useSelector((state: RootState) => selectRespondsError(state, vacancyId));
    
    const bestMatches = useSelector((state: RootState) => selectBestMatchesData(state, vacancyId));
    const bestMatchesStatus = useSelector((state: RootState) => selectBestMatchesStatus(state, vacancyId));
    const bestMatchesError = useSelector((state: RootState) => selectBestMatchesError(state, vacancyId));

    const [selectedFilters, setSelectedFilters] = useState<string[]>(['new']);
    const [showReports, setShowReports] = useState<{ [respondId: number]: boolean }>({});


    useEffect(() => {
        dispatch(getRespondsByVacancyAction(vacancyId));
    }, [dispatch, vacancyId]);

    // Функция для форматирования зарплаты
    const formatSalary = (salary?: number) => {
        if (!salary) return 'Зарплата не указана';
        return `${salary.toLocaleString()} Р`;
    };

    // Функция для обработки фильтров
    const handleFilterChange = (filter: string) => {
        setSelectedFilters(prev => 
            prev.includes(filter) 
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };



        // Преобразуем данные откликов в формат для отображения
        const responses: Response[] = Array.isArray(responds) ? responds.map((respond: RespondData) => ({
            id: respond.id,
            candidateName: `${respond.last_name} ${respond.first_name} ${respond.middle_name || ''}`.trim(),
            position: respond.profession,
            salary: respond.salary,
            region: `${respond.city || 'Город не указан'}, ${respond.country || 'Страна не указана'}`,
            status: 'new' // Пока что все отклики имеют статус "новый"
        })) : [];

        // Фильтруем отклики по выбранным фильтрам
        const filteredResponses = responses.filter(response => 
            selectedFilters.includes(response.status)
        );


    const handleStatusUpdate = async (respondId: number, newStatus: string) => {
        try {
            await dispatch(updateRespondStatusAction({ respondId, status: newStatus })).unwrap();
        } catch (error) {
            console.error('Ошибка при обновлении статуса отклика:', error);
            alert('Ошибка при обновлении статуса отклика');
        }
    };

    const handleGetBestMatches = async () => {
        try {
            await dispatch(getBestMatchesAction(vacancyId)).unwrap();
        } catch (error) {
            console.error('Ошибка при получении лучших совпадений:', error);
            alert('Ошибка при получении лучших совпадений');
        }
    };

    const handleShowReport = (respondId: number) => {
        setShowReports(prev => ({
            ...prev,
            [respondId]: !prev[respondId]
        }));
    };

    const getBestMatchForRespond = (respondId: number): BestMatchData | null => {
        return bestMatches.find(match => match.id === respondId) || null;
    };

    const handleOpenResume = (resumeId: number) => {
        navigate(`/resume/${resumeId}`);
    };



    // Обработка состояний загрузки и ошибок
    if (respondsStatus === LoadStatus.IN_PROGRESS) {
        return (
            <div className="vacancy-responses">
                <div className="vacancy-responses__loading">
                    <Loader />
                </div>
            </div>
        );
    }

    if (respondsStatus === LoadStatus.ERROR) {
        return (
            <div className="vacancy-responses">
                <div className="vacancy-responses__error">
                    <p>Ошибка при загрузке откликов: {respondsError}</p>
                    <button onClick={() => dispatch(getRespondsByVacancyAction(vacancyId))}>
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    if (responses.length === 0) {
        return (
            <div className="vacancy-responses">
                <div className="vacancy-responses__empty">
                    <p>На эту вакансию пока нет откликов</p>
                </div>
            </div>
        );
    }

    if (filteredResponses.length === 0) {
        return (
            <div className="vacancy-responses">
                <div className="vacancy-responses__filters">
                    <div className="vacancy-responses__filters-left">
                        <div 
                            className={`vacancy-responses__filter ${selectedFilters.includes('new') ? 'active' : ''}`}
                            onClick={() => handleFilterChange('new')}
                        >
                            <input 
                                type="checkbox" 
                                checked={selectedFilters.includes('new')}
                                onChange={() => handleFilterChange('new')}
                            />
                            <span className="vacancy-responses__filter-label new">Новый</span>
                        </div>
                        <div 
                            className={`vacancy-responses__filter ${selectedFilters.includes('considering') ? 'active' : ''}`}
                            onClick={() => handleFilterChange('considering')}
                        >
                            <input 
                                type="checkbox" 
                                checked={selectedFilters.includes('considering')}
                                onChange={() => handleFilterChange('considering')}
                            />
                            <span className="vacancy-responses__filter-label considering">В рассмотрении</span>
                        </div>
                        <div 
                            className={`vacancy-responses__filter ${selectedFilters.includes('offer') ? 'active' : ''}`}
                            onClick={() => handleFilterChange('offer')}
                        >
                            <input 
                                type="checkbox" 
                                checked={selectedFilters.includes('offer')}
                                onChange={() => handleFilterChange('offer')}
                            />
                            <span className="vacancy-responses__filter-label offer">Предложение работы</span>
                        </div>
                        <div 
                            className={`vacancy-responses__filter ${selectedFilters.includes('hired') ? 'active' : ''}`}
                            onClick={() => handleFilterChange('hired')}
                        >
                            <input 
                                type="checkbox" 
                                checked={selectedFilters.includes('hired')}
                                onChange={() => handleFilterChange('hired')}
                            />
                            <span className="vacancy-responses__filter-label hired">Нанят</span>
                        </div>
                    </div>
                    <div className="vacancy-responses__filters-right">
                        <Button 
                            variant={ButtonType.SECONDARY}
                            onClick={handleGetBestMatches}
                            className="vacancy-responses__action-button"
                            disabled={bestMatchesStatus === LoadStatus.IN_PROGRESS}
                        >
                            {bestMatchesStatus === LoadStatus.IN_PROGRESS ? 'Загрузка...' : 'Выбрать лучшее'}
                        </Button>
                        <Button 
                            variant={ButtonType.RED}
                            onClick={() => {}}
                            className="vacancy-responses__action-button"
                        >
                            Помощь ИИ
                        </Button>
                    </div>
                </div>
                <div className="vacancy-responses__empty">
                    <p>Ничего не найдено</p>
                </div>
            </div>
        );
    }

    return (
        <div className="vacancy-responses">
            <div className="vacancy-responses__filters">
                <div className="vacancy-responses__filters-left">
                    <div 
                        className={`vacancy-responses__filter ${selectedFilters.includes('new') ? 'active' : ''}`}
                        onClick={() => handleFilterChange('new')}
                    >
                        <input 
                            type="checkbox" 
                            checked={selectedFilters.includes('new')}
                            onChange={() => handleFilterChange('new')}
                        />
                        <span className="vacancy-responses__filter-label new">Новый</span>
                    </div>
                    <div 
                        className={`vacancy-responses__filter ${selectedFilters.includes('considering') ? 'active' : ''}`}
                        onClick={() => handleFilterChange('considering')}
                    >
                        <input 
                            type="checkbox" 
                            checked={selectedFilters.includes('considering')}
                            onChange={() => handleFilterChange('considering')}
                        />
                        <span className="vacancy-responses__filter-label considering">В рассмотрении</span>
                    </div>
                    <div 
                        className={`vacancy-responses__filter ${selectedFilters.includes('offer') ? 'active' : ''}`}
                        onClick={() => handleFilterChange('offer')}
                    >
                        <input 
                            type="checkbox" 
                            checked={selectedFilters.includes('offer')}
                            onChange={() => handleFilterChange('offer')}
                        />
                        <span className="vacancy-responses__filter-label offer">Предложение работы</span>
                    </div>
                    <div 
                        className={`vacancy-responses__filter ${selectedFilters.includes('hired') ? 'active' : ''}`}
                        onClick={() => handleFilterChange('hired')}
                    >
                        <input 
                            type="checkbox" 
                            checked={selectedFilters.includes('hired')}
                            onChange={() => handleFilterChange('hired')}
                        />
                        <span className="vacancy-responses__filter-label hired">Нанят</span>
                    </div>
                </div>
                <div className="vacancy-responses__filters-right">
                    <Button 
                        variant={ButtonType.SECONDARY}
                        onClick={handleGetBestMatches}
                        className="vacancy-responses__action-button"
                        disabled={bestMatchesStatus === LoadStatus.IN_PROGRESS}
                    >
                        {bestMatchesStatus === LoadStatus.IN_PROGRESS ? 'Загрузка...' : 'Выбрать лучшее'}
                    </Button>
                    <Button 
                        variant={ButtonType.RED}
                        onClick={() => {}}
                        className="vacancy-responses__action-button"
                    >
                        Помощь ИИ
                    </Button>
                </div>
            </div>
            <div className="vacancy-responses__list">
                {filteredResponses.map((response) => {
                    return (
                        <div key={response.id}>
                            <div className="vacancy-responses__item">
                                <div className="vacancy-responses__candidate">
                                    <div className="vacancy-responses__avatar">
                                        <div className="vacancy-responses__avatar-placeholder">
                                            {response.candidateName.split(' ').slice(0, 2).map(n => n[0]).join('')}
                                        </div>
                                    </div>
                                    <div className="vacancy-responses__info">
                                        <h4 className="vacancy-responses__name">{response.candidateName}</h4>
                                        <p className="vacancy-responses__position">{response.position}</p>
                                        <p className="vacancy-responses__salary">
                                            Зарплатные ожидания - <span className="vacancy-responses__salary-value">{formatSalary(response.salary)}</span>
                                        </p>
                                        <p className="vacancy-responses__region">
                                            Регион - <span className="vacancy-responses__region-value">{response.region}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="vacancy-responses__actions">
                                    <div className="vacancy-responses__status">
                                        <span className="vacancy-responses__status-badge status-hired">Новый</span>
                                    </div>
                                    <div className="vacancy-responses__action-buttons">
                                        {getBestMatchForRespond(response.id) && (
                                            <button 
                                                className="vacancy-responses__action-button-report"
                                                onClick={() => handleShowReport(response.id)}
                                            >
                                                {showReports[response.id] ? 'Скрыть отчет' : 'Показать отчет'}
                                            </button>
                                        )}
                                    <button 
                                        className="vacancy-responses__action-button-resume"
                                        onClick={() => handleOpenResume(response.id)}
                                    >
                                        Открыть резюме
                                    </button>
                                    </div>
                                </div>
                            </div>
                            {showReports[response.id] && getBestMatchForRespond(response.id) && (
                                <div className="vacancy-responses__report">
                                    <div className="vacancy-responses__report-header">
                                        <h4>Отчет о кандидате</h4>
                                        <span className="vacancy-responses__match-score">
                                            Совпадение: {getBestMatchForRespond(response.id)?.match_score}%
                                        </span>
                                    </div>
                                    <div className="vacancy-responses__report-content">
                                        {(() => {
                                            const match = getBestMatchForRespond(response.id);
                                            if (!match) return null;
                                            
                                            return (
                                                <div className="vacancy-responses__report-details">
                                                    <div className="vacancy-responses__report-section">
                                                        <h5>Профессия</h5>
                                                        <p className={match.match_details.profession_match ? 'match-positive' : 'match-negative'}>
                                                            {match.match_details.profession_match ? '✅ Совпадает' : '❌ Не совпадает'}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="vacancy-responses__report-section">
                                                        <h5>Навыки</h5>
                                                        <p>
                                                            Совпадает {match.match_details.skills.matching} из {match.match_details.skills.required} навыков ({match.match_details.skills.percentage}%)
                                                        </p>
                                                        {match.match_details.skills.matching_skill_names.length > 0 && (
                                                            <div className="vacancy-responses__skills-list">
                                                                {match.match_details.skills.matching_skill_names.map((skill, index) => (
                                                                    <span key={index} className="vacancy-responses__skill-tag">
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="vacancy-responses__report-section">
                                                        <h5>Зарплата</h5>
                                                        <p className={`match-${match.match_details.salary_match}`}>
                                                            {match.match_details.salary_match === 'perfect' && '✅ Идеальное совпадение'}
                                                            {match.match_details.salary_match === 'good' && '✅ Хорошее совпадение'}
                                                            {match.match_details.salary_match === 'acceptable' && '⚠️ Приемлемое совпадение'}
                                                            {match.match_details.salary_match === 'none' && '❌ Не совпадает'}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="vacancy-responses__report-section">
                                                        <h5>Опыт работы</h5>
                                                        <p>
                                                            У кандидата: {match.match_details.experience.candidate_months} месяцев
                                                            <br />
                                                            Требуется: {match.match_details.experience.required_months} месяцев
                                                            <br />
                                                            Совпадение: {match.match_details.experience.match_percentage}%
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="vacancy-responses__report-section">
                                                        <h5>Тип занятости</h5>
                                                        <p className={match.match_details.employment_type_match ? 'match-positive' : 'match-negative'}>
                                                            {match.match_details.employment_type_match ? '✅ Совпадает' : '❌ Не совпадает'}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VacancyResponses;
