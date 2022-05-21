import React from "react";
import "@pages/options/Options.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
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

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState<any[]>([]);
  const [selectedBookmark, setSelectedBookmark] = React.useState<any>({notYetSelected: true});
  const [settings, setSettings] = React.useState<any>({notYetSelected: true});
  const [color, setColor] = React.useState<any>("#ffe138")

  React.useEffect(() => {
    chrome.storage.sync.get(["bookmarks"], (result) => {
      setBookmarks(result.bookmarks);
      console.log(result.bookmarks);
    });
  }, []);

  React.useEffect(() => {
    saveBookmarks(bookmarks);
  }, [bookmarks]);

  React.useEffect(() => {
    if (selectedBookmark.notYetSelected !== true ) {
      for (let i = 0, l = bookmarks.length; i < l; i++) {
        if (bookmarks[i].uuid === selectedBookmark.uuid) {
          let newBookmarks = [...bookmarks]
          newBookmarks[i] = selectedBookmark
          setBookmarks(newBookmarks);
        }
      }

    }
  }, [selectedBookmark])

  React.useEffect(() => {
    if (selectedBookmark.notYetSelected == true) return;
    if (color !== selectedBookmark.bgColor) {
      let newSelectedBookmark = {...selectedBookmark}
      newSelectedBookmark.bgColor = color
      setSelectedBookmark(newSelectedBookmark);
    }

  }, [color])

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
  }

  const saveBookmarks = React.useCallback(
    debounce((bookmarks: any) => {
      chrome.storage.sync.set({ bookmarks }, () => {
        console.log("Saved bookmark config");
      });
    }, 500),
    []
  )

  const selectBookmark = (uuid: string, bgColor: string) => {
    const bookmark = bookmarks.find((bookmark) => bookmark.uuid === uuid);
    setColor(bgColor);
    setSelectedBookmark(bookmark);
  };

  const handleBookmarkChange = (e: any) => {
    const { name, value } = e.target;
    let newSelectedBookmark = {...selectedBookmark};
    newSelectedBookmark[name] = value;
    setSelectedBookmark(newSelectedBookmark);
  };

  const disabled = () => {
    if (selectedBookmark.notYetSelected === true) {
      return true;
    }
    return false;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(bookmarks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBookmarks(items);
    console.log(result);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 2 }}>
      <Typography variant="h4" component="div" sx={{marginBottom: 2, textAlign: "center"}}>
        Bokmärken
      </Typography>
      <Paper elevation={3} sx={{ width: "100%", height: "100%", paddingBottom: 2}}>
        <Stack direction="column" divider={<Divider orientation="horizontal" flexItem />} spacing={1}>
          <Box>
            <Box sx={{position: "absolute", ml: 2, mt: 2.5}}>
              <LightModeIcon />
            </Box>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    className="droppable"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
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
                        <Draggable
                          key={bookmark.uuid}
                          draggableId={bookmark.uuid}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                            >
                              <ThemeProvider theme={buttonTheme}>
                                <Button
                                  sx={buttonStyle}
                                  variant={bookmark.style}
                                  component="a"
                                  color="primary"
                                  onClick={() => selectBookmark(bookmark.uuid, bookmark.bgColor)}
                                >
                                  {bookmark.title}
                                </Button>
                              </ThemeProvider>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
          <Box>
            <Grid container>
              <Grid item xs={8} sx={{paddingLeft: 2, paddingRight: 1}}>
                <Paper sx={{padding: 2}}>
                  <Typography variant="h6" component="div" sx={{marginBottom: 2, textAlign: 'center'}}>
                    Alternativ för individuellt bokmärke
                  </Typography>
                  <Stack direction="column" spacing={1}>
                    <TextField id="title-field" disabled={disabled()} value={selectedBookmark.title ? selectedBookmark.title  : ""} onChange={handleBookmarkChange} label="Titel" name="title" variant="filled" size="small"/>
                    <TextField id="url-field" disabled={disabled()} value={selectedBookmark.url ? selectedBookmark.url  : ""} onChange={handleBookmarkChange} label="URL" name="url" variant="filled" size="small"/>
                    <Divider/>
                    <Box sx={{width: "50%"}}>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="body1" component="span" sx={{marginBottom: 2, paddingTop: 0.5, textAlign: 'center'}}>
                          Radius
                        </Typography>
                        <Slider disabled={disabled()} value={selectedBookmark.radius ? selectedBookmark.radius : 0} name="radius" onChange={handleBookmarkChange} step={1} marks min={0} max={5} size="small" />
                      </Stack>
                    </Box>
                    <Divider/>
                    <Box sx={{width: "50%"}}>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="body1" component="span" sx={{marginBottom: 2, paddingTop: 0.5, textAlign: 'center'}}>
                          Höjd
                        </Typography>
                        <Slider disabled={disabled()} value={selectedBookmark.boxShadow ? selectedBookmark.boxShadow : 0} name="boxShadow" onChange={handleBookmarkChange} step={1} marks min={0} max={24} size="small" />
                      </Stack>
                    </Box>
                    <Divider/>
                    <Box sx={{width: "50%"}}>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="body1" component="span" sx={{marginBottom: 2, paddingTop: 0.5, textAlign: 'center'}}>
                          Stil
                        </Typography>
                        <ButtonGroup disabled={disabled()} variant="contained" sx={{height: 30}} size="small" aria-label="outlined primary button group">
                          <Button key="iflylld" onClick={handleBookmarkChange} name="style" value="contained" >Ifylld</Button>
                          <Button key="kontur" onClick={handleBookmarkChange} name="style" value="outlined" variant="outlined">Kontur</Button>
                        </ButtonGroup>
                      </Stack>
                    </Box>
                    <Divider/>
                    <Box sx={{width: "50%"}}>
                      <Stack direction="row" spacing={1}>
                        <Button disabled={disabled()} variant="outlined" color="error" size="small">
                          Ta bort bokmärke
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={4} sx={{paddingLeft: 1, paddingRight: 2}}>
                <Stack direction="column" spacing={1}>
                  <Paper variant="outlined" sx={{padding: 2}}>
                    <Typography variant="h6" component="div" sx={{marginBottom: 2, textAlign: "center",}}>
                      Alternativ för alla
                    </Typography>
                    <Divider sx={{margin: 1}}/>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} checked={settings.bgColor ? false : true} label="Samma backgrundsfärg" />
                      <FormControlLabel control={<Checkbox />} checked={settings.radius ? false : true} label="Samma radius" />
                      <FormControlLabel control={<Checkbox />} checked={settings.boxShadow ? false : true} label="Samma höjd" />
                    </FormGroup>
                  </Paper>
                  <Paper variant="outlined" sx={{padding: 2}}>
                    <Typography variant="h6" component="div" sx={{marginBottom: 2, textAlign: "center"}}>
                      Bakgrundsfärg
                    </Typography>
                    <Divider/>
                    <Collapse in={selectedBookmark.notYetSelected ? false : true}>
                      <HexColorPicker color={color} onChange={setColor} style={{width: "100%", marginTop: 10, height: 118}}/>
                    </Collapse>
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Bookmarks;
