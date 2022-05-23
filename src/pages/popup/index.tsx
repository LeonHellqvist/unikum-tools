import { createRoot } from "react-dom/client";
import "./index.css";
import Popup from "./Popup";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {yellow} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[500],
    },
  },
});

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Popup />
    </ThemeProvider>
  );
}

init();