import React from "react";
import "../Popup.css";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import "./hideScroll.css";


interface FoodListProps {
  list: {
    map: any;
    media: any[];
    id: string;
    title: string;
    link: string;
    description: string;
    pubDate: Date;
  };
}
// pass prop "setPage" to button with typescript
const Food = ({ list }: FoodListProps) => {

  return (
    <Stack
      sx={{height: "180px", overflowY: "scroll"}}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      {list.map((item: any, index: any) => {
        return (
          <Paper key={index} sx={{padding: 1}}>
            <Typography gutterBottom variant="h6" component="div">
              {item.title}
            </Typography>
            {item.description.split("<br/>").map((item: any, index: any) => {
              return (
                <Typography key={index} variant="body1" component="div">
                  {item}
                </Typography>
              )
            })}
          </Paper>
        );
      })}
    </Stack>
  )
};

export default Food;
