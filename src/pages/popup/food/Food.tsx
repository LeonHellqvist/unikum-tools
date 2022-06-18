import React from "react";
import "../Popup.css";
import "../index.css";
import FoodHeader from "./FoodHeader";
import FoodList from "./FoodList"
import FoodNav from "./FoodNav";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { weekNumber } from 'weeknumber'

interface CreateButtonProps {
  setPage: (params: any) => any;
}

// pass prop "setPage" to button with typescript
const Food = ({ setPage }: CreateButtonProps) => {
  
  const [week, setWeek] = React.useState(weekNumber(new Date()));
  const [rss, setRss] = React.useState<any>([])


  React.useEffect(() => {
    fetch(`https://tools-proxy.leonhellqvist.workers.dev?service=skolmaten&school=76517002&year=${new Date().getFullYear()}&week=${week-2}&count=1`)
    .then(async response => {
      let rss = await response.json();
      rss = rss.menu.weeks[0].days;
      const removeTable = {0: 0, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 0};
      const dayOrder = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
      for (let i = 0; i < rss.length; i++) {
        rss[i].day = dayOrder[i]
      }

      // Detta funkar alltid eftersom .getday() returnerar 0-6 ALLTID
      // TODO: Ta bort "- 4" eftersom det bara är för test
      // @ts-ignore
      const day: keyof typeof removeTable = new Date().getDay() - 4;
      const dayIndex = removeTable[day];
      console.log(rss);
      for (let i = 0; i < dayIndex; i++) {
        rss.shift();
      }
      console.log(rss);
      //Konverterar getDay() som börjar på en söndag till en måndag

      setRss(rss);
    })
  }, [week])

  return (
    <div className="App" style={{height: 500}}>
      <FoodHeader week={week}/>
      {rss.length != 0 ? <FoodList list={rss} /> : <Stack spacing={1} sx={{paddingTop: 2}}><Skeleton variant="text" /><Skeleton variant="text" /><Skeleton variant="text" /></Stack>}
      <FoodNav setPage={setPage} />
    </div>
  );
};

export default Food;
