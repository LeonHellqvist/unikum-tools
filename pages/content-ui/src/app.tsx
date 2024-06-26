import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import '../../../chrome-extension/public/buttons.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {
  const [bookmarks, setBookmarks] = React.useState<any[]>([]);

  React.useEffect(() => {
    chrome.storage.sync.get(['bookmarks'], result => {
      setBookmarks(result.bookmarks);
      console.log(result.bookmarks);
    });
  }, []);

  chrome.storage.onChanged.addListener(function (changes) {
    setBookmarks(changes.bookmarks.newValue);
  });

  const direct = (url: any) => {
    window.location = url;
  };

  return (
    <Grid sx={{ marginLeft: 4, marginTop: 0, marginBottom: -1.5 }} container justifyContent="left" alignItems="center">
      {bookmarks.map((bookmark, index) => {
        let buttonTheme = createTheme({
          palette: { primary: { main: bookmark.bgColor } },
          typography: { button: { textTransform: 'none' } },
        });
        let buttonStyle = {
          margin: 1,
          marginTop: 2,
          borderRadius: bookmark.radius,
          boxShadow: bookmark.boxShadow,
        };
        return (
          <ThemeProvider key={index} theme={buttonTheme}>
            <Button
              className="customButtons"
              sx={buttonStyle}
              variant={bookmark.style}
              color="primary"
              onClick={() => {
                direct(bookmark.url);
              }}>
              {bookmark.title}
            </Button>
          </ThemeProvider>
        );
      })}
    </Grid>
  );
};

export default App;
