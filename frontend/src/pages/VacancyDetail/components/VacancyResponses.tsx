import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch, RootState } from '../../../redux/store';
import { getRespondsByVacancyAction, updateRespondStatusAction, getBestMatchesAction, getAIMatchesAction } from '../../../redux/responds/actions';
import { selectRespondsData, selectRespondsStatus, selectRespondsError, selectBestMatchesData, selectBestMatchesStatus, selectBestMatchesError, selectAIMatchesData, selectAIMatchesStatus, selectAIMatchesError } from '../../../redux/responds/selectors';
import { LoadStatus } from '../../../utils/types';
import { RespondData, BestMatchData, AIMatchData } from '../../../api/responds';
import Loader from '../../../components/default/Loader';
import './VacancyResponses.scss';
import Button, { ButtonType } from '../../../components/UI/Button';

interface VacancyResponsesProps {
    vacancyId: number;
}

interface Response {
    id: number;
    respondId?: number; // ID отклика для поиска AI совпадений
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
    
    const aiMatches = useSelector((state: RootState) => selectAIMatchesData(state, vacancyId));
    const aiMatchesStatus = useSelector((state: RootState) => selectAIMatchesStatus(state, vacancyId));
    const aiMatchesError = useSelector((state: RootState) => selectAIMatchesError(state, vacancyId));

    const [selectedFilters, setSelectedFilters] = useState<string[]>(['new']);
    const [showReports, setShowReports] = useState<{ [respondId: number]: boolean }>({});
    const [showAIReports, setShowAIReports] = useState<{ [respondId: number]: boolean }>({});

    // Маппинг русских статусов на английские ключи фильтров
    const statusMapping: { [key: string]: string } = {
        'Новый': 'new',
        'В рассмотрении': 'considering', 
        'Интервью': 'interview', // Интервью - отдельный статус
        'Предложение работы': 'offer',
        'Нанят': 'hired'
    };


    useEffect(() => {
        dispatch(getRespondsByVacancyAction(vacancyId));
    }, [dispatch, vacancyId]);

    // Функция для форматирования зарплаты
    const formatSalary = (salary?: number) => {
        if (!salary) return 'Зарплата не указана';
        return `${salary.toLocaleString()} Р`;
    };

