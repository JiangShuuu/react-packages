import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  firstName: string;
  lastName: string;
};

export default function MyForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  console.log('watch', watch('firstName'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' {...register('firstName', { required: true })} />
      {errors.firstName && <span>This field is required</span>}
      <input type='text' {...register('lastName', { required: true })} />
      {errors.lastName && <span>This field is required</span>}
      <button type='submit'>Submit</button>
    </form>
  );
}
