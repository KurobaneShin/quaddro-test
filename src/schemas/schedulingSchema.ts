import { DateTime } from 'luxon';
import * as yup from 'yup';

export const createSchedulingSchema = yup.object({
  title: yup.string().required('Este campo é obrigatório'),
  startDate: yup
    .string()
    .required('Este campo é obrigatório')
    .test('notDate', 'Data inválida', (value) => value !== 'Invalid Date')
    .nullable(),
  endDate: yup
    .string()
    .required('Este campo é obrigatório')
    .nullable()
    .test('notDate', 'Data inválida', (value) => value !== 'Invalid Date')
    .test('end date is lower than start date', 'Data inválida', (value, object) => {
      const endDate = DateTime.fromJSDate(new Date(value as string));
      const startDate = DateTime.fromJSDate(new Date(object.parent.startDate));

      return endDate > startDate;
    }),
});
