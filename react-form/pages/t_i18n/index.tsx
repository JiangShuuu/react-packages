import React from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        about: 'aboutEn',
        lang: 'langEn'
      }
    },
    tw: {
      translation: {
        about: '關於我們',
        lang: '語言'
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false
  }
});

export default function I18n() {
  const { t, i18n } = useTranslation();

  const changeLang = i18n.language === 'tw' ? 'en' : 'tw';

  return (
    <>
      <h2>{t('about')}</h2>
      <h2>{t('lang')}</h2>
      <button onClick={() => i18n.changeLanguage(changeLang)}>轉換</button>
    </>
  );
}
