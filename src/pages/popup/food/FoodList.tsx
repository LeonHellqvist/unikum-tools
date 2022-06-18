import React from "react";
import "../Popup.css";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import "./hideScroll.css";

interface Meal {
  attributes: any[];
  value: string;
}

interface Day {
  day: number;
  month: number;
  meals?: Meal[];
  reason?: string;
  year: number;
}

interface Days {
  list: {
    [index: number]: Day[];
    map: any;
  };
}
// pass prop "setPage" to button with typescript
const Food = ({ list }: Days) => {
  const [bruh, setBruh] = React.useState(list);

  React.useEffect(() => {
    console.log(bruh);
  }, [bruh]);

  React.useEffect(() => {
    console.log("buhfauidfhsa");
  }, []);

  return (
    <Stack
      sx={{ height: "100%", paddingTop: 5, paddingBottom: 5, overflowY: "scroll" }}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      {list.map((item: any, index: any) => {
        return (
          <Zoom in={true} style={{ transitionDelay: `${index * 200}ms` }}>
            <Paper key={index} sx={{ padding: 1 }} elevation={4}>
              <Typography gutterBottom variant="h6" component="div">
                {item.day}
              </Typography>
              {item.meals ? (
                item.meals.map((item: any, index: any) => {
                  return (
                    <Typography key={index} variant="body1" component="div">
                      {item.value}
                    </Typography>
                  );
                })
              ) : (
                <Typography key={index} variant="body1" component="div">
                  {item.reason}
                </Typography>
              )}
            </Paper>
          </Zoom>
        );
      })}
    </Stack>
  );
};

export default Food;
