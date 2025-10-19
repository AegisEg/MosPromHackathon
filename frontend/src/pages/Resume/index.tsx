import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../redux/store';
import { getResumeAction } from '../../redux/resume/actions';
import { selectCurrentResumeData, selectCurrentResumeStatus } from '../../redux/resume/selectors';
import { LoadStatus } from '../../utils/types';
import { formatWithDeclension, formatTimePeriod } from '../../utils/declension';
import Loader from '../../components/default/Loader';
import './style.scss';
import HR from '../../components/default/HR';
import Photo from '../../components/Photo';

function Resume() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const resume = useSelector(selectCurrentResumeData);
  const resumeStatus = useSelector(selectCurrentResumeStatus);

  useEffect(() => {
    if (id) {
      dispatch(getResumeAction(parseInt(id)));
    }
  }, [dispatch, id]);

  // Отладочная информация
  useEffect(() => {
    if (resume) {
      console.log('Resume data:', resume);
      console.log('Experiences:', resume.experiences);
      console.log('Educations:', resume.educations);
      console.log('Education type:', typeof resume.education);
      console.log('Education value:', resume.education);
      console.log('Is education array:', Array.isArray(resume.education));
      console.log('Education length:', resume.education?.length);
    }
  }, [resume]);

  const handleBack = () => {
    navigate(-1);
  };

  const formatSalary = (salary?: number) => {
    if (!salary) return 'Уровень дохода не указан';
    return `${salary.toLocaleString()} Р`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString || dateString === '' || dateString === 'null' || dateString === 'undefined') {
      return 'Не указана';
    }
    
    try {
      // Проверяем формат DD.MM.YYYY
      if (dateString.includes('.')) {
        const parts = dateString.split('.');
        if (parts.length === 3) {
          const day = parts[0];
          const month = parts[1];
          const year = parts[2];
          // Создаем дату в формате YYYY-MM-DD для корректного парсинга
          const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          const date = new Date(isoDate);
          
          if (!isNaN(date.getTime())) {
            return date.toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          }
        }
      }
      
      // Если не DD.MM.YYYY, пробуем стандартный парсинг
      const date = new Date(dateString);
      
      // Проверяем, что дата валидна
      if (isNaN(date.getTime())) {
        console.warn('Invalid date string:', dateString);
        return 'Неверная дата';
      }
      
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error, 'for date:', dateString);
      return 'Неверная дата';
    }
  };

  const safeRender = (value: any, fallback: string = 'Не указано') => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'object' && value.name) return value.name;
    if (typeof value === 'object' && value.title) return value.title;
    return fallback;
  };

  if (resumeStatus === LoadStatus.IN_PROGRESS) {
    return (
      <div className="resume-page">
        <div className="container">
          <div className="wrapper">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (resumeStatus === LoadStatus.ERROR || !resume) {
    return (
      <div className="resume-page">
        <div className="container">
          <div className="wrapper">
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Ошибка при загрузке резюме или резюме не найдено</p>
              <button onClick={handleBack} style={{ 
                background: '#D00E46', 
                color: 'white', 
                padding: '10px 20px', 
                border: 'none', 
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '20px'
              }}>
                Вернуться назад
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Безопасная обработка данных
  const safeResume = {
    ...resume,
    profession: safeRender(resume.profession, 'Профессия не указана'),
    city: safeRender(resume.city, 'Город не указан'),
    country: safeRender(resume.country, 'Страна не указана'),
    phone: safeRender(resume.phone, 'Телефон не указан'),
    about: safeRender(resume.about, ''),
    education: safeRender(resume.education, ''),
    skills: Array.isArray(resume.skills) ? resume.skills : [],
    // Образование может приходить как в поле education, так и в educations
    educations: Array.isArray(resume.educations) ? resume.educations : (Array.isArray(resume.education) ? resume.education : []),
    experiences: Array.isArray(resume.experiences) ? resume.experiences : []
  };

  // Отладочная информация для safeResume
  console.log('SafeResume educations:', safeResume.educations);
  console.log('SafeResume educations length:', safeResume.educations.length);
  
  // Отладочная информация для дат
  if (safeResume.experiences.length > 0) {
    console.log('Experience dates:', safeResume.experiences.map(exp => ({
      startDate: exp.startDate,
      endDate: exp.endDate
    })));
  }
  if (safeResume.educations.length > 0) {
    console.log('Education dates:', safeResume.educations.map(edu => ({
      startDate: edu.startDate,
      endDate: edu.endDate
    })));
  }
  
  return (
    <div className="resume-page">
      <div className="container">
        <div className="wrapper">
          {/* Кнопка назад */}
          <div style={{ marginBottom: '20px' }}>
            <button 
              onClick={handleBack} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none', 
                border: '1px solid #D00E46', 
                color: '#D00E46',
                padding: '8px 16px', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#D00E46';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#D00E46';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Вернуться назад
            </button>
          </div>
          
          <div className="resume__header">
            <div className="resume__header-info">
              <h1 className="resume__header-info-title">{safeResume.profession}</h1>
              <p className="resume__header-info-subtitle">{formatSalary(safeResume.salary)}</p>
              <p className="resume__header-info-subtitle"><span>Город:</span> {safeResume.city}</p>
              <p className="resume__header-info-subtitle"><span>Страна:</span> {safeResume.country}</p>
              <p className="resume__header-info-subtitle"><span>Телефон:</span> {safeResume.phone}</p>
              {(resume as any)?.email && (
                <p className="resume__header-info-subtitle"><span>Email:</span> {(resume as any).email}</p>
              )}
              {(resume as any)?.employmentType && (
                <p className="resume__header-info-subtitle"><span>Тип занятости:</span> {(resume as any).employmentType}</p>
              )}
              {safeResume.dateOfBirth && (
                <p className="resume__header-info-subtitle"><span>Дата рождения:</span> {formatDate(safeResume.dateOfBirth)}</p>
              )}
              {safeResume.createdAt && (
                <p className="resume__header-info-subtitle"><span>Резюме создано:</span> {formatDate(safeResume.createdAt)}</p>
              )}
              {safeResume.updatedAt && (
                <p className="resume__header-info-subtitle"><span>Последнее обновление:</span> {formatDate(safeResume.updatedAt)}</p>
              )}
              {(resume as any)?.experienceTime && (
                <p className="resume__header-info-subtitle">
                  <span>Общий опыт работы:</span> {formatTimePeriod(Math.floor((resume as any).experienceTime / 12), (resume as any).experienceTime % 12)}
                </p>
              )}
            </div>
            <div className="resume__header-photo">
              <div className="resume__header-photo-container">
                <Photo photo={''} onChange={() => {}} />
                <div className="resume__header-photo-fio">
                  {(resume as any)?.firstName && (resume as any)?.lastName 
                    ? `${(resume as any).firstName} ${(resume as any).lastName}`
                    : 'Кандидат'
                  }
                </div>
              </div>
            </div>
            <div className="resume__header-skills">
              <div className="skills-list">
                {safeResume.skills.map((skill, index) => (
                  <div className="skill-item" key={index}>
                    {typeof skill === 'object' && skill.name ? skill.name : safeRender(skill, `Навык #${index + 1}`)}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <HR margin={36} />
          <div className="resume__body">
            {safeResume.about && (
              <div className="inner-wrapper">
                <div className="inner-wrapper_title">Обо мне</div>
                <div className="inner-wrapper_text">{safeResume.about}</div>
              </div>
            )}
            {safeResume.experiences.length > 0 && (
              <div className="inner-wrapper">
                <div className="inner-wrapper_title">Опыт работы</div>
                <div className="inner-wrapper_text">
                  {safeResume.experiences.map((experience, index) => (
                    <div className="inner-wrapper_text-item" key={index}>
                      <div className="inner-wrapper_text-item-company">
                        🏢 {safeRender(experience.companyName, 'Компания')}
                      </div>
                      <div className="inner-wrapper_text-item-position">
                        💼 {safeRender(experience.position, 'Должность')}
                      </div>
                      <div className="inner-wrapper_text-item-date">
                        📅 Дата начала: {formatDate(experience.startDate)} | Дата окончания: {experience.endDate && experience.endDate !== '' ? formatDate(experience.endDate) : 'по настоящее время'}
                      </div>
                      {experience.startDate && experience.endDate && experience.endDate !== '' && (
                        <div className="inner-wrapper_text-item-description">
                          ⏱️ Продолжительность работы: {(() => {
                            try {
                              // Функция для парсинга даты в формате DD.MM.YYYY
                              const parseDate = (dateStr: string) => {
                                if (dateStr.includes('.')) {
                                  const parts = dateStr.split('.');
                                  if (parts.length === 3) {
                                    const day = parts[0];
                                    const month = parts[1];
                                    const year = parts[2];
                                    const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                                    return new Date(isoDate);
                                  }
                                }
                                return new Date(dateStr);
                              };
                              
                              const start = parseDate(experience.startDate);
                              const end = parseDate(experience.endDate);
                              if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                                const diffTime = Math.abs(end.getTime() - start.getTime());
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                const years = Math.floor(diffDays / 365);
                                const months = Math.floor((diffDays % 365) / 30);
                                return formatTimePeriod(years, months);
                              }
                              return 'Не удалось рассчитать';
                            } catch (error) {
                              return 'Не удалось рассчитать';
                            }
                          })()}
                        </div>
                      )}
                      {experience.description && (
                        <div className="inner-wrapper_text-item-description">
                          📝 {safeRender(experience.description)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {safeResume.educations.length > 0 && (
              <div className="inner-wrapper">
                <div className="inner-wrapper_title">Образование</div>
                <div className="inner-wrapper_text">
                  {safeResume.educations.map((education, index) => (
                    <div className="inner-wrapper_text-item" key={index}>
                      <div className="inner-wrapper_text-item-institution">
                        🎓 {safeRender(education.institutionName, 'Учебное заведение')}
                      </div>
                      <div className="inner-wrapper_text-item-degree">
                        📜 {safeRender(education.degree, 'Степень не указана')}
                      </div>
                      <div className="inner-wrapper_text-item-specialization">
                        📚 {safeRender(education.specialization, 'Специализация не указана')}
                      </div>
                      <div className="inner-wrapper_text-item-date">
                        📅 Дата начала: {formatDate(education.startDate)} | Дата окончания: {education.endDate && education.endDate !== '' ? formatDate(education.endDate) : 'по настоящее время (учится)'}
                      </div>
                      {education.startDate && education.endDate && education.endDate !== '' && (
                        <div className="inner-wrapper_text-item-description">
                          ⏱️ Продолжительность обучения: {(() => {
                            try {
                              // Функция для парсинга даты в формате DD.MM.YYYY
                              const parseDate = (dateStr: string) => {
                                if (dateStr.includes('.')) {
                                  const parts = dateStr.split('.');
                                  if (parts.length === 3) {
                                    const day = parts[0];
                                    const month = parts[1];
                                    const year = parts[2];
                                    const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                                    return new Date(isoDate);
                                  }
                                }
                                return new Date(dateStr);
                              };
                              
                              const start = parseDate(education.startDate);
                              const end = parseDate(education.endDate);
                              if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                                const diffTime = Math.abs(end.getTime() - start.getTime());
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                const years = Math.floor(diffDays / 365);
                                const months = Math.floor((diffDays % 365) / 30);
                                return formatTimePeriod(years, months);
                              }
                              return 'Не удалось рассчитать';
                            } catch (error) {
                              return 'Не удалось рассчитать';
                            }
                          })()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {safeResume.education && typeof safeResume.education === 'string' && safeResume.education !== '' && (
              <div className="inner-wrapper">
                <div className="inner-wrapper_title">Образование (общее)</div>
                <div className="inner-wrapper_text">{safeResume.education}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
