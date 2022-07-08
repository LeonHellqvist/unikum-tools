import React from "react";
import "../Popup.css";
import "../index.css";
import FoodHeader from "./FoodHeader";
import FoodList from "./FoodList";
import FoodNav from "./FoodNav";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { weekNumber } from "weeknumber";

interface CreateButtonProps {
  setPage: (params: any) => any;
}

// pass prop "setPage" to button with typescript
const Food = ({ setPage }: CreateButtonProps) => {
  const [week, setWeek] = React.useState(weekNumber(new Date()));
  const [list, setList] = React.useState<any>([]);
  const [noStation, setNoStation] = React.useState<boolean>(false);

  React.useEffect(() => {
    /* setList([]) */
    chrome.storage.sync.get("foodSettings", function (result) {
      if (result.foodSettings) {
        fetch(
          `https://tools-proxy.leonhellqvist.workers.dev?service=skolmaten&subService=menu&school=${
            result.foodSettings.id
          }&year=${new Date().getFullYear()}&week=${week - 1}`
        ).then(async (response) => {
          let list = await response.json();
          list = list.menu.weeks[0].days;
          const removeTable = { 0: 0, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 0 };
          const dayOrder = [
            "Måndag",
            "Tisdag",
            "Onsdag",
            "Torsdag",
            "Fredag",
            "Lördag",
            "Söndag",
          ];
          for (let i = 0; i < list.length; i++) {
            list[i].day = dayOrder[i];
          }

          // Detta funkar alltid eftersom .getday() returnerar 0-6 ALLTID
          // @ts-ignore
          const day: keyof typeof removeTable = new Date().getDay();
          const dayIndex = removeTable[day];
          const res = { week: list, scrollTo: dayIndex };
          //Konverterar getDay() som börjar på en söndag till en måndag

          setList(res);
        });
      } else {
        setNoStation(true);
      }
    });
  }, [week]);

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  // TODO: fixa denna atrocity
  return (
    <div className="App" style={{ height: 400 }}>
      <FoodHeader week={week} />
      {noStation ? (
        <Box sx={{marginTop: 8}}>
        <Typography variant="h6" component="div">
          Välj din matsal
        </Typography>
        <Button
          variant="contained"
          disableElevation
          onClick={() => openOptions()}
        >
          Alternatv
        </Button>
        </Box>
      ) : list.length != 0 ? (
        <FoodList list={list} week={week} />
      ) : (
        <Stack spacing={1} sx={{ paddingTop: 4 }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Stack>
      )}

      <FoodNav setPage={setPage} week={week} setWeek={setWeek} />
    </div>
  );
};

export default Food;
