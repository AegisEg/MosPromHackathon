import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../../redux/store';
import { selectVacanciesData, selectVacanciesStatus } from '../../../redux/vacancy/selectors';
import { getVacanciesAction } from '../../../redux/vacancy/actions';
import { LoadStatus } from '../../../utils/types';
import { VacancyData } from '../../../redux/vacancy/types';
import VacancyCard from './VacancyCard';
import Loader from '../../../components/default/Loader';

const ActiveVacancies: React.FC = () => {
    const dispatch = useTypedDispatch();
    const vacancies = useSelector(selectVacanciesData);
    const vacanciesStatus = useSelector(selectVacanciesStatus);

    useEffect(() => {
        dispatch(getVacanciesAction());
    }, [dispatch]);

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

    const getResponsesCount = (vacancy: VacancyData) => {
        // Используем реальное количество откликов из API
        return vacancy.respondsCount || 0;
    };

    if (vacanciesStatus === LoadStatus.IN_PROGRESS) {
        return (
            <div className="active-vacancies">
                <div className="active-vacancies__loading">
                    <Loader />
                </div>
            </div>
        );
    }

    if (vacanciesStatus === LoadStatus.ERROR) {
        return (
            <div className="active-vacancies">
                <div className="active-vacancies__error">
                    <p>Ошибка при загрузке вакансий</p>
                </div>
            </div>
        );
    }

    if (vacancies.length === 0) {
        return (
            <div className="active-vacancies">
                <div className="active-vacancies__empty">
                    <p>У вас пока нет активных вакансий</p>
                    <p>Создайте первую вакансию, нажав кнопку "Создание вакансии"</p>
                </div>
            </div>
        );
    }

    return (
        <div className="active-vacancies">
            {vacancies.map((vacancy: VacancyData, index: number) => (
                <VacancyCard
                    key={vacancy.id || index}
                    id={vacancy.id || 0}
                    title={vacancy.title || 'Название не указано'}
                    salary={formatSalary(vacancy.salaryFrom, vacancy.salaryTo)}
                    region="Регион - Москва, Российская федерация" // Пока статично, можно добавить в API
                    responsesCount={getResponsesCount(vacancy)}
                    isActive={vacancy.status === true} // Используем реальный статус из данных
                    createdAt={vacancy.createdAt || new Date().toISOString()}
                />
            ))}
        </div>
    );
};

export default ActiveVacancies;
