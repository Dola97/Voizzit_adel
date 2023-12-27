import * as yup from 'yup';
export const todoSchema = yup
  .object({
    title: yup.string().required('Title is required'),
  })
  .required();
