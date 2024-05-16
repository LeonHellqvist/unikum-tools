import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import App from './app';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: green[500],
    },
  },
});

function init() {
  const appContainer = document
    .querySelector('#canvas')!
    .insertBefore(document.createElement('div'), document.querySelector('#canvas')!.firstChild);

  const root = createRoot(appContainer);
  root.render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  );
}

init();
