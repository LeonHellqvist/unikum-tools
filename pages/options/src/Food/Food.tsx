import React from 'react';
import '../Options.css';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Food = () => {
  const [stations, setStations] = React.useState<any[]>([]);
  const [selectedStation, setSelectedStation] = React.useState<object | null>(null);

  React.useEffect(() => {
    fetch('https://tools-proxy.leonhellqvist.workers.dev?service=skolmaten&subService=stations').then(
      async response => {
        const stations = await response.json();
        let stationsFormatted: any[] = [];
        for (let i = 0; i < stations.length; i++) {
          let municipally = stations[i].n;
          for (let j = 0; j < stations[i].s.length; j++) {
            stationsFormatted.push({
              municipally: municipally,
              label: stations[i].s[j].n,
              id: stations[i].s[j].i,
            });
          }
        }
        setStations(stationsFormatted);
        chrome.storage.sync.get('foodSettings', function (result) {
          if (result.foodSettings) {
            setSelectedStation(result.foodSettings);
          }
        });
      },
    );
  }, []);

  const handleStationChange = (value: any) => {
    setSelectedStation(value);
    chrome.storage.sync.set({ foodSettings: value }, () => {
      console.log('Saved food settings');
    });
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 2 }}>
      <Typography variant="h4" component="div" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Skolmaten
      </Typography>
      <Paper elevation={3} sx={{ width: '100%', height: '100%', paddingBottom: 2 }}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Box sx={{ height: 0 }}></Box>
          <Paper sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2, textAlign: 'center' }}>
              Välj din matsal
            </Typography>
            <Autocomplete
              id="grouped-demo"
              options={stations}
              value={selectedStation}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event, value) => handleStationChange(value)}
              renderOption={(props, station) => {
                return (
                  <li {...props} key={station.id}>
                    {station.label}
                  </li>
                );
              }}
              groupBy={station => station.municipally}
              getOptionLabel={station => (station === null ? 'Alternativ' : station.label)}
              sx={{ width: 300 }}
              renderInput={params => <TextField {...params} label="Matsal" />}
            />
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Food;
