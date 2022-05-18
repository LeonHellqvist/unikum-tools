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
import { HexColorPicker } from "react-colorful";
import Switch from '@mui/material/Switch';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import TextField from "@mui/material/TextField";

function Bookmarks() {
  const [bookmarks, setBookmarks] = React.useState<any[]>([]);
  const [selectedBookmark, setSelectedBookmark] = React.useState<any>();

  React.useEffect(() => {
    chrome.storage.sync.get(["bookmarks"], (result) => {
      setBookmarks(result.bookmarks);
      console.log(result.bookmarks);
    });
  }, []);

  React.useEffect(() => {
    chrome.storage.sync.set({ bookmarks }, () => {
      console.log("saved");
    });
  }, [bookmarks]);

  const selectBookmark = (uuid: string) => {
    const bookmark = bookmarks.find((bookmark) => bookmark.uuid === uuid);
    setSelectedBookmark(bookmark);
  };

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
                              <Button
                                sx={{margin:1, marginTop:2, backgroundColor: "#ffe138", color: "#000000de", borderRadius: 1, boxShadow: 0}}
                                variant="contained"
                                color="primary"
                                href={bookmark.url}
                              >
                                {bookmark.title}
                              </Button>
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
                    <TextField id="filled-basic" label="Titel" variant="filled" size="small"/>
                    <TextField id="filled-basic" label="URL" variant="filled" size="small"/>
                    <Divider/>
                    <Box>
                      <Stack direction="row" spacing={2}>
                        <Stack direction="row" spacing={1}>
                          <Typography variant="body1" component="span" sx={{marginBottom: 2, paddingTop: 0.5, textAlign: 'center'}}>
                            Bakgrundsfärg
                          </Typography>
                          <Box sx={{backgroundColor: "#ffe138", width: 30, height: 30, borderRadius: 100}}>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Typography variant="body1" component="span" sx={{marginBottom: 2, paddingTop: 0.5, textAlign: 'center'}}>
                            Textfärg
                          </Typography>
                          <Box sx={{backgroundColor: "#000000de", width: 30, height: 30, borderRadius: 100}}>
                          </Box>
                        </Stack>
                      </Stack>
                    </Box>
                    <Divider/>
                    <Box sx={{width: "50%"}}>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="body1" component="span" sx={{marginBottom: 2, paddingTop: 0.5, textAlign: 'center'}}>
                          Radius
                        </Typography>
                        <Slider defaultValue={1} step={1} marks min={0} max={6} size="small" />
                      </Stack>
                    </Box>
                    <Divider/>
                    <Box sx={{width: "50%"}}>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="body1" component="span" sx={{marginBottom: 2, paddingTop: 0.5, textAlign: 'center'}}>
                          Höjd
                        </Typography>
                        <Slider defaultValue={3} step={1} marks min={0} max={24} size="small" />
                      </Stack>
                    </Box>
                    <Divider/>
                    <Box sx={{width: "50%"}}>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="body1" component="span" sx={{marginBottom: 2, paddingTop: 0.5, textAlign: 'center'}}>
                          Stil
                        </Typography>
                        <ButtonGroup variant="contained" sx={{height: 30}} size="small" aria-label="outlined primary button group">
                          <Button key="iflylld" >Ifylld</Button>
                          <Button key="kontur" variant="outlined">Kontur</Button>
                        </ButtonGroup>
                      </Stack>
                    </Box>
                    <Divider/>
                    <Box sx={{width: "50%"}}>
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" color="error" size="small">
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
                      <FormControlLabel control={<Checkbox />} defaultChecked label="Samma backgrundsfärg" />
                      <FormControlLabel control={<Checkbox />} defaultChecked label="Samma textfärg" />
                      <FormControlLabel control={<Checkbox />} defaultChecked label="Samma radius" />
                      <FormControlLabel control={<Checkbox />} defaultChecked label="Samma höjd" />
                    </FormGroup>
                  </Paper>
                  <Paper variant="outlined" sx={{padding: 2}}>
                    <Typography variant="h6" component="div" sx={{marginBottom: 2, textAlign: "center"}}>
                      Anpassad CSS
                    </Typography>
                    <Divider/>
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
