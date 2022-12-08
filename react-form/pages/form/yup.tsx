import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFormI18n } from '../../plugins/formI18n';
import * as yup from 'yup';

interface IFormInputs {
  firstName: string;
  age: number;
}

export default function App() {
  const { t, toggleLanguage, language } = useFormI18n();

  const schemaI18n = yup.object({
    firstName: yup.string().required(`${t('不可空白')}`)
  });

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
      <button onClick={toggleLanguage}>{language}</button>
    </>
  );
}
