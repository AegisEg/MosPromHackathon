import React from 'react';
import { VacancyData } from '../../../redux/vacancy/types';
import './VacancyInfo.scss';

interface VacancyInfoProps {
    vacancy: VacancyData;
}

const VacancyInfo: React.FC<VacancyInfoProps> = ({ vacancy }) => {
    // Данные уже приходят в правильном формате с маппингом
    console.log('Vacancy data:', vacancy);
    const formatSalary = (salaryFrom?: number, salaryTo?: number) => {
        if (!salaryFrom && !salaryTo) return 'Зарплата не указана';
        if (salaryFrom && salaryTo) {
            return `от ${salaryFrom.toLocaleString()} Р до ${salaryTo.toLocaleString()} Р за месяц, до вычета налогов`;
        }
        if (salaryFrom) {
            return `от ${salaryFrom.toLocaleString()} Р за месяц, до вычета налогов`;
        }
        return `до ${salaryTo!.toLocaleString()} Р за месяц, до вычета налогов`;
    };

    // Данные уже приходят в правильном формате, используем их напрямую

    return (
        <div className="vacancy-info">
            <div className="vacancy-info__section">
                <h3 className="vacancy-info__section-title">Описание вакансии</h3>
                <p className="vacancy-info__description">
                    {vacancy.description || 'Описание не указано'}
                </p>
            </div>

            <div className="vacancy-info__section">
                <h3 className="vacancy-info__section-title">Требования</h3>
                <div className="vacancy-info__requirements">
                    <div className="vacancy-info__requirement">
                        <span className="vacancy-info__requirement-label">Профессия:</span>
                        <span className="vacancy-info__requirement-value">
                            {vacancy.profession || 'Не указано'}
                        </span>
                    </div>
                    <div className="vacancy-info__requirement">
                        <span className="vacancy-info__requirement-label">Тип занятости:</span>
                        <span className="vacancy-info__requirement-value">
                            {vacancy.employmentType || 'Не указано'}
                        </span>
                    </div>
                    <div className="vacancy-info__requirement">
                        <span className="vacancy-info__requirement-label">Опыт работы:</span>
                        <span className="vacancy-info__requirement-value">
                            {vacancy.experienceWide || 'Не указано'}
                        </span>
                    </div>
                    <div className="vacancy-info__requirement">
                        <span className="vacancy-info__requirement-label">Зарплата:</span>
                        <span className="vacancy-info__requirement-value">
                            {formatSalary(vacancy.salaryFrom, vacancy.salaryTo)}
                        </span>
                    </div>
                </div>
            </div>

            {vacancy.skills && vacancy.skills.length > 0 && (
                <div className="vacancy-info__section">
                    <h3 className="vacancy-info__section-title">Навыки</h3>
                    <div className="vacancy-info__skills">
                        {vacancy.skills.map((skill, index) => (
                            <span key={index} className="vacancy-info__skill">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="vacancy-info__section">
                <h3 className="vacancy-info__section-title">Информация о компании</h3>
                <div className="vacancy-info__company">
                    <div className="vacancy-info__company-info">
                        <span className="vacancy-info__company-label">Компания:</span>
                        <span className="vacancy-info__company-value">
                            {vacancy.companyName || 'Не указано'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VacancyInfo;
