import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface IFormInputs {
  firstName: string;
  age: number;
}

const schema = z.object({
  firstName: z.string({ required_error: 'Name is required' }).max(5),
  age: z.number()
});

const requiredTest = schema.required();

export default function Zod() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: zodResolver(requiredTest)
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} />
      <p>{errors.firstName?.message}</p>

      <input {...register('age')} />
      <p>{errors.age?.message}</p>

      <input type='submit' />
    </form>
  );
}
