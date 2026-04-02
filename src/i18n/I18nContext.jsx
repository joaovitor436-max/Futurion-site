import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('futurion_lang');
    return saved && translations[saved] ? saved : 'pt-BR';
  });

  useEffect(() => {
    localStorage.setItem('futurion_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language];
    for (let key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
