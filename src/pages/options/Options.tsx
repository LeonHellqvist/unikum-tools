import React from "react";
import "./Options.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto/400.css";

import Bookmarks from "./Bookmarks";
import Food from "./Food";
import Schedule from "./Schedule";

const Options = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Box>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div">
                Unikum tools
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <Bookmarks />
      <Food />
      <Schedule />
      <Box sx={{ height: 40 }}></Box>
    </div>
  );
};

export default Options;
