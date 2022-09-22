import React from "react";
import "../Popup.css";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import { weekNumber } from "weeknumber";
import "./hideScroll.css";

interface Lesson {
  guidId: string;
  texts: string[];
  timeStart: string;
  timeStartU: string;
  timeStartI: number;
  timeEnd: string;
  timeEndU: string;
  timeEndI: number;
  dayOfWeekNumber: number;
  blockName: string;
  bColor: string;
  fColor: string;
}

interface Lessons {
  lessons: {
    length: number;
    [index: number]: Lesson;
    map: any;
  };
  week: number;
  hideMode: boolean;
  setHiddenLessons: (params: any) => any;
}
// pass prop "setPage" to button with typescript
const ScheduleList = ({
  lessons,
  week,
  hideMode,
  setHiddenLessons,
}: Lessons) => {
  const stackRef = React.useRef<HTMLInputElement>(null);
  const elRef = React.useRef<HTMLInputElement>(null);
  const currentWeek = weekNumber(new Date());

  const hideStyles = {
    ":hover": {
      bgcolor: "#421a17", // theme.palette.primary.main
      color: "white",
    },
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (elRef.current) {
        if (!hideMode) {
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
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [lessons]);

  const hideLesson = (lesson: Lesson) => {
    if (!hideMode) return;
    const lessonEssentials = {
      guidId: lesson.guidId,
      texts: lesson.texts,
      timeStartU: lesson.timeStartU,
      timeEndU: lesson.timeEndU,
    };
    setHiddenLessons((prev: any) => [...prev, lessonEssentials]);
  };

  const shouldBeRef = (index: number) => {
    const d = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const time = parseInt(d.replaceAll(":", ""));
    if (index == 0 && time <= lessons[0].timeStartI) return true;
    if (
      index == lessons.length - 1 &&
      time >= lessons[lessons.length - 1].timeStartI
    )
      return true;
    if (index > 0 && index < lessons.length - 1) {
      if (time >= lessons[index].timeStartI && time < lessons[index].timeEndI)
        return true;
      if (
        time >= lessons[index - 1].timeEndI &&
        time < lessons[index].timeStartI
      )
        return true;
    }
    return false;
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
      {lessons.map((lesson: any, lessonIndex: number) => {
        return (
          <div
            key={lessonIndex}
            {...(shouldBeRef(lessonIndex) ? { ref: elRef } : null)}
            style={{ scrollMargin: 40 }}
          >
            <Zoom in={true} style={{ transitionDelay: `${1 * 200}ms` }}>
              <Paper
                style={{ textAlign: "left", height: "100%" }}
                sx={hideMode == true ? hideStyles : null}
                onClick={() => {
                  hideLesson(lesson);
                }}
                {...(shouldBeRef(lessonIndex)
                  ? { elevation: 20 }
                  : { elevation: 4 })}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Box
                    sx={{
                      marginRight: 1,
                      marginLeft: 0.5,
                      width: "3px",
                      height: "100%",
                      backgroundColor: lesson.bColor,
                    }}
                  />
                  <Box sx={{ padding: 1, width: "315px" }}>
                    {lesson.texts.map(
                      (item: any, index: number, length: any) => {
                        return index != length.length - 1 ? (
                          <Typography
                            key={index}
                            variant="body1"
                            component="div"
                            noWrap = {true}
                          >
                            {item}
                          </Typography>
                        ) : (
                          <Stack
                            key={index}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            sx={{ width: "100%" }}
                          >
                            <Typography variant="body1" component="div">
                              {item}
                            </Typography>
                            <Typography
                              variant="body1"
                              component="div"
                              sx={{ paddingRight: 1 }}
                            >
                              {lesson.timeStartU} - {lesson.timeEndU}
                            </Typography>
                          </Stack>
                        );
                      }
                    )}
                  </Box>
                </Stack>
              </Paper>
            </Zoom>
          </div>
        );
      })}
    </Stack>
  );
};

export default ScheduleList;
