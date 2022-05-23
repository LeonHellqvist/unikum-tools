import React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from '@mui/material/CssBaseline';
import darkScrollbar from '@mui/material/darkScrollbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {yellow} from '@mui/material/colors';
import App from "./App"

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: yellow[500],
    },
  },
});

function init() {
  const appContainer = document.querySelector("#canvas")!.insertBefore(document.createElement("div"), document.querySelector("#canvas")!.firstChild);

  const root = createRoot(appContainer);
  root.render(
    <ThemeProvider theme={theme}>
      
      <App/>
    </ThemeProvider>
  );
}

init();