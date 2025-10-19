import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../redux/store';
import { getVacancyByIdAction, deleteVacancyAction } from '../../redux/vacancy/actions';
import { getCompaniesAction } from '../../redux/company/actions';
import { getProfessionsAction } from '../../redux/profession/actions';
import { selectCurrentVacancyData, selectCurrentVacancyStatus } from '../../redux/vacancy/selectors';
import { LoadStatus } from '../../utils/types';
import Loader from '../../components/default/Loader';
import VacancyInfo from './components/VacancyInfo';
import VacancyResponses from './components/VacancyResponses';
import './styles.scss';

const VacancyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useTypedDispatch();
    
    const vacancy = useSelector(selectCurrentVacancyData);
    const vacancyStatus = useSelector(selectCurrentVacancyStatus);
    
    const [activeTab, setActiveTab] = useState<'info' | 'responses'>('responses');

    useEffect(() => {
        if (id) {
            dispatch(getVacancyByIdAction(parseInt(id)));
        }
        // Загружаем справочные данные
        dispatch(getCompaniesAction());
        dispatch(getProfessionsAction());
    }, [dispatch, id]);

    const handleBack = () => {
        navigate('/lk/vacancies');
    };

    const handleEdit = () => {
        if (vacancy?.id) {
            navigate(`/lk/vacancies/edit/${vacancy.id}`);
        }
    };

    const handleToggleStatus = async () => {
        if (vacancy?.id) {
            try {
                // Здесь нужно будет добавить API для изменения статуса вакансии
                // Пока что просто показываем сообщение
                const action = vacancy.status ? 'снять с публикации' : 'вернуть в публикацию';
                alert(`Функция "${action}" будет реализована позже`);
            } catch (error) {
                console.error('Ошибка при изменении статуса вакансии:', error);
                alert('Ошибка при изменении статуса вакансии');
            }
        }
    };

    const handleDelete = async () => {
        if (vacancy?.id && window.confirm('Вы уверены, что хотите удалить эту вакансию?')) {
            try {
                await dispatch(deleteVacancyAction(vacancy.id)).unwrap();
                navigate('/lk/vacancies');
            } catch (error) {
                console.error('Ошибка при удалении вакансии:', error);
                alert('Ошибка при удалении вакансии');
            }
        }
    };

    if (vacancyStatus === LoadStatus.IN_PROGRESS) {
        return (
            <div className="vacancy-detail-page">
                <div className="container">
                    <div className="loading-container">
                        <Loader />
                    </div>
                </div>
            </div>
        );
    }

    if (vacancyStatus === LoadStatus.ERROR || !vacancy) {
        return (
            <div className="vacancy-detail-page">
                <div className="container">
                    <div className="error-container">
                        <p>Ошибка при загрузке вакансии</p>
                        <button onClick={handleBack} className="back-button">
                            Вернуться к списку вакансий
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="vacancy-detail-page">
            <div className="container">
                <div className="wrapper">
                    <div className="vacancy-detail-page__content">
                        <div className="vacancy-detail-page__navigation-wrapper">
                            <div className="vacancy-detail-page__back-section">
                                <button onClick={handleBack} className="vacancy-detail-page__back-button">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Вернуться к списку вакансий
                                </button>
                            </div>
                            
                            <div className="vacancy-detail-page__actions">
                                <div onClick={handleEdit} className="vacancy-detail-page__action-item">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_202_5868" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                                            <rect width="14" height="14" fill="#D00E46" />
                                        </mask>
                                        <g mask="url(#mask0_202_5868)">
                                            <path d="M8.16671 12.8333V11.0396L11.3896 7.83126C11.4771 7.74376 11.5743 7.68056 11.6813 7.64167C11.7882 7.60278 11.8952 7.58334 12.0021 7.58334C12.1188 7.58334 12.2306 7.60521 12.3375 7.64896C12.4445 7.69271 12.5417 7.75834 12.6292 7.84584L13.1688 8.38542C13.2466 8.47292 13.3073 8.57014 13.3511 8.67709C13.3948 8.78403 13.4167 8.89098 13.4167 8.99792C13.4167 9.10487 13.3973 9.21424 13.3584 9.32605C13.3195 9.43785 13.2563 9.53751 13.1688 9.62501L9.96046 12.8333H8.16671ZM9.04171 11.9583H9.59587L11.3605 10.1792L11.098 9.90209L10.8209 9.63959L9.04171 11.4042V11.9583ZM3.50004 12.8333C3.17921 12.8333 2.90455 12.7191 2.67608 12.4906C2.44761 12.2622 2.33337 11.9875 2.33337 11.6667V2.33334C2.33337 2.01251 2.44761 1.73785 2.67608 1.50938C2.90455 1.28091 3.17921 1.16667 3.50004 1.16667H8.16671L11.6667 4.66667V6.41667H10.5V5.25001H7.58337V2.33334H3.50004V11.6667H7.00004V12.8333H3.50004ZM11.098 9.90209L10.8209 9.63959L11.3605 10.1792L11.098 9.90209Z" fill="#C7C7CC" />
                                        </g>
                                    </svg>
                                    <span className="vacancy-detail-page__action-item-text">Редактировать</span>
                                </div>
                                {vacancy?.status ? (
                                    <div onClick={handleToggleStatus} className="vacancy-detail-page__action-item">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_202_5873" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                                                <rect width="14" height="14" fill="#D9D9D9" />
                                            </mask>
                                            <g mask="url(#mask0_202_5873)">
                                                <path d="M9.39171 7.75833L8.54587 6.9125C8.63337 6.45555 8.50212 6.02778 8.15212 5.62916C7.80212 5.23055 7.35004 5.075 6.79587 5.1625L5.95004 4.31666C6.11532 4.23889 6.28303 4.18055 6.45317 4.14166C6.6233 4.10278 6.8056 4.08333 7.00004 4.08333C7.72921 4.08333 8.349 4.33854 8.85942 4.84896C9.36983 5.35937 9.62504 5.97917 9.62504 6.70833C9.62504 6.90278 9.6056 7.08507 9.56671 7.25521C9.52782 7.42535 9.46949 7.59305 9.39171 7.75833ZM11.2584 9.59583L10.4125 8.77916C10.782 8.49722 11.1101 8.18854 11.3969 7.85312C11.6837 7.51771 11.9292 7.13611 12.1334 6.70833C11.6473 5.72639 10.9497 4.94618 10.0407 4.36771C9.13164 3.78923 8.1181 3.5 7.00004 3.5C6.7181 3.5 6.44101 3.51944 6.16879 3.55833C5.89657 3.59722 5.62921 3.65555 5.36671 3.73333L4.46254 2.82916C4.86115 2.66389 5.26948 2.53993 5.68754 2.45729C6.1056 2.37465 6.5431 2.33333 7.00004 2.33333C8.4681 2.33333 9.77573 2.73923 10.923 3.55104C12.0702 4.36285 12.9014 5.41528 13.4167 6.70833C13.1931 7.28194 12.899 7.81423 12.5344 8.30521C12.1698 8.79618 11.7445 9.22639 11.2584 9.59583ZM11.55 13.1833L9.10004 10.7625C8.75976 10.8694 8.41705 10.9497 8.07192 11.0031C7.72678 11.0566 7.36948 11.0833 7.00004 11.0833C5.53198 11.0833 4.22435 10.6774 3.07712 9.86562C1.9299 9.05382 1.09865 8.00139 0.583374 6.70833C0.787541 6.19305 1.04518 5.71423 1.35629 5.27187C1.6674 4.82951 2.02226 4.43333 2.42087 4.08333L0.816707 2.45L1.63337 1.63333L12.3667 12.3667L11.55 13.1833ZM3.23754 4.9C2.9556 5.15278 2.69796 5.42986 2.46462 5.73125C2.23129 6.03264 2.03199 6.35833 1.86671 6.70833C2.35282 7.69028 3.05039 8.47048 3.95942 9.04896C4.86844 9.62743 5.88199 9.91667 7.00004 9.91667C7.19448 9.91667 7.38407 9.90451 7.56879 9.88021C7.75351 9.8559 7.9431 9.82916 8.13754 9.8L7.61254 9.24583C7.5056 9.275 7.40351 9.29687 7.30629 9.31146C7.20907 9.32604 7.10699 9.33333 7.00004 9.33333C6.27087 9.33333 5.65108 9.07812 5.14067 8.56771C4.63025 8.05729 4.37504 7.4375 4.37504 6.70833C4.37504 6.60139 4.38233 6.4993 4.39692 6.40208C4.4115 6.30486 4.43337 6.20278 4.46254 6.09583L3.23754 4.9Z" fill="#C7C7CC" />
                                            </g>
                                        </svg>
                                        <span className="vacancy-detail-page__action-item-text">Снять с публикации</span>
                                    </div>
                                ) : (
                                    <div onClick={handleToggleStatus} className="vacancy-detail-page__action-item">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_202_5917" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                                                <rect width="14" height="14" fill="#D9D9D9" />
                                            </mask>
                                            <g mask="url(#mask0_202_5917)">
                                                <path d="M7.00004 9.33331C7.72921 9.33331 8.349 9.0781 8.85942 8.56769C9.36983 8.05727 9.62504 7.43748 9.62504 6.70831C9.62504 5.97915 9.36983 5.35935 8.85942 4.84894C8.349 4.33852 7.72921 4.08331 7.00004 4.08331C6.27087 4.08331 5.65108 4.33852 5.14067 4.84894C4.63025 5.35935 4.37504 5.97915 4.37504 6.70831C4.37504 7.43748 4.63025 8.05727 5.14067 8.56769C5.65108 9.0781 6.27087 9.33331 7.00004 9.33331ZM7.00004 8.28331C6.56254 8.28331 6.19067 8.13019 5.88442 7.82394C5.57817 7.51769 5.42504 7.14581 5.42504 6.70831C5.42504 6.27081 5.57817 5.89894 5.88442 5.59269C6.19067 5.28644 6.56254 5.13331 7.00004 5.13331C7.43754 5.13331 7.80942 5.28644 8.11567 5.59269C8.42192 5.89894 8.57504 6.27081 8.57504 6.70831C8.57504 7.14581 8.42192 7.51769 8.11567 7.82394C7.80942 8.13019 7.43754 8.28331 7.00004 8.28331ZM7.00004 11.0833C5.5806 11.0833 4.28754 10.6871 3.12087 9.89477C1.95421 9.10241 1.10837 8.04026 0.583374 6.70831C1.10837 5.37637 1.95421 4.31422 3.12087 3.52185C4.28754 2.72949 5.5806 2.33331 7.00004 2.33331C8.41949 2.33331 9.71254 2.72949 10.8792 3.52185C12.0459 4.31422 12.8917 5.37637 13.4167 6.70831C12.8917 8.04026 12.0459 9.10241 10.8792 9.89477C9.71254 10.6871 8.41949 11.0833 7.00004 11.0833ZM7.00004 9.91665C8.09865 9.91665 9.10733 9.62741 10.0261 9.04894C10.9448 8.47047 11.6473 7.69026 12.1334 6.70831C11.6473 5.72637 10.9448 4.94616 10.0261 4.36769C9.10733 3.78922 8.09865 3.49998 7.00004 3.49998C5.90143 3.49998 4.89275 3.78922 3.974 4.36769C3.05525 4.94616 2.35282 5.72637 1.86671 6.70831C2.35282 7.69026 3.05525 8.47047 3.974 9.04894C4.89275 9.62741 5.90143 9.91665 7.00004 9.91665Z" fill="#D00E46" />
                                            </g>
                                        </svg>
                                        <span className="vacancy-detail-page__action-item-text vacancy-detail-page__action-item-text--red">Вернуть публикацию</span>
                                    </div>
                                )}
                                <div onClick={handleDelete} className="vacancy-detail-page__action-item">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_202_5878" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                                            <rect width="14" height="14" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_202_5878)">
                                            <path d="M5.48337 9.625L7.00004 8.10833L8.51671 9.625L9.33337 8.80833L7.81671 7.29167L9.33337 5.775L8.51671 4.95833L7.00004 6.475L5.48337 4.95833L4.66671 5.775L6.18337 7.29167L4.66671 8.80833L5.48337 9.625ZM4.08337 12.25C3.76254 12.25 3.48789 12.1358 3.25942 11.9073C3.03094 11.6788 2.91671 11.4042 2.91671 11.0833V3.5H2.33337V2.33333H5.25004V1.75H8.75004V2.33333H11.6667V3.5H11.0834V11.0833C11.0834 11.4042 10.9691 11.6788 10.7407 11.9073C10.5122 12.1358 10.2375 12.25 9.91671 12.25H4.08337ZM9.91671 3.5H4.08337V11.0833H9.91671V3.5Z" fill="#C7C7CC" />
                                        </g>
                                    </svg>
                                    <span className="vacancy-detail-page__action-item-text">Удалить</span>
                                </div>
                            </div>
                        </div>
                        <div className="vacancy-detail-page__header">
                            <h1 className="vacancy-detail-page__title">
                                {vacancy.title || 'Название вакансии'}
                            </h1>
                        </div>

                        <div className="vacancy-detail-page__tabs">
                            <button 
                                className={`vacancy-detail-page__tab ${activeTab === 'info' ? 'active' : ''}`}
                                onClick={() => setActiveTab('info')}
                            >
                                Информация по вакансии
                            </button>
                            <button 
                                className={`vacancy-detail-page__tab ${activeTab === 'responses' ? 'active' : ''}`}
                                onClick={() => setActiveTab('responses')}
                            >
                                Отклики
                            </button>
                        </div>

                        <div className="vacancy-detail-page__content-area">
                            {activeTab === 'info' ? (
                                <VacancyInfo vacancy={vacancy} />
                            ) : (
                                <VacancyResponses vacancyId={vacancy.id || 0} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VacancyDetail;
