import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VacancyForm from '../../components/forms/VacancyForm';
import './styles.scss';

const EditVacancy: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const vacancyId = id ? parseInt(id) : undefined;

    const handleSuccess = () => {
        navigate('/lk/vacancies');
    };

    const handleCancel = () => {
        navigate('/lk/vacancies');
    };

    if (!vacancyId) {
        navigate('/lk/vacancies');
        return null;
    }

    return (
        <div className="edit-vacancy-page">
            <div className="container">
                <div className="wrapper">
                    <VacancyForm 
                        vacancyId={vacancyId}
                        onSuccess={handleSuccess}
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditVacancy;