    // Функция для определения CSS класса статуса
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Новый':
                return 'new';
            case 'В рассмотрении':
                return 'considering';
            case 'Интервью':
                return 'interview';
            case 'Предложение работы':
                return 'offer';
            case 'Нанят':
                return 'hired';
            default:
                return 'new';
        }
    };

    // Функция для получения AI матча по ID отклика
    const getAIMatchForRespond = (respondId: number): AIMatchData | null => {
        console.log('Looking for AI match for respondId:', respondId);
        console.log('Available AI matches:', aiMatches);
        console.log('AI matches respond_ids:', aiMatches.map(m => ({ id: m.id, respond_id: m.respond_id })));
        
        const match = aiMatches.find(match => match.respond_id === respondId);
        console.log('Found AI match:', match);
        
        return match || null;
    };

    // Функция для определения цвета на основе процента совпадения
    const getMatchScoreColor = (percentage: number): string => {
        if (percentage >= 80) return '#28a745'; // Зеленый для высоких процентов
        if (percentage >= 60) return '#ffc107'; // Желтый для средних процентов
        if (percentage >= 40) return '#fd7e14'; // Оранжевый для низких процентов
        return '#dc3545'; // Красный для очень низких процентов
    };

    // Функция для обработки фильтров
    const handleFilterChange = (filter: string) => {
        setSelectedFilters(prev => 
            prev.includes(filter) 
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };



        // Отладочная информация
        console.log('Responds data:', responds);
        if (Array.isArray(responds)) {
            console.log('Respond statuses:', responds.map(r => ({ id: r.id, respond_status: (r as any).respond_status, name: `${r.last_name} ${r.first_name}` })));
        }
        console.log('AI Matches data:', aiMatches);
        if (Array.isArray(aiMatches)) {
            console.log('AI Matches respond_ids:', aiMatches.map(m => ({ id: m.id, respond_id: m.respond_id, name: `${m.last_name} ${m.first_name}` })));
        }

        // Преобразуем данные откликов в формат для отображения
        const responses: Response[] = Array.isArray(responds) ? responds.map((respond: RespondData) => {
            console.log('Processing respond:', { id: respond.id, respond_id: (respond as any).respond_id, name: `${respond.last_name} ${respond.first_name}` });
            return {
                id: respond.id,
                respondId: (respond as any).respond_id, // Добавляем respond_id для поиска AI совпадений
                candidateName: `${respond.last_name} ${respond.first_name} ${respond.middle_name || ''}`.trim(),
                position: respond.profession,
                salary: respond.salary,
                region: `${respond.city || 'Город не указан'}, ${respond.country || 'Страна не указана'}`,
                status: (respond as any).respond_status || 'new' // Используем реальный статус из API
            };
        }) : [];

        // Фильтруем отклики по выбранным фильтрам
        const filteredResponses = responses.filter(response => {
            const filterKey = statusMapping[response.status] || 'new';
            return selectedFilters.includes(filterKey);
        });

        // Сортируем отклики по рейтингу ИИ (если есть AI матчи)
        const sortedResponses = filteredResponses.sort((a, b) => {
            const aiMatchA = getAIMatchForRespond(a.respondId || a.id);
            const aiMatchB = getAIMatchForRespond(b.respondId || b.id);
            
            // Если у обоих есть рейтинг ИИ, сортируем по убыванию (высший рейтинг первым)
            if (aiMatchA && aiMatchB) {
                return aiMatchB.rating - aiMatchA.rating;
            }
            
            // Если рейтинг есть только у одного, он идет первым
            if (aiMatchA && !aiMatchB) return -1;
            if (!aiMatchA && aiMatchB) return 1;
            
            // Если у обоих нет рейтинга, сохраняем исходный порядок
            return 0;
        });


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

    const handleGetAIMatches = async () => {
        try {
            await dispatch(getAIMatchesAction(vacancyId)).unwrap();
        } catch (error) {
            console.error('Ошибка при получении AI совпадений:', error);
            alert('Ошибка при получении AI совпадений');
        }
    };

    const handleShowReport = (respondId: number) => {
        setShowReports(prev => ({
            ...prev,
            [respondId]: !prev[respondId]
        }));
    };

    const handleShowAIReport = (respondId: number) => {
        setShowAIReports(prev => ({
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
                        className={`vacancy-responses__filter ${selectedFilters.includes('interview') ? 'active' : ''}`}
                        onClick={() => handleFilterChange('interview')}
                    >
                        <input 
                            type="checkbox" 
                            checked={selectedFilters.includes('interview')}
                            onChange={() => handleFilterChange('interview')}
                        />
                        <span className="vacancy-responses__filter-label interview">Интервью</span>
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
                        onClick={handleGetAIMatches}
                        className="vacancy-responses__action-button"
                        disabled={aiMatchesStatus === LoadStatus.IN_PROGRESS}
                    >
                        {aiMatchesStatus === LoadStatus.IN_PROGRESS ? 'Загрузка...' : 'Помощь ИИ'}
                    </Button>
                </div>
            </div>
            <div className="vacancy-responses__list">
                {sortedResponses.map((response) => {
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
                                        <div className="vacancy-responses__name-row">
                                            <h4 className="vacancy-responses__name">{response.candidateName}</h4>
                                        </div>
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
                                        <span className={`vacancy-responses__status-badge status-${getStatusClass(response.status)}`}>
                                            {response.status}
                                        </span>
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
                                        {(() => {
                                            const aiMatch = getAIMatchForRespond(response.respondId || response.id);
                                            console.log(`Checking AI match for response ${response.id} (respondId: ${response.respondId}):`, aiMatch);
                                            return aiMatch && (
                                                <button 
                                                    className="vacancy-responses__action-button-ai-report"
                                                    onClick={() => handleShowAIReport(response.id)}
                                                >
                                                    {showAIReports[response.id] ? 'Скрыть отчёт ИИ' : 'Просмотреть отчёт ИИ'}
                                                </button>
                                            );
                                        })()}
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
                                        <span 
                                            className="vacancy-responses__match-score"
                                            style={{ 
                                                color: getMatchScoreColor(getBestMatchForRespond(response.id)?.match_score || 0)
                                            }}
                                        >
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
                            {showAIReports[response.id] && getAIMatchForRespond(response.respondId || response.id) && (
                                <div className="vacancy-responses__ai-report">
                                    <div className="vacancy-responses__ai-report-header">
                                        <h4>🤖 Отчёт ИИ о кандидате</h4>
                                        <span className="vacancy-responses__ai-rating">
                                            Рейтинг ИИ: {getAIMatchForRespond(response.respondId || response.id)?.rating}/10
                                        </span>
                                    </div>
                                    <div className="vacancy-responses__ai-report-content">
                                        {(() => {
                                            const aiMatch = getAIMatchForRespond(response.respondId || response.id);
                                            if (!aiMatch) return null;
                                            
                                            return (
                                                <div className="vacancy-responses__ai-opinion">
                                                    <h5>Мнение ИИ:</h5>
                                                    <p className="vacancy-responses__ai-text">
                                                        {aiMatch.opinion}
                                                    </p>
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
