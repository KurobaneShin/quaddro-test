import * as yup from 'yup';

export const createSchedulingSchema = yup.object({
  title: yup.string().required('Este campo é obrigatório'),
  startDate: yup.date().required('Este campo é obrigatório').nullable(),
  endDate: yup
    .date()
    .required('Este campo é obrigatório')
    .nullable()
    .min(yup.ref('StartDate'), 'Fim do agendamento inválido'),
});
