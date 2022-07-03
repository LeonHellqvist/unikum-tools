import React from "react";
import "../Popup.css";
import "../index.css";
import ScheduleHeader from "./ScheduleHeader"
import ScheduleList from "./ScheduleList"
import ScheduleNav from "./ScheduleNav"
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { weekNumber } from 'weeknumber'

interface CreateButtonProps {
  setPage: (params: any) => any;
}

// pass prop "setPage" to button with typescript
const Schedule = ({ setPage }: CreateButtonProps) => {

  // TODO: Fixa så att även "gömda" lektioner visas på rätt sätt
  // TODO: Fixa så att man kan ignorera lektioner

  const [week, setWeek] = React.useState(weekNumber(new Date()));
  const [day, setDay] = React.useState(new Date().getDay())
  const [hideMode, setHideMode] = React.useState(false);
  const [lessons, setLessons] = React.useState([])
  const [hiddenLessons, setHiddenLessons] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    //get scheduleHiddenLessons from chrome storage
    chrome.storage.sync.get("scheduleHiddenLessons", (result) => {
      if (result.scheduleHiddenLessons) {
        setHiddenLessons(result.scheduleHiddenLessons);
      }
    });
  }, [])
  
  React.useEffect(() => {
    console.log(hiddenLessons)
    if (hiddenLessons.length != 0) {
      chrome.storage.sync.set({
        scheduleHiddenLessons: hiddenLessons,
      });
    }
  }, [hiddenLessons])

  React.useEffect(() => {
    let dayToUse = day;
    if (day == 0 || day == 6) {
      setDay(5)
      dayToUse = 5
    }
    const year = new Date().getFullYear();
    fetch(`https://tools-proxy.leonhellqvist.workers.dev?service=skola24&subService=getLessons&hostName=katrineholm.skola24.se&unitGuid=ZGI0OGY4MjktMmYzNy1mMmU3LTk4NmItYzgyOWViODhmNzhj&groupGuid=NTk4NzRhOGQtNDVjOS1mYzE2LTg0NTktNDc1ZjQ0MTQ3YjU4&year=${year}&week=${week - 6}&scheduleDay=${dayToUse}`)
    .then(async response => {
      const res = await response.json();
      for (let i = 0; i < hiddenLessons.length; i++) {
        res.lessonInfo = res.lessonInfo.filter((lesson: any) => lesson.guidId != hiddenLessons[i].guidId)
      }
      const sorted = res.lessonInfo.sort(function (a: any, b: any) {
        const aTime = parseInt(a.timeStart.replaceAll(":", ""));
        const bTime = parseInt(b.timeStart.replaceAll(":", ""));
        return aTime - bTime;
      })
      for (let i = 0; i < sorted.length; i++) {
        for (let j = 0; j < res.boxList.length; j++) {
          if (res.boxList[j].lessonGuids == null) {continue;}
          for (let k = 0; k < res.boxList[j].lessonGuids.length; k++) {
            if (sorted[i].guidId === res.boxList[j].lessonGuids[k]) {
              sorted[i].bColor = res.boxList[j].bColor
              sorted[i].fColor = res.boxList[j].fColor
              sorted[i].timeStartI = parseInt(sorted[i].timeStart.replaceAll(":", ""))
              sorted[i].timeEndI = parseInt(sorted[i].timeEnd.replaceAll(":", ""))
              sorted[i].timeStartU = sorted[i].timeStart.substr(0, sorted[i].timeStart.length - 3)
              sorted[i].timeEndU = sorted[i].timeEnd.substr(0, sorted[i].timeEnd.length - 3)
              break;
            }
          }
        }
      }
      setLessons(sorted)
      console.log(sorted);
    })

  }, [week, day, hiddenLessons])

  return (
    <div className="App" style={{height: 400}}>
      <ScheduleHeader week={week} setWeek={setWeek}/>
      <ScheduleList lessons={lessons} week={week} hideMode={hideMode} setHiddenLessons={setHiddenLessons}/>
      <ScheduleNav day={day} setDay={setDay} hideMode={hideMode} setHideMode={setHideMode} setPage={setPage}/>
    </div>
  );
};

export default Schedule;
