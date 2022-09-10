import { Box, Button, Container, CssBaseline, Grid, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useFormik } from 'formik';

import { createSchedulingSchema } from '@/schemas/schedulingSchema';
import { IScheduling } from '@/types/scheduling';

type formValues = {} & IScheduling;

function App() {
  const formik = useFormik<formValues>({
    initialValues: {
      title: '',
      startDate: null,
      endDate: null,
    },
    validationSchema: createSchedulingSchema,
    onSubmit(values) {
      console.log(values.startDate?.toJSDate());
      console.log(values.endDate?.toJSDate());
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <CssBaseline />
      <Container sx={{ mt: 1 }}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="title"
                id="title"
                label="Título"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
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
                    error={Boolean(formik.errors.startDate)}
                    helperText={formik.errors.startDate}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
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
                  <TextField {...props} error={Boolean(formik.errors.endDate)} helperText={formik.errors.endDate} />
                )}
              />
            </Grid>

            <Button type="submit">Agendar</Button>
          </Grid>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
