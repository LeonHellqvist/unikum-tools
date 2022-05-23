import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import "./App.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import ButtonGroup from '@mui/material/ButtonGroup';
import LightModeIcon from '@mui/icons-material/LightMode';
import { HexColorPicker } from "react-colorful";
import Collapse from '@mui/material/Collapse';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import TextField from "@mui/material/TextField";

const App = () => {
  const [bookmarks, setBookmarks] = React.useState<any[]>([]);
  const [settings, setSettings] = React.useState<any>({same: {bgColor: true, radius: true, boxShadow: true}});

  React.useEffect(() => {
    chrome.storage.sync.get(["bookmarks"], (result) => {
      setBookmarks(result.bookmarks);
      console.log(result.bookmarks);
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
    })
  }, []);

  chrome.storage.onChanged.addListener(function (changes) {
    setBookmarks(changes.bookmarks.newValue);
  });

  const direct = (url: any) => {
    window.location=url;
  }

  return (
    <Grid
      sx={{ marginLeft: 4, marginTop: 1, marginBottom: -1 }}
      container
      justifyContent="left"
      alignItems="center"
      className="droppable"
    >
      {bookmarks.map((bookmark, index) => {
        let buttonTheme = createTheme({ palette: { primary: { main: bookmark.bgColor } } });
        let buttonStyle = {
          margin:1,
          marginTop:2,
          borderRadius: bookmark.radius,
          boxShadow: bookmark.boxShadow
        }
        return (
          <ThemeProvider key={index} theme={buttonTheme}>
            <Button
              className="customButtons"
              sx={buttonStyle}
              variant={bookmark.style}
              color="primary"
              onClick={() => {direct(bookmark.url)}}
            >
              {bookmark.title}
            </Button>
          </ThemeProvider>
        );
      })}
    </Grid>
  );
}

export default App;