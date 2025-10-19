import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HR from '../../components/default/HR';
import ActiveVacancies from './components/ActiveVacancies';
import ArchiveVacancies from './components/ArchiveVacancies';
import DraftVacancies from './components/DraftVacancies';
import './styles.scss';

export const CompanyVacancies = () => {
    const navigate = useNavigate();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    return (
        <div className="company-vacancies-page">
            <div className="container">
                <div className="wrapper">
                    <div className="company-vacancies-page__content">
                        <div className="company-vacancies-page__header">
                            <h1 className="company-vacancies-page__title">
                                Ваши вакансии
                            </h1>
                            <button 
                                className="company-vacancies-page__create-vacancy-button"
                                onClick={() => navigate('/lk/vacancies/create')}
                            >
                                Создание вакансии
                            </button>
                        </div>
                        <HR margin={36} />
                        <div className="company-vacancies-page__tabs">
                            <button 
                                className={`company-vacancies-page__tab ${activeTabIndex === 0 ? 'active' : ''}`}
                                onClick={() => setActiveTabIndex(0)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                Ваши вакансии
                            </button>
                            <button 
                                className={`company-vacancies-page__tab ${activeTabIndex === 1 ? 'active' : ''}`}
                                onClick={() => setActiveTabIndex(1)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Архив
                            </button>
                            <button 
                                className={`company-vacancies-page__tab ${activeTabIndex === 2 ? 'active' : ''}`}
                                onClick={() => setActiveTabIndex(2)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 2l7.586 7.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Черновики
                            </button>
                        </div>

                        <div className="company-vacancies-page__content-area">
                            {activeTabIndex === 0 && <ActiveVacancies />}
                            {activeTabIndex === 1 && <ArchiveVacancies />}
                            {activeTabIndex === 2 && <DraftVacancies />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};