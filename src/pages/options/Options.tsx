import React from "react";
import "./Options.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/400.css';

import Bookmarks from "./Bookmarks";




const Options = () => {
  const [page, setPage] = React.useState(0);

  if (page === 0) {
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
        </div>
    );
  }

  return (
    <></>
  )
};

export default Options;