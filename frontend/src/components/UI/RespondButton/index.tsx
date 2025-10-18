import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../../../redux/store';
import { selectAuthData } from '../../../redux/user/selectors';
import { selectRespondToVacancyStatus } from '../../../redux/respond/selectors';
import { respondToVacancyAction } from '../../../redux/respond/actions';
import { LoadStatus } from '../../../utils/types';
import ResumeSelector from '../ResumeSelector';
import './style.scss';

interface RespondButtonProps {
    vacancyId: number;
    className?: string;
}

const RespondButton: React.FC<RespondButtonProps> = ({ vacancyId, className = '' }) => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const { token } = useSelector(selectAuthData);
    const respondStatus = useSelector(selectRespondToVacancyStatus);
    const [isResumeSelectorOpen, setIsResumeSelectorOpen] = useState(false);

    const handleRespond = () => {
        if (!token) {
            // Если пользователь не авторизован, перенаправляем на авторизацию
            navigate('/authorization');
            return;
        }

        // Открываем селектор резюме
        setIsResumeSelectorOpen(true);
    };

    const handleResumeSelect = async (resumeId: number, message: string) => {
        try {
            await dispatch(respondToVacancyAction({ vacancyId, resumeId, message })).unwrap();
            alert('Отклик успешно отправлен!');
        } catch (error) {
            alert('Ошибка при отправке отклика');
        }
    };

    const isLoading = respondStatus === LoadStatus.IN_PROGRESS;

    return (
        <>
            <button
                className={`respond-button ${className} ${isLoading ? 'loading' : ''}`}
                onClick={handleRespond}
                disabled={isLoading}
                title={token ? 'Откликнуться на вакансию' : 'Войдите для отклика'}
            >
                {isLoading ? (
                    <div className="respond-button__spinner"></div>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
            </button>

            <ResumeSelector
                isOpen={isResumeSelectorOpen}
                onClose={() => setIsResumeSelectorOpen(false)}
                onSelect={handleResumeSelect}
                vacancyId={vacancyId}
            />
        </>
    );
};

export default RespondButton;
