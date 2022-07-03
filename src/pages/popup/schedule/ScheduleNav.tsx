import React from "react";
import "../Popup.css";
import "../index.css";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { weekNumber } from 'weeknumber'
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

interface CreateButtonProps {
  setPage: (params: any) => any;
  week: number;
  setWeek: (params: any) => any;
}

// pass prop "setPage" to button with typescript
const ScheduleNav = ({ setPage, week, setWeek }: CreateButtonProps) => {
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setWeek(value);
  };

  return (
    <Box sx={{position: "fixed", bottom: -2, marginLeft: "-12px", width: 355, height: 40}}>
      <Paper variant="outlined" elevation={0}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Button
            disableElevation
            onClick={() => setPage(0)}
          >
            <ArrowBackIcon />
          </Button>
          <Pagination color="primary" variant="text" shape="rounded" size="small" page={week} onChange={handleChange} boundaryCount={0} siblingCount={2} count={53} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default ScheduleNav;
