import React, { useRef, useState } from 'react';
import './style.scss';
import HR from '../../components/default/HR';
import resumeData from '../../data/resume-data.json';
import Photo from '../../components/Photo';

function Resume() {
  const [fullName, setFullName] = useState(resumeData.full_name);
  
  return (
    <div className="resume-page">
      <div className="container">
        <div className="wrapper">
          <div className="resume__header">
            <div className="resume__header-info">
              <h1 className="resume__header-info-title">UX/UI-дизайнер</h1>
              <p className="resume__header-info-subtitle">Уровень дохода не указан</p>
              <p className="resume__header-info-subtitle"><span>Тип занятости:</span> Постоянная работа</p>
              <p className="resume__header-info-subtitle"><span>Формат работы:</span> Удаленно, на месте работодателя</p>
              <p className="resume__header-info-subtitle"><span>Время в пути до работы:</span> не более часа</p>
              <p className="resume__header-info-subtitle"><span>Командировки:</span> Всегда за</p>
            </div>
            <div className="resume__header-photo">
              <div className="resume__header-photo-container">
                <Photo photo={resumeData.photo} onChange={() => {}} />
                <div className="resume__header-photo-fio">{resumeData.full_name}</div>
              </div>
            </div>
            <div className="resume__header-skills">
              <div className="skills-list">
                {resumeData.skills.map((skill) => (
                  <div className="skill-item" key={skill}>{skill}</div>
                ))}
              </div>
            </div>
          </div>
          <HR margin={36} />
          <div className="resume__body">
            <div className="inner-wrapper">
              <div className="inner-wrapper_title">Обо мне</div>
              <div className="inner-wrapper_text">{resumeData.about}</div>
            </div>
            <div className="inner-wrapper">
              <div className="inner-wrapper_title">Опыт работы</div>
              <div className="inner-wrapper_text">{resumeData.experiences.map((experience) => (
                <div className="inner-wrapper_text-item" key={experience.company_name}>
                  <div className="inner-wrapper_text-item-company">{experience.company_name}</div>
                  <div className="inner-wrapper_text-item-position">{experience.position}</div>
                  <div className="inner-wrapper_text-item-date">{experience.start_date} - {experience.end_date}</div>
                </div>
              ))}</div>
            </div>
            <div className="inner-wrapper">
              <div className="inner-wrapper_title">Образование</div>
              <div className="inner-wrapper_text">{resumeData.educations.map((education) => (
                <div className="inner-wrapper_text-item" key={education.institution_name}>
                  <div className="inner-wrapper_text-item-institution">{education.institution_name}</div>
                  <div className="inner-wrapper_text-item-degree">{education.degree}</div>
                  <div className="inner-wrapper_text-item-specialization">{education.specialization}</div>
                </div>
              ))}</div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default Resume;
