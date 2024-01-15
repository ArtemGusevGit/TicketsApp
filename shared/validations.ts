import * as yup from 'yup'
// import { useCommonStore } from '~/stores/common'

export const emailValidation = yup
  .string()
  .nullable()
  .required('Обязательное поле')
  .max(50, 'Не более 50 символов')
  .test('emailCheck', 'Некорректный email', (val) => {
    if (val === null || val === '' || val === undefined) return true

    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(
      val
    )
  })

export const innValidation = yup
  .string()
  .min(10, 'Минимум 10 цифр')
  .max(12, 'Не более 12 цифр')
  .required('Обязательное поле')

export const websiteValidations = yup
  .string()
  .max(50, 'Не более 50 символов')
  .matches(
    /^(|((https?):\/\/)?(www.)?[a-zA-Z0-9\-]+(\.[a-zA-Z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?)$/,
    'Сайт заполнен некорректно'
  )
  .nullable()

export const nameValidations = yup
  .string()
  .required('Обязательное поле')
  .max(15, 'Не более 15 символов')
  .matches(/^[a-zA-Zа-яА-ЯЁё -]*$/, 'Только буквы разрешены для ввода')

export const middlenameValidations = yup
  .string()
  .required('Обязательное поле')
  .max(20, 'Не более 20 символов')
  .matches(/^[a-zA-Zа-яА-ЯЁё ]*$/, 'Только буквы разрешены для ввода')

export const postValidations = yup
  .string()
  .required('Обязательное поле')
  .matches(/^[a-zA-Zа-яА-ЯЁё ]*$/, 'Только буквы разрешены для ввода')
  .max(100, 'Не более 100 символов')

export const companyValidations = yup
  .string()
  .required('Обязательное поле')
  .max(50, 'Не более 50 символов')
  .matches(
    /^[a-zA-Zа-яА-ЯЁё0-9 ]*$/,
    'Только буквы и цифры разрешены для ввода'
  )

export const apiKeyValidations = yup.string().max(70, 'Не более 70 символов')

export const checkBoxValidations = yup
  .boolean()
  .required('Необходимо выбрать данный пункт')
  .isTrue('Необходимо выбрать данный пункт')

export const commentValidations = yup
  .string()
  .max(2000, 'Не более 2000 символов')

export const phoneValidations = yup
  .string()
  .max(20, 'Не более 20 символов')
  .test('phone-required', 'Обязательное поле', function () {
    const { phone } = this.parent
    const { countryCode } = useCommonStore()
    if (phone?.length > countryCode?.length + 1) {
      return true
    } else return false
  })

export const indexValidations = yup.string().required('Обязательное поле')
export const courseTitleValidation = yup.string().max(100, 'Максимальное количество символов - 100').required('Обязательное поле')
export const courseDescValidation = yup.string().max(300, 'Максимальное количество символов - 300').required('Обязательное поле')
export const courseQuestionValidation = yup.string().max(300, 'Максимальное количество символов - 300').min(6, 'Минимальное количество символов - 6').required('Обязательное поле')
export const courseAnswerValidation = yup.string().max(150, 'Максимальное количество символов - 150').required('Обязательное поле')
