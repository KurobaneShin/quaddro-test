import { Box, Button, Container, CssBaseline, Grid, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useFormik } from 'formik';

import { IScheduling } from '@/types/scheduling';

type formValues = {} & IScheduling;

function App() {
  const formik = useFormik<formValues>({
    initialValues: {
      title: '',
      startDate: null,
      endDate: null,
    },
    onSubmit(values) {
      console.log(values.startDate?.toJSDate());
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
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={formik.values.startDate}
                disablePast
                ampm={false}
                disableMaskedInput
                onChange={(newValue) => {
                  formik.setFieldValue('startDate', newValue);
                }}
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
