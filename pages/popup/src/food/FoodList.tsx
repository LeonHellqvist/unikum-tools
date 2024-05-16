import React from "react";
import "../Popup.css";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import { weekNumber } from "weeknumber";
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

interface Week {
  [index: number]: Day[];
  map: any;
}

interface List {
  list: {
    week: Week;
    scrollTo: number;
  };
  week: number;
}
// pass prop "setPage" to button with typescript
const Food = ({ list, week }: List) => {
  const stackRef = React.useRef<HTMLInputElement>(null);
  const elRef = React.useRef<HTMLInputElement>(null);
  const currentWeek = weekNumber(new Date());

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (elRef.current) {
        if (currentWeek == week) {
          elRef.current.scrollIntoView({
            behavior: "smooth",
          });
        } else {
          if (stackRef.current) {
            stackRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [list]);

  const shouldBeSelected = (index: number) => {
    if (currentWeek != week) return false;
    if (list.scrollTo != index) return false;
    return true;
  };

  return (
    <Stack
      ref={stackRef}
      sx={{
        height: "100%",
        paddingTop: 5,
        paddingBottom: 5,
        overflowY: "scroll",
      }}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      {list.week.map((item: any, index: any) => {
        return (
          <div
            key={index}
            {...(list.scrollTo == index ? { ref: elRef } : null)}
            style={{ scrollMargin: 40 }}
          >
            <Zoom in={true} style={{ transitionDelay: `${index * 200}ms` }}>
              <Paper
                sx={{ padding: 1, textAlign: "left" }}
                {...(shouldBeSelected(index)
                  ? { elevation: 20 }
                  : { elevation: 4 })}
              >
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
                    {item.reason
                      ? item.reason
                      : "Finns ingen information om maten"}
                  </Typography>
                )}
              </Paper>
            </Zoom>
          </div>
        );
      })}
    </Stack>
  );
};

export default Food;
