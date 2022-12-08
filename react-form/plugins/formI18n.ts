import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import hans from '../public/locales/zh-Hans/common.json';
import hant from '../public/locales/zh-Hant/common.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      hans: {
        translation: hans
      },
      hant: {
        translation: hant
      }
    },
    lng: 'hans', // if you're using a language detector, do not define the lng option
    fallbackLng: 'hans',

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export function useFormI18n () {
  const { changeLanguage, language } = i18n;
  const { t } = useTranslation();

  const changTest = language === 'hans' ? 'hant' : 'hans';

  const toggleLanguage = () => changeLanguage(changTest)

  return {t, toggleLanguage, language}
}


  