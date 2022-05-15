import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "@pages/popup/Popup.css";

interface CreateButtonProps {
  setPage: (params: any) => any;
}
// pass prop "setPage" to button with typescript
const CreateButton = ({ setPage }: CreateButtonProps) => {
  const [title, setTitle] = React.useState("");

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  const getBookMarks = () => {
    chrome.storage.sync.get("bookmarks", function (result) {
      console.log(result);
    });
  };

  const bookMark = () => {
    //get value from chrome storage
    chrome.storage.sync.get("bookmarks", function (result) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let found: boolean = false;
        let foundNr: number = -1;
        if (result.bookmarks !== undefined) {
          for (let i = 0; i < result.bookmarks.length; i++) {
            if (result.bookmarks[i].url === tabs[0].url) {
              found = true;
              foundNr = i;
              break;
            }
            if (result.bookmarks[i].title === title) {
              console.log("Du kan inte ha samma titel!");
              return;
            }
          }
        } else {
          found = false;
        }
        if (!found) {
          if (result.bookmarks !== undefined) {
            chrome.storage.sync.set({
              bookmarks: [
                ...result.bookmarks,
                { url: tabs[0].url, title: title },
              ],
            });
          } else {
            chrome.storage.sync.set({
              bookmarks: [{ url: tabs[0].url, title: title }],
            });
          }
          return;
        } else {
          if (title === "") {
            console.log("Du måste ha en titel!");
            return;
          }
          let newBookmarks = result.bookmarks;
          newBookmarks[foundNr].title = title;
          chrome.storage.sync.set({ bookmarks: newBookmarks });
        }
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Stack spacing={1}>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="outlined-basic"
            label="Ge sidan ett namn…"
            variant="filled"
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              disableElevation
              onClick={() => setPage(0)}
            >
              <ArrowBackIcon />
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => getBookMarks()}
            >
              Shh
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => openOptions()}
            >
              Alternatv
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => bookMark()}
            >
              Spara
            </Button>
          </Stack>
        </Stack>
      </header>
    </div>
  );
};

export default CreateButton;
