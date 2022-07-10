import { createRoot } from "react-dom/client";
import Options from "./Options";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { green } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: green[500],
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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Options />
    </ThemeProvider>
  );
}

init();
