import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Buttons from "./Buttons";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: green[500],
    },
  },
});

function init() {
  const appContainer = document
    .querySelector("#canvas")!
    .insertBefore(
      document.createElement("div"),
      document.querySelector("#canvas")!.firstChild
    );

  const root = createRoot(appContainer);
  root.render(
    <ThemeProvider theme={theme}>
      <Buttons />
    </ThemeProvider>
  );
}

init();
