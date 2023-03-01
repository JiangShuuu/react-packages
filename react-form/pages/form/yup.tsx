import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormI18n } from '../../plugins/formI18n';
import * as yup from 'yup';

interface IFormInputs {
  firstName: string;
  age: number;
}

export default function App() {
  const { t, toggleLanguage, language } = FormI18n();

  const schemaI18n = yup.object({
    firstName: yup.string().required(`${t('不可空白')}`)
  });

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    reset,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schemaI18n)
  });
  const onSubmit = (data: IFormInputs) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName')} />
        <p>{errors.firstName?.message}</p>

        <input {...register('age')} />
        <p>{errors.age?.message}</p>

        <button disabled={isSubmitting} type='submit'>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <div style={{ margin: '1rem' }}>
        <button style={{ margin: '0 1rem' }} onClick={() => setValue('firstName', '點選填入字串')}>
          點選填入字串
        </button>
        <button onClick={() => resetField('firstName')}>清除指定input</button>
      </div>
      <div style={{ margin: '1rem' }}>
        <button style={{ margin: '0 1rem' }} onClick={() => reset()}>
          清除所有input
        </button>
        <button onClick={toggleLanguage}>更換語言 {language}</button>
      </div>
      <div style={{ margin: '1rem' }}>
        <button style={{ margin: '0 1rem' }} onClick={() => clearErrors()}>
          清除錯誤
        </button>
      </div>
    </>
  );
}
