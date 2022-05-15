import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "@pages/popup/Popup.css";

interface CreateButtonProps {
  setPage: (params: any) => any;
}
// pass prop "setPage" to button with typescript
const CreateButton = ( {setPage}: CreateButtonProps ) => {
  const [test, setTest] = React.useState('ok');

  const getBookMarks = () => {
    chrome.storage.sync.get('bookmarks', function(result) {
      console.log(result);
    });
  }

  const bookMark = () => {
    //get value from chrome storage
    chrome.storage.sync.get('bookmarks', function(result) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let found: boolean = false;
        for (let i = 0; i < result.bookmarks.length; i++) {
          // fortsätt här
          if (result.bookmarks[i].url === tabs[0].url) {
            found = true;
            break;
          }
        }
        if (!found) {
          //store new value for bookmarks in chrome storage
          /* chrome.storage.sync.set({bookmarks: []}), function() {
            console.log("Ok")
          }; */

          chrome.storage.sync.set({bookmarks: [...result.bookmarks, {url: tabs[0].url, title: tabs[0].title} ]})
          

          /* chrome.storage.sync.set({bookmarks: result.concat({url: tabs[0].url, title: tabs[0].title})}, function() {
            console.log('Value is set to ' + result.concat({url: tabs[0].url, title: tabs[0].title}));
          }
          ); */

          return;
        }
        console.log('Du har redan denna sida ' + result);

      });
    });
  }

  return (  
      <div className="App">
        <header className="App-header">
          <Stack spacing={1}>
            <TextField id="outlined-basic" label="Ge sidan ett namn…" variant="filled" />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" disableElevation onClick={() => setPage(0)}>
                <ArrowBackIcon />
              </Button>
              <Button variant="contained" disableElevation onClick={() => bookMark()}>
                Bokmärken
              </Button>
              <Button variant="contained" disableElevation onClick={() => getBookMarks()}>
                Spara
              </Button>
            </Stack>
          </Stack>
        </header>
      </div>
  );
};

export default CreateButton;

