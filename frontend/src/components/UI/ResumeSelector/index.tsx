import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../../redux/store';
import { selectResumesData, selectResumesStatus } from '../../../redux/resume/selectors';
import { getUserResumesAction } from '../../../redux/resume/actions';
import { LoadStatus } from '../../../utils/types';
import { ResumeData } from '../../../redux/resume/types';
import Loader from '../../default/Loader';
import Button, { ButtonType } from '../Button';
import './style.scss';

interface ResumeSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (resumeId: number, message: string) => void;
    vacancyId: number;
}

const ResumeSelector: React.FC<ResumeSelectorProps> = ({ 
    isOpen, 
    onClose, 
    onSelect, 
    vacancyId 
}) => {
    const dispatch = useTypedDispatch();
    const resumes = useSelector(selectResumesData);
    const resumesStatus = useSelector(selectResumesStatus);
    const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (isOpen) {
            dispatch(getUserResumesAction());
            // Блокируем скролл страницы
            document.body.style.overflow = 'hidden';
        } else {
            // Разблокируем скролл страницы
            document.body.style.overflow = 'unset';
        }

        // Cleanup при размонтировании компонента
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, dispatch]);

    const handleSelectResume = () => {
        if (selectedResumeId) {
            onSelect(selectedResumeId, message);
            onClose();
        }
    };

    const handleClose = () => {
        setSelectedResumeId(null);
        setMessage('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="resume-selector-overlay">
            <div className="resume-selector-modal">
                <div className="resume-selector-header">
                    <h2>Выберите резюме для отклика</h2>
                    <button className="resume-selector-close" onClick={handleClose}>
                        ×
                    </button>
                </div>

                <div className="resume-selector-content">
                    {resumesStatus === LoadStatus.IN_PROGRESS ? (
                        <div className="resume-selector-loading">
                            <p>Загрузка резюме...</p>
                        </div>
                    ) : resumes.length === 0 ? (
                        <div className="resume-selector-empty">
                            <p>У вас нет резюме для отклика</p>
                            <p>Создайте резюме в личном кабинете</p>
                        </div>
                    ) : (
                        <div className="resume-selector-list">
                            {resumes.map((resume: ResumeData) => (
                                <div 
                                    key={resume.id} 
                                    className={`resume-selector-item ${selectedResumeId === resume.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedResumeId(resume.id!)}
                                >
                                    <div className="resume-selector-item-content">
                                        <h3 className="resume-selector-item-title">
                                            {resume.profession}
                                        </h3>
                                        <div className="resume-selector-item-details">
                                            <p><strong>Город:</strong> {resume.city}</p>
                                            <p><strong>Телефон:</strong> {resume.phone}</p>
                                            {resume.salary && (
                                                <p><strong>Желаемая зарплата:</strong> {resume.salary.toLocaleString()} ₽</p>
                                            )}
                                            <p><strong>Статус:</strong> 
                                                <span className={`status ${resume.status ? 'active' : 'inactive'}`}>
                                                    {resume.status ? 'Активно' : 'Неактивно'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="resume-selector-item-radio">
                                        <input 
                                            type="radio" 
                                            name="resume" 
                                            checked={selectedResumeId === resume.id}
                                            onChange={() => setSelectedResumeId(resume.id!)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Поле для сообщения */}
                {resumes.length > 0 && (
                    <div className="resume-selector-message">
                        <label className="resume-selector-message__label">
                            Сообщение работодателю (необязательно)
                        </label>
                        <textarea
                            className="resume-selector-message__textarea"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Напишите сопроводительное письмо..."
                            rows={3}
                            maxLength={255}
                        />
                        <div className="resume-selector-message__counter">
                            {message.length}/255
                        </div>
                    </div>
                )}

                <div className="resume-selector-footer">
                    <Button 
                        variant={ButtonType.GRAY} 
                        onClick={handleClose}
                    >
                        Отмена
                    </Button>
                    <Button 
                        onClick={handleSelectResume}
                        disabled={!selectedResumeId || resumesStatus === LoadStatus.IN_PROGRESS}
                    >
                        Откликнуться
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ResumeSelector;
