import React from 'react';
import './style.scss';

const JobSeekerDashboard: React.FC = () => {
    return (
        <div className="job-seeker-dashboard-page">
          <div className="container">
            <div className="wrapper">
              <div className="job-seeker-dashboard-page__content">
                <h1 className="job-seeker-dashboard-page__title">
                  Личный кабинет соискателя
                </h1>
              </div>
            </div>
          </div>
        </div>
    );
};

export default JobSeekerDashboard;
