import React from 'react';
import { useNavigate } from 'react-router-dom';
import VacancyForm from '../../components/forms/VacancyForm';
import './styles.scss';

const CreateVacancy: React.FC = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate('/lk/vacancies');
    };

    const handleCancel = () => {
        navigate('/lk/vacancies');
    };

    return (
        <div className="create-vacancy-page">
            <div className="container">
                <div className="wrapper">
                    <VacancyForm 
                        onSuccess={handleSuccess}
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateVacancy;