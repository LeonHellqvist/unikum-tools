import { ThemeProvider } from "@emotion/react";
import { Box, Grid, createTheme, Button } from "@mui/material";
import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const BookmarkBar = (props: any) => {
  const [darkBackground, setDarkBackground] = React.useState(true);

  const onDragEnd = (result: DropResult) => {
    console.log("on drag");
    if (!result.destination) return;
    const items = Array.from(props.bookmarks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    props.setBookmarks(items);
    console.log(result);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          ml: -4,
          mt: 1.5,
          transition: "background-color 100ms ease-in-out",
          backgroundColor: `${darkBackground ? "#242424" : "white"}`,
          paddingTop: "10px",
          paddingLeft: "8px",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          height: "45px",
          width: "35px",
        }}
        onClick={() => setDarkBackground(!darkBackground)}
      >
        {darkBackground ? (
          <LightModeIcon />
        ) : (
          <DarkModeIcon sx={{ color: "black" }} />
        )}
      </Box>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <Grid
              sx={{
                transition: "background-color 100ms ease-in-out",
                backgroundColor: `${darkBackground ? null : "white"}`,
                borderBottom: "1px solid #424242",
                paddingBottom: 1,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
              container
              justifyContent="center"
              alignItems="center"
              className="droppable"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {props.bookmarks.map((bookmark: any, index: number) => {
                let buttonTheme = createTheme({
                  palette: { primary: { main: bookmark.bgColor } },
                  typography: { button: { textTransform: "none" } },
                });
                let buttonStyle = {
                  margin: 1,
                  marginTop: 2,
                  borderRadius: bookmark.radius,
                  boxShadow: bookmark.boxShadow,
                };
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
                            onClick={() =>
                              props.selectBookmark(
                                bookmark.uuid,
                                bookmark.bgColor
                              )
                            }
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
  );
};

export default BookmarkBar;
