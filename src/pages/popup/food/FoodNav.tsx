import React from "react";
import "../Popup.css";
import "../index.css";
import FoodList from "./FoodList"
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { weekNumber } from 'weeknumber'
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

interface CreateButtonProps {
  setPage: (params: any) => any;
}

// pass prop "setPage" to button with typescript
const FoodNav = ({ setPage }: CreateButtonProps) => {
  
  const [week, setWeek] = React.useState(weekNumber(new Date()));
  const [rss, setRss] = React.useState<any>([])


  React.useEffect(() => {

  }, [week])

  return (
    <Box sx={{position: "fixed", bottom: -2, marginLeft: "-12px", width: 355, height: 40}}>
      <Paper variant="outlined" elevation={0}>
        <Button
          disableElevation
          onClick={() => setPage(0)}
        >
          <ArrowBackIcon />
        </Button>
      </Paper>
    </Box>
  );
};

export default FoodNav;
