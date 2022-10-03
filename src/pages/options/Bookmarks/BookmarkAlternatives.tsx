import {
  Paper,
  Typography,
  Stack,
  TextField,
  Divider,
  Box,
  Slider,
  ButtonGroup,
  Button,
} from "@mui/material";
import React from "react";

const BookmarkAlternatives = (props: any) => {
  const disabled = () => {
    if (props.selectedBookmark.notYetSelected === true) {
      return true;
    }
    return false;
  };

  const handleBookmarkChange = (e: any) => {
    const { name, value } = e.target;
    if (props.settings.same[name] === true) {
      let newBookmarks = [...props.bookmarks];
      for (let i = 0; i < newBookmarks.length; i++) {
        newBookmarks[i][name] = value;
      }
      props.setBookmarks(newBookmarks);
    } else {
      let newSelectedBookmark = { ...props.selectedBookmark };
      newSelectedBookmark[name] = value;
      props.setSelectedBookmark(newSelectedBookmark);
    }
  };

  const removeCurrrentBookmark = (uuid: string) => {
    let newBookmarks = [...props.bookmarks];
    newBookmarks = newBookmarks.filter((bookmark) => bookmark.uuid !== uuid);
    props.setSelectedBookmark({ notYetSelected: true });
    props.setBookmarks(newBookmarks);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ marginBottom: 2, textAlign: "center" }}
      >
        Alternativ för individuellt bokmärke
      </Typography>
      <Stack direction="column" spacing={1}>
        <TextField
          id="title-field"
          disabled={disabled()}
          value={
            props.selectedBookmark.title ? props.selectedBookmark.title : ""
          }
          onChange={handleBookmarkChange}
          label="Titel"
          name="title"
          variant="filled"
          size="small"
        />
        <TextField
          id="url-field"
          disabled={disabled()}
          value={props.selectedBookmark.url ? props.selectedBookmark.url : ""}
          onChange={handleBookmarkChange}
          label="URL"
          name="url"
          variant="filled"
          size="small"
        />
        <Divider />
        <Box sx={{ width: "50%" }}>
          <Stack direction="row" spacing={1}>
            <Typography
              variant="body1"
              component="span"
              sx={{ marginBottom: 2, paddingTop: 0.5, textAlign: "center" }}
            >
              Bakgrundsfärg
            </Typography>
            <TextField
              disabled={disabled()}
              inputProps={{ maxLength: 7 }}
              value={props.color}
              onChange={(e) => props.setColor(e.target.value)}
              name="bgColor"
              size="small"
            />
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ width: "50%" }}>
          <Stack direction="row" spacing={1}>
            <Typography
              variant="body1"
              component="span"
              sx={{ marginBottom: 2, paddingTop: 0.5, textAlign: "center" }}
            >
              Radius
            </Typography>
            <Slider
              disabled={disabled()}
              value={
                props.selectedBookmark.radius
                  ? props.selectedBookmark.radius
                  : 0
              }
              name="radius"
              onChange={handleBookmarkChange}
              step={1}
              marks
              min={0}
              max={5}
              size="small"
            />
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ width: "50%" }}>
          <Stack direction="row" spacing={1}>
            <Typography
              variant="body1"
              component="span"
              sx={{ marginBottom: 2, paddingTop: 0.5, textAlign: "center" }}
            >
              Höjd
            </Typography>
            <Slider
              disabled={disabled()}
              value={
                props.selectedBookmark.boxShadow
                  ? props.selectedBookmark.boxShadow
                  : 0
              }
              name="boxShadow"
              onChange={handleBookmarkChange}
              step={1}
              marks
              min={0}
              max={24}
              size="small"
            />
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ width: "50%" }}>
          <Stack direction="row" spacing={1}>
            <Typography
              variant="body1"
              component="span"
              sx={{ marginBottom: 2, paddingTop: 0.5, textAlign: "center" }}
            >
              Stil
            </Typography>
            <ButtonGroup
              disabled={disabled()}
              variant="contained"
              sx={{ height: 30 }}
              size="small"
              aria-label="outlined primary button group"
            >
              <Button
                key="iflylld"
                onClick={handleBookmarkChange}
                name="style"
                value="contained"
              >
                Ifylld
              </Button>
              <Button
                key="kontur"
                onClick={handleBookmarkChange}
                name="style"
                value="outlined"
                variant="outlined"
              >
                Kontur
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ width: "50%" }}>
          <Stack direction="row" spacing={1}>
            <Button
              disabled={disabled()}
              onClick={() =>
                removeCurrrentBookmark(props.selectedBookmark.uuid)
              }
              variant="outlined"
              color="error"
              size="small"
            >
              Ta bort bokmärke
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default BookmarkAlternatives;
