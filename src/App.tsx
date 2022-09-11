import { useState } from 'react';

import { Box, Container, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { SnackbarProvider } from 'notistack';

import EnhancedTable from '@/components/EnhancedTable';
import { IScheduling } from '@/types/scheduling';

import FormAddSchedule from './components/FormAddSchedule';

function App() {
  const [schedules, setSchedules] = useState<IScheduling[]>([]);

  const handleAddSchedule = (newSchedules: IScheduling[]) => {
    setSchedules(newSchedules);
  };

  return (
    <SnackbarProvider preventDuplicate maxSnack={3} variant="default">
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <CssBaseline />
        <Container sx={{ mt: 1 }}>
          <FormAddSchedule schedules={schedules} handleAddSchedule={handleAddSchedule} />

          <Box sx={{ mt: 2 }}>
            <EnhancedTable schedules={schedules} />
          </Box>
        </Container>
      </LocalizationProvider>
    </SnackbarProvider>
  );
}

export default App;
