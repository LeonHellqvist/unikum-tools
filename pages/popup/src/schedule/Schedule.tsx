import React from 'react';
import '../Popup.css';
import '../index.css';
import ScheduleHeader from './ScheduleHeader';
import ScheduleList from './ScheduleList';
import ScheduleNav from './ScheduleNav';
import Fade from '@mui/material/Fade';
import { weekNumber } from 'weeknumber';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface CreateButtonProps {
  setPage: (params: any) => any;
}

interface Class {
  groupGuid: string;
  label: string;
}

interface School {
  unitGuid: string;
  label: string;
}

interface ScheduleSettings {
  hostName: string;
  schoolYear: string;
  school: School;
  class: Class;
}

// pass prop "setPage" to button with typescript
const Schedule = ({ setPage }: CreateButtonProps) => {
  const [scheduleSettings, setScheduleSettings] = React.useState<ScheduleSettings | null | undefined>(null);
  const [week, setWeek] = React.useState(weekNumber(new Date()));
  const [day, setDay] = React.useState(new Date().getDay());
  const [hideMode, setHideMode] = React.useState(false);
  const [lessons, setLessons] = React.useState([]);
  const [hiddenLessons, setHiddenLessons] = React.useState<any[]>([]);

  function getTimetable() {
    console.log(scheduleSettings);
    if (scheduleSettings == null) return;
    let dayToUse = day;
    if (day == 0 || day == 6) {
      setDay(5);
      dayToUse = 5;
    }
    const year = new Date().getFullYear();
    fetch(
      `https://tools-proxy.leonhellqvist.workers.dev?service=skola24&subService=getLessons&hostName=${scheduleSettings.hostName}&schoolYear=${scheduleSettings.schoolYear}&unitGuid=${scheduleSettings.school.unitGuid}&groupGuid=${scheduleSettings.class.groupGuid}&year=${year}&week=${week}&scheduleDay=${dayToUse}`,
    ).then(async response => {
      const res = await response.json();
      for (let i = 0; i < hiddenLessons.length; i++) {
        res.lessonInfo = res.lessonInfo.filter((lesson: any) => lesson.guidId != hiddenLessons[i].guidId);
      }
      const sorted = res.lessonInfo.sort(function (a: any, b: any) {
        const aTime = parseInt(a.timeStart.replaceAll(':', ''));
        const bTime = parseInt(b.timeStart.replaceAll(':', ''));
        return aTime - bTime;
      });
      for (let i = 0; i < sorted.length; i++) {
        for (let j = 0; j < res.boxList.length; j++) {
          if (res.boxList[j].lessonGuids == null) {
            continue;
          }
          for (let k = 0; k < res.boxList[j].lessonGuids.length; k++) {
            if (sorted[i].guidId === res.boxList[j].lessonGuids[k]) {
              sorted[i].bColor = res.boxList[j].bColor;
              sorted[i].fColor = res.boxList[j].fColor;
              sorted[i].timeStartI = parseInt(sorted[i].timeStart.replaceAll(':', ''));
              sorted[i].timeEndI = parseInt(sorted[i].timeEnd.replaceAll(':', ''));
              sorted[i].timeStartU = sorted[i].timeStart.substr(0, sorted[i].timeStart.length - 3);
              sorted[i].timeEndU = sorted[i].timeEnd.substr(0, sorted[i].timeEnd.length - 3);
              break;
            }
          }
        }
      }
      setLessons(sorted);
      console.log(sorted);
    });
  }

  React.useEffect(() => {
    chrome.storage.sync.get('scheduleSettings', result => {
      if (result.scheduleSettings.class != null) {
        setScheduleSettings(result.scheduleSettings);
      } else {
        setScheduleSettings(null);
      }
    });

    chrome.storage.sync.get('scheduleHiddenLessons', result => {
      if (result.scheduleHiddenLessons) {
        setHiddenLessons(result.scheduleHiddenLessons);
      }
    });
    console.log('ok?');
  }, []);

  React.useEffect(() => {
    if (scheduleSettings != null) {
      getTimetable();
    }
  }, [scheduleSettings]);

  React.useEffect(() => {
    if (scheduleSettings != null) {
      getTimetable();
    }
  }, [week, day]);

  React.useEffect(() => {
    let tempLessons = lessons;
    for (let i = 0; i < hiddenLessons.length; i++) {
      tempLessons = tempLessons.filter((lesson: any) => lesson.guidId != hiddenLessons[i].guidId);
    }
    setLessons(tempLessons);
    if (hiddenLessons.length != 0) {
      chrome.storage.sync.set({
        scheduleHiddenLessons: hiddenLessons,
      });
    }
  }, [hiddenLessons]);

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="App" style={{ height: 400 }}>
      <ScheduleHeader week={week} setWeek={setWeek} />
      {scheduleSettings === null ? (
        <Fade in={true}>
          <Box sx={{ marginTop: 8 }}>
            <Typography variant="h6" component="div">
              Välj din klass
            </Typography>
            <Button variant="contained" disableElevation onClick={() => openOptions()}>
              Alternatv
            </Button>
          </Box>
        </Fade>
      ) : (
        <ScheduleList lessons={lessons} week={week} hideMode={hideMode} setHiddenLessons={setHiddenLessons} />
      )}
      <ScheduleNav day={day} setDay={setDay} hideMode={hideMode} setHideMode={setHideMode} setPage={setPage} />
    </div>
  );
};

export default Schedule;
