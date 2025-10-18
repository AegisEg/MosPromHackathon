import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonType } from '../Button';
import Button from '../Button';
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

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className={`language-switcher ${className}`}>
      <div className="language-switcher__current">
        <span className="language-switcher__flag">{currentLanguage.flag}</span>
        <span className="language-switcher__name">{currentLanguage.name}</span>
      </div>
      
      <div className="language-switcher__dropdown">
        {languages.map((language) => (
          <button
            key={language.code}
            className={`language-switcher__option ${
              language.code === i18n.language ? 'language-switcher__option--active' : ''
            }`}
            onClick={() => handleLanguageChange(language.code)}
          >
            <span className="language-switcher__flag">{language.flag}</span>
            <span className="language-switcher__name">{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
