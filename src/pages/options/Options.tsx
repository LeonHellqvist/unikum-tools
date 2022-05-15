import React from "react";
import "@pages/options/Options.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import '@fontsource/roboto/400.css';




const Options = () => {
  const [page, setPage] = React.useState(0);
  const [bookmarks, setBookmarks] = React.useState([]);

  React.useEffect(() => {
    chrome.storage.sync.get(["bookmarks"], (result) => {
      setBookmarks(result.bookmarks);
    });
  }, [])


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
          <div className="App-body">
            <Paper variant="outlined" sx={{width: 200, height: 200}}>
              <Box>

              </Box>
            </Paper>
          </div>
        </div>
    );
  }

  return (
    <></>
  )
};

export default Options;
