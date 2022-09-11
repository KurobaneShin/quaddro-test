import { useState } from 'react';

import { Box, Button, Container, CssBaseline, Grid, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useFormik } from 'formik';

import EnhancedTable from '@/components/EnhancedTable';
import { createSchedulingSchema } from '@/schemas/schedulingSchema';
import { IScheduling } from '@/types/scheduling';

type formValues = {} & IScheduling;

function App() {
  const [schedules, setSchedules] = useState<IScheduling[]>([]);

  const checkIsAlreadyScheduled = (values: IScheduling) => {
    const { startDate } = values;

    if (!startDate) return false;

    return schedules.some((schedule) => {
      if (!schedule.startDate || !schedule.endDate) return false;

      return (
        startDate?.toMillis() >= schedule.startDate?.toMillis() && startDate?.toMillis() < schedule.endDate?.toMillis()
      );
    });
  };

  const formik = useFormik<formValues>({
    initialValues: {
      title: '',
      startDate: null,
      endDate: null,
    },
    validationSchema: createSchedulingSchema,
    onSubmit(values) {
      const isAlreadyScheduled = checkIsAlreadyScheduled(values);

      if (isAlreadyScheduled) {
        console.log('ja tem horario marcado');
      } else {
        setSchedules([values, ...schedules]);
      }
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <CssBaseline />
      <Container sx={{ mt: 1 }}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                name="title"
                id="title"
                label="Título"
                value={formik.values.title}
                error={Boolean(formik.errors.title) && Boolean(formik.touched.title)}
                helperText={formik.errors.title}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <DateTimePicker
                label="Inicio do agendamento"
                value={formik.values.startDate}
                disablePast
                ampm={false}
                disableMaskedInput={false}
                inputFormat="dd/MM/yyyy hh:mm"
                mask="__/__/____ __:__"
                onChange={(newValue) => {
                  formik.setFieldValue('startDate', newValue);
                }}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    placeholder="dd/mm/yyyy hh:mm"
                    error={Boolean(formik.errors.startDate) && Boolean(formik.touched.startDate)}
                    helperText={formik.errors.startDate}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <DateTimePicker
                label="Fim do agendamento"
                value={formik.values.endDate}
                disablePast
                ampm={false}
                ampmInClock={false}
                inputFormat="dd/MM/yyyy hh:mm"
                mask="__/__/____ __:__"
                disableMaskedInput={false}
                onChange={(newValue) => {
                  formik.setFieldValue('endDate', newValue);
                }}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    error={Boolean(formik.errors.endDate) && Boolean(formik.touched.endDate)}
                    helperText={formik.errors.endDate}
                  />
                )}
              />
            </Grid>

            <Button type="submit">Agendar</Button>
          </Grid>
        </Box>

        <Box>
          <EnhancedTable schedules={schedules} />
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
