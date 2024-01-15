import * as yup from 'yup'

export const nameValidations = yup
  .string()
  .required('Обязательное поле')
  .max(15, 'Не более 15 символов')
  .matches(/^[a-zA-Zа-яА-ЯЁё -]*$/, 'Только буквы разрешены для ввода')
