import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from '../Select';
import './style.scss';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'ru', name: t('language.russian'), flag: '🇷🇺' },
    { code: 'en', name: t('language.english'), flag: '🇺🇸' }
  ];

  const options = languages.map(lang => ({
    value: lang.code,
    label: lang.name
  }));

  const currentValue = options.find(option => option.value === i18n.language) || options[0];

  const handleLanguageChange = (selectedOption: any) => {
    if (selectedOption && selectedOption.value) {
      i18n.changeLanguage(selectedOption.value);
    }
  };

  return (
    <div className={`language-switcher ${className}`}>
      <Select
        options={options}
        value={currentValue}
        onChange={handleLanguageChange}
        isSearchable={false}
        className="language-switcher__select"
      />
    </div>
  );
};

export default LanguageSwitcher;
