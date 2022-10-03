import React from "react";
import "../Options.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import BookmarkBar from "./BookmarkBar";
import BookmarkAlternatives from "./BookmarkAlternatives";
import GlobalAlternatives from "./GlobalAlternatives";
import BackgroundColor from "./BackgroundColor";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState<any>([]);
  const [selectedBookmark, setSelectedBookmark] = React.useState<any>({
    notYetSelected: true,
  });
  /*   const [settings, setSettings] = React.useState<any>({notYetSelected: true}); */
  const [settings, setSettings] = React.useState<any>({
    same: { bgColor: true, radius: true, boxShadow: true },
  });
  const [color, setColor] = React.useState<any>("#ffe138");

  React.useEffect(() => {
    chrome.storage.sync.get(["bookmarks"], (result) => {
      if (Object.keys(result.bookmarks).length === 0) {
        setBookmarks([]);
        console.log("Fanns inga bokmärken");
      } else {
        setBookmarks(result.bookmarks);
        console.log(result.bookmarks);
      }
    });
    chrome.storage.sync.get(["bookmarksSettings"], (result) => {
      if (Object.keys(result.bookmarksSettings).length === 0) {
        const settings = {
          bgColor: true,
          radius: true,
          boxShadow: true,
        };
        setSettings(settings);
      } else {
        setSettings(result.bookmarksSettings);
      }
      console.log(result.bookmarksSettings);
    });
  }, []);

  React.useEffect(() => {
    saveBookmarks(bookmarks);
  }, [bookmarks]);

  React.useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  React.useEffect(() => {
    if (selectedBookmark.notYetSelected !== true) {
      for (let i = 0, l = bookmarks.length; i < l; i++) {
        if (bookmarks[i].uuid === selectedBookmark.uuid) {
          let newBookmarks = [...bookmarks];
          newBookmarks[i] = selectedBookmark;
          setBookmarks(newBookmarks);
        }
      }
    }
  }, [selectedBookmark]);

  React.useEffect(() => {
    if (selectedBookmark.notYetSelected == true) return;

    if (color.length < 4) return;
    if (color[0] !== "#") return;

    const allowed = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    for (let i = 1, l = color.length; i < l; i++) {
      if (allowed.indexOf(color[i].toLowerCase()) === -1) return;
    }

    if (color !== selectedBookmark.bgColor) {
      if (settings.same.bgColor === true) {
        let newBookmarks = [...bookmarks];
        for (let i = 0, l = bookmarks.length; i < l; i++) {
          newBookmarks[i].bgColor = color;
        }
        setBookmarks(newBookmarks);
      } else {
        let newSelectedBookmark = { ...selectedBookmark };
        newSelectedBookmark.bgColor = color;
        setSelectedBookmark(newSelectedBookmark);
      }
    }
  }, [color]);

  const debounce = (func: any, wait: any) => {
    var timeout: any;
    let immediate = false;

    return (...args: any) => {
      var context = this;

      var later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  };

  const saveBookmarks = React.useCallback(
    debounce((bookmarks: any) => {
      chrome.storage.sync.set({ bookmarks }, () => {
        console.log("Saved bookmark config");
      });
    }, 500),
    []
  );

  const saveSettings = React.useCallback(
    debounce((settings: any) => {
      chrome.storage.sync.set({ bookmarksSettings: settings }, () => {
        console.log("Saved bookmark settings");
      });
    }, 200),
    []
  );

  const selectBookmark = (uuid: string, bgColor: string) => {
    const bookmark = bookmarks.find(
      (bookmark: { uuid: string }) => bookmark.uuid === uuid
    );
    setColor(bgColor);
    setSelectedBookmark(bookmark);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 2 }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ marginBottom: 2, textAlign: "center" }}
      >
        Bokmärken
      </Typography>
      <Paper
        elevation={3}
        sx={{ width: "100%", height: "100%", paddingBottom: 2 }}
      >
        <Stack direction="column" spacing={1}>
          <BookmarkBar
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
            selectBookmark={selectBookmark}
          />
          <Box>
            <Grid container>
              <Grid item xs={8} sx={{ paddingLeft: 2, paddingRight: 1 }}>
                <BookmarkAlternatives
                  bookmarks={bookmarks}
                  selectBookmark={selectedBookmark}
                  settings={settings}
                  color={color}
                  setColor={setColor}
                  selectedBookmark={selectedBookmark}
                  setSelectedBookmark={setSelectedBookmark}
                  setBookmarks={setBookmarks}
                />
              </Grid>
              <Grid item xs={4} sx={{ paddingLeft: 1, paddingRight: 2 }}>
                <Stack direction="column" spacing={1}>
                  <GlobalAlternatives
                    settings={settings}
                    setSettings={setSettings}
                  />
                  <BackgroundColor
                    color={color}
                    setColor={setColor}
                    selectedBookmark={selectedBookmark}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Bookmarks;
