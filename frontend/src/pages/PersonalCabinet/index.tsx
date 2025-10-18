import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/user/selectors';
import { UserRole } from '../../enums/UserRole';
import JobSeekerDashboard from '../JobSeekerDashboard';
import EmployerDashboard from '../EmployerDashboard';
import AdminDashboard from '../AdminDashboard';
import InstituteDashboard from '../InstituteDashboard';
import Loader from '../../components/default/Loader';
import { LoadStatus } from '../../utils/types';

const PersonalCabinet: React.FC = () => {
    const { data: userData, status } = useSelector(selectUserData);

    if (status === LoadStatus.IN_PROGRESS) {
        return <Loader />;
    }

    switch (userData?.role) {
        case UserRole.JOB_SEEKER:
            return <JobSeekerDashboard />;
        
        case UserRole.EMPLOYER:
            return <EmployerDashboard />;
        
        case UserRole.ADMIN:
            return <AdminDashboard />;
        
        case UserRole.INSTITUTE:
            return <InstituteDashboard />;
        
        default:
            return (
                <></>
            );
    }
};

export default PersonalCabinet;

