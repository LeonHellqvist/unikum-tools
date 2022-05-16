import React from "react";
import "@pages/options/Options.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

function Bookmarks() {
  const [bookmarks, setBookmarks] = React.useState<any[]>([]);

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
      <Typography variant="h4" component="div">
        Bokmärken
      </Typography>
      <Paper elevation={3} sx={{ width: "100%", height: "100%" }}>
        <Box>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <Grid
                  container
                  spacing={2}
                  style={{ height: "120px" }}
                  className="droppable"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {bookmarks.map((bookmark, index) => {
                    return (
                      <Draggable
                        key={bookmark.url}
                        draggableId={bookmark.url}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                          >
                            <Button
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
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Paper>
    </Container>
  );
}

export default Bookmarks;
