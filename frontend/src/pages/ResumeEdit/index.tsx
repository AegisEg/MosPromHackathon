import React, { useState } from 'react';
import './style.scss';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Textarea from '../../components/UI/Textarea';
import Toggle from '../../components/UI/Toggle';
import Button from '../../components/UI/Button';
import DateInput from '../../components/UI/DateInput';
import type { 
  Education, 
  Experience, 
  Project, 
  Certificate, 
  Language, 
  Reference, 
  Link 
} from '../../types/resume.types';
import { DefaultValue } from '../../types/default.types';

function ResumeEdit() {
  // Основная информация
  const [lastName, setLastName] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [firstName, setFirstName] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [middleName, setMiddleName] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [email, setEmail] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [dateOfBirth, setDateOfBirth] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [city, setCity] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [country, setCountry] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [phone, setPhone] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [about, setAbout] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [professionId, setProfessionId] = useState<DefaultValue<number>>({ value: 0, success: false, error: '', isDisabled: false });
  const [education, setEducation] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [salary, setSalary] = useState<DefaultValue<number>>({ value: 0, success: false, error: '', isDisabled: false });
  const [status, setStatus] = useState<DefaultValue<boolean>>({ value: false, success: false, error: '', isDisabled: false });
  const [photo, setPhoto] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  
  // Навыки
  const [skills, setSkills] = useState<DefaultValue<string[]>>({ value: [], success: false, error: '', isDisabled: false });
  
  // Образование
  const [educations, setEducations] = useState<DefaultValue<Education[]>>({ value: [], success: false, error: '', isDisabled: false });
  
  // Опыт работы
  const [experiences, setExperiences] = useState<DefaultValue<Experience[]>>({ value: [], success: false, error: '', isDisabled: false });
  
  // Проекты
  const [projects, setProjects] = useState<DefaultValue<Project[]>>({ value: [], success: false, error: '', isDisabled: false });
  
  // Сертификаты
  const [certificates, setCertificates] = useState<DefaultValue<Certificate[]>>({ value: [], success: false, error: '', isDisabled: false });
  
  // Языки
  const [languages, setLanguages] = useState<DefaultValue<Language[]>>({ value: [], success: false, error: '', isDisabled: false });
  
  // Хобби
  const [hobbies, setHobbies] = useState<DefaultValue<string[]>>({ value: [], success: false, error: '', isDisabled: false });
  
  // Рекомендации
  const [references, setReferences] = useState<DefaultValue<Reference[]>>({ value: [], success: false, error: '', isDisabled: false });
  
  // Ссылки
  const [links, setLinks] = useState<DefaultValue<Link[]>>({ value: [], success: false, error: '', isDisabled: false });
  
  // Дополнительная информация
  const [other, setOther] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });

  // Опции для селектов
  const educationOptions = [
    { value: 'Среднее', label: 'Среднее' },
    { value: 'Среднее специальное', label: 'Среднее специальное' },
    { value: 'Высшее (Бакалавр)', label: 'Высшее (Бакалавр)' },
    { value: 'Высшее (Магистр)', label: 'Высшее (Магистр)' },
    { value: 'Высшее (Специалист)', label: 'Высшее (Специалист)' },
    { value: 'Ученая степень', label: 'Ученая степень' },
  ];

  const professionOptions = [
    { value: '1', label: 'Frontend разработчик' },
    { value: '2', label: 'Backend разработчик' },
    { value: '3', label: 'Fullstack разработчик' },
    { value: '4', label: 'UI/UX дизайнер' },
    { value: '5', label: 'Project Manager' },
    { value: '6', label: 'DevOps инженер' },
    { value: '7', label: 'QA инженер' },
    { value: '8', label: 'Data Scientist' },
  ];

  const skillsOptions = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'React', label: 'React' },
    { value: 'Vue', label: 'Vue' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C#', label: 'C#' },
    { value: 'PHP', label: 'PHP' },
    { value: 'SQL', label: 'SQL' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Docker', label: 'Docker' },
    { value: 'Git', label: 'Git' },
    { value: 'UX', label: 'UX' },
    { value: 'UI', label: 'UI' },
    { value: 'Figma', label: 'Figma' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  
  return (
    <div className="resume-edit">
    <div className="wrapper">
        <h1 className="resume-edit__title">Редактирование резюме</h1>
        <p className="resume-edit__description">
          Заполните информацию о себе для создания резюме
        </p>

        <form className="resume-edit__form" onSubmit={handleSubmit}>
          {/* Основная информация */}
          <div className="inner-wrapper">
            <div className="inner-wrapper_title">Основная информация</div>
            <div className="resume-edit__grid">
              <Input
                label="Фамилия"
                placeholder="Иванов"
                value={lastName.value}
                onChange={(value) => setLastName({ ...lastName, value, success: true, error: '' })}
                error={lastName.error}
                disabled={lastName.isDisabled}
                required
              />
              <Input
                label="Имя"
                placeholder="Иван"
                value={firstName.value}
                onChange={(value) => setFirstName({ ...firstName, value, success: true, error: '' })}
                error={firstName.error}
                disabled={firstName.isDisabled}
                required
              />
              <Input
                label="Отчество"
                placeholder="Иванович"
                value={middleName.value}
                onChange={(value) => setMiddleName({ ...middleName, value, success: true, error: '' })}
                error={middleName.error}
                disabled={middleName.isDisabled}
              />
              <Input
                label="Email"
                type="email"
                placeholder="example@mail.com"
                value={email.value}
                onChange={(value) => setEmail({ ...email, value, success: true, error: '' })}
                error={email.error}
                disabled={email.isDisabled}
                required
              />
              <DateInput
                label="Дата рождения"
                placeholder="ДД.ММ.ГГГГ"
                value={dateOfBirth.value}
                onChange={(value) => setDateOfBirth({ ...dateOfBirth, value, success: true, error: '' })}
                error={dateOfBirth.error}
                disabled={dateOfBirth.isDisabled}
                required
              />
              <Input
                label="Телефон"
                placeholder="+7 (999) 999-99-99"
                mask="+7 (000) 000-00-00"
                value={phone.value}
                onChange={(value) => setPhone({ ...phone, value, success: true, error: '' })}
                error={phone.error}
                disabled={phone.isDisabled}
                required
              />
              <Input
                label="Город"
                placeholder="Москва"
                value={city.value}
                onChange={(value) => setCity({ ...city, value, success: true, error: '' })}
                error={city.error}
                disabled={city.isDisabled}
                required
              />
              <Input
                label="Страна"
                placeholder="Россия"
                value={country.value}
                onChange={(value) => setCountry({ ...country, value, success: true, error: '' })}
                error={country.error}
                disabled={country.isDisabled}
                required
              />
            </div>
          </div>

          {/* Профессиональная информация */}
          <div className="inner-wrapper">
            <div className="inner-wrapper_title">Профессиональная информация</div>
            <div className="resume-edit__grid">
              <Select
                label="Профессия"
                options={professionOptions}
                value={professionOptions.find(opt => opt.value === String(professionId.value))}
                onChange={(option: any) => setProfessionId({ ...professionId, value: Number(option?.value || 0), success: true, error: '' })}
                placeholder="Выберите профессию"
                error={professionId.error}
                isDisabled={professionId.isDisabled}
                required
              />
              <Select
                label="Образование"
                options={educationOptions}
                value={educationOptions.find(opt => opt.value === education.value)}
                onChange={(option: any) => setEducation({ ...education, value: option?.value || '', success: true, error: '' })}
                placeholder="Выберите уровень образования"
                error={education.error}
                isDisabled={education.isDisabled}
                required
              />
              <Input
                label="Желаемая зарплата"
                type="number"
                placeholder="150000"
                value={String(salary.value)}
                onChange={(val) => setSalary({ ...salary, value: Number(val), success: true, error: '' })}
                error={salary.error}
                disabled={salary.isDisabled}
              />
              <div className="resume-edit__toggle-wrapper">
                <Toggle
                  label="Открыт к предложениям"
                  checked={status.value}
                  onChange={(checked) => setStatus({ ...status, value: checked, success: true, error: '' })}
                  error={status.error}
                  disabled={status.isDisabled}
                  size="medium"
                />
              </div>
            </div>
          </div>

          {/* О себе */}
          <div className="inner-wrapper">
            <div className="inner-wrapper_title">О себе</div>
            <Textarea
              label="Расскажите о себе"
              placeholder="Опытный специалист с большим опытом работы..."
              value={about.value}
              onChange={(value) => setAbout({ ...about, value, success: true, error: '' })}
              error={about.error}
              disabled={about.isDisabled}
              rows={6}
              maxLength={1000}
            />
          </div>

          {/* Навыки */}
          <div className="inner-wrapper">
            <div className="inner-wrapper_title">Навыки</div>
            <Select
              label="Ваши навыки"
              options={skillsOptions}
              value={skills.value.map(skill => ({ value: skill, label: skill }))}
              onChange={(options: any) => {
                if (Array.isArray(options)) {
                  setSkills({ ...skills, value: options.map((opt: any) => opt.value), success: true, error: '' });
                } else {
                  setSkills({ ...skills, value: [], success: true, error: '' });
                }
              }}
              isMulti
              closeMenuOnSelect={false}
              placeholder="Выберите навыки"
              error={skills.error}
              isDisabled={skills.isDisabled}
            />
          </div>

          {/* Фото */}
          <div className="inner-wrapper">
            <div className="inner-wrapper_title">Фотография</div>
            <Input
              label="Ссылка на фото"
              placeholder="https://example.com/photo.jpg"
              value={photo.value}
              onChange={(value) => setPhoto({ ...photo, value, success: true, error: '' })}
              error={photo.error}
              disabled={photo.isDisabled}
            />
          </div>

          {/* Дополнительная информация */}
          <div className="inner-wrapper">
            <div className="inner-wrapper_title">Дополнительная информация</div>
            <Textarea
              label="Дополнительные сведения"
              placeholder="Укажите любую дополнительную информацию..."
              value={other.value}
              onChange={(value) => setOther({ ...other, value, success: true, error: '' })}
              error={other.error}
              disabled={other.isDisabled}
              rows={4}
            />
          </div>

          {/* Кнопки действий */}
          <div className="resume-edit__actions">
            <Button type="submit" onClick={() => {}}>
              Сохранить резюме
            </Button>
            <Button onClick={() => window.history.back()}>
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResumeEdit;
