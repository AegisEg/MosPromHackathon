import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../../../redux/store';
import { deleteVacancyAction } from '../../../redux/vacancy/actions';
import { formatVacancyDate } from '../../../utils/dateFormatter';
import './VacancyCard.scss';

interface VacancyCardProps {
    id: number;
    title: string;
    salary: string;
    region: string;
    responsesCount: number;
    isActive?: boolean;
    createdAt: string;
}

const VacancyCard: React.FC<VacancyCardProps> = ({
    id,
    title,
    salary,
    region,
    responsesCount,
    isActive = false,
    createdAt
}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/lk/vacancies/${id}`);
    };

    return (
        <div className={`vacancy-card ${isActive ? 'vacancy-card--active' : ''}`} onClick={handleCardClick}>
            <div className="vacancy-card__content">
                <div className="vacancy-card__status">
                    {isActive ? (
                        <div className="vacancy-card__status-active">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_202_5936" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                                    <rect width="14" height="14" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_202_5936)">
                                    <path d="M7.00004 9.33333C7.72921 9.33333 8.349 9.07812 8.85942 8.5677C9.36983 8.05729 9.62504 7.43749 9.62504 6.70833C9.62504 5.97916 9.36983 5.35937 8.85942 4.84895C8.349 4.33854 7.72921 4.08333 7.00004 4.08333C6.27087 4.08333 5.65108 4.33854 5.14067 4.84895C4.63025 5.35937 4.37504 5.97916 4.37504 6.70833C4.37504 7.43749 4.63025 8.05729 5.14067 8.5677C5.65108 9.07812 6.27087 9.33333 7.00004 9.33333ZM7.00004 8.28333C6.56254 8.28333 6.19067 8.1302 5.88442 7.82395C5.57817 7.5177 5.42504 7.14583 5.42504 6.70833C5.42504 6.27083 5.57817 5.89895 5.88442 5.5927C6.19067 5.28645 6.56254 5.13333 7.00004 5.13333C7.43754 5.13333 7.80942 5.28645 8.11567 5.5927C8.42192 5.89895 8.57504 6.27083 8.57504 6.70833C8.57504 7.14583 8.42192 7.5177 8.11567 7.82395C7.80942 8.1302 7.43754 8.28333 7.00004 8.28333ZM7.00004 11.0833C5.5806 11.0833 4.28754 10.6871 3.12087 9.89479C1.95421 9.10243 1.10837 8.04027 0.583374 6.70833C1.10837 5.37638 1.95421 4.31423 3.12087 3.52187C4.28754 2.72951 5.5806 2.33333 7.00004 2.33333C8.41949 2.33333 9.71254 2.72951 10.8792 3.52187C12.0459 4.31423 12.8917 5.37638 13.4167 6.70833C12.8917 8.04027 12.0459 9.10243 10.8792 9.89479C9.71254 10.6871 8.41949 11.0833 7.00004 11.0833ZM7.00004 9.91666C8.09865 9.91666 9.10733 9.62743 10.0261 9.04895C10.9448 8.47048 11.6473 7.69027 12.1334 6.70833C11.6473 5.72638 10.9448 4.94618 10.0261 4.3677C9.10733 3.78923 8.09865 3.49999 7.00004 3.49999C5.90143 3.49999 4.89275 3.78923 3.974 4.3677C3.05525 4.94618 2.35282 5.72638 1.86671 6.70833C2.35282 7.69027 3.05525 8.47048 3.974 9.04895C4.89275 9.62743 5.90143 9.91666 7.00004 9.91666Z" fill="#D00E46" />
                                </g>
                            </svg>
                            <span className="vacancy-card__status-text-active">Активная</span>
                            <span className="vacancy-card__status-published-date">
                                {formatVacancyDate(createdAt)}
                            </span>
                        </div>
                    ) : (
                        <div className="vacancy-card__status-inactive">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_202_5919" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                                    <rect width="14" height="14" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_202_5919)">
                                    <path d="M9.39171 7.7583L8.54587 6.91247C8.63337 6.45552 8.50212 6.02775 8.15212 5.62913C7.80212 5.23052 7.35004 5.07497 6.79587 5.16247L5.95004 4.31663C6.11532 4.23886 6.28303 4.18052 6.45317 4.14163C6.6233 4.10275 6.8056 4.0833 7.00004 4.0833C7.72921 4.0833 8.349 4.33851 8.85942 4.84893C9.36983 5.35934 9.62504 5.97913 9.62504 6.7083C9.62504 6.90275 9.6056 7.08504 9.56671 7.25518C9.52782 7.42531 9.46949 7.59302 9.39171 7.7583ZM11.2584 9.5958L10.4125 8.77913C10.782 8.49719 11.1101 8.18851 11.3969 7.85309C11.6837 7.51768 11.9292 7.13608 12.1334 6.7083C11.6473 5.72636 10.9497 4.94615 10.0407 4.36768C9.13164 3.7892 8.1181 3.49997 7.00004 3.49997C6.7181 3.49997 6.44101 3.51941 6.16879 3.5583C5.89657 3.59719 5.62921 3.65552 5.36671 3.7333L4.46254 2.82913C4.86115 2.66386 5.26948 2.5399 5.68754 2.45726C6.1056 2.37462 6.5431 2.3333 7.00004 2.3333C8.4681 2.3333 9.77573 2.7392 10.923 3.55101C12.0702 4.36281 12.9014 5.41525 13.4167 6.7083C13.1931 7.28191 12.899 7.8142 12.5344 8.30518C12.1698 8.79615 11.7445 9.22636 11.2584 9.5958ZM11.55 13.1833L9.10004 10.7625C8.75976 10.8694 8.41705 10.9496 8.07192 11.0031C7.72678 11.0566 7.36948 11.0833 7.00004 11.0833C5.53198 11.0833 4.22435 10.6774 3.07712 9.86559C1.9299 9.05379 1.09865 8.00136 0.583374 6.7083C0.787541 6.19302 1.04518 5.7142 1.35629 5.27184C1.6674 4.82948 2.02226 4.4333 2.42087 4.0833L0.816707 2.44997L1.63337 1.6333L12.3667 12.3666L11.55 13.1833ZM3.23754 4.89997C2.9556 5.15275 2.69796 5.42983 2.46462 5.73122C2.23129 6.03261 2.03199 6.3583 1.86671 6.7083C2.35282 7.69025 3.05039 8.47045 3.95942 9.04893C4.86844 9.6274 5.88199 9.91663 7.00004 9.91663C7.19448 9.91663 7.38407 9.90448 7.56879 9.88018C7.75351 9.85587 7.9431 9.82913 8.13754 9.79997L7.61254 9.2458C7.5056 9.27497 7.40351 9.29684 7.30629 9.31143C7.20907 9.32601 7.10699 9.3333 7.00004 9.3333C6.27087 9.3333 5.65108 9.07809 5.14067 8.56768C4.63025 8.05726 4.37504 7.43747 4.37504 6.7083C4.37504 6.60136 4.38233 6.49927 4.39692 6.40205C4.4115 6.30483 4.43337 6.20275 4.46254 6.0958L3.23754 4.89997Z" fill="#D00E46" />
                                </g>
                            </svg>
                            <span className="vacancy-card__status-text-inactive">Снята с публикации</span>
                            <span className="vacancy-card__status-published-date">
                                {formatVacancyDate(createdAt)}
                            </span>
                        </div>
                    )}
                </div>
                <div className="vacancy-card__responses">
                    <span className="vacancy-card__responses-label">отклики</span>
                    <span className={`vacancy-card__responses-count ${isActive ? 'active' : ''}`}>
                        {responsesCount}
                    </span>
                </div>
                <h3 className="vacancy-card__title">{title}</h3>
                <p className="vacancy-card__salary">{salary}</p>
                <p className="vacancy-card__region">
                    Регион - <span className="vacancy-card__region-value">{region}</span>
                </p>
            </div>
        </div>
    );
};

export default VacancyCard;
