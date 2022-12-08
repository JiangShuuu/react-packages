import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import zh from '../../public/locales/zh-Hans/common.json';
import hant from '../../public/locales/zh-Hant/common.json';
interface IFormInputs {
  firstName: string;
  age: number;
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: zh
      },
      hant: {
        translation: hant
      }
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export default function App() {
  const { t } = useTranslation();
  const { changeLanguage, language } = i18n;

  console.log(language);

  const schemaI18n = yup.object({
    firstName: yup.string().required(`${t('不可空白')}`)
  });

  const changTest = language === 'en' ? 'hant' : 'en';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schemaI18n)
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName')} />
        <p>{errors.firstName?.message}</p>

        <input {...register('age')} />
        <p>{errors.age?.message}</p>

        <input type='submit' />
      </form>
      <button onClick={() => changeLanguage(changTest)}>{language}</button>
    </>
  );
}
