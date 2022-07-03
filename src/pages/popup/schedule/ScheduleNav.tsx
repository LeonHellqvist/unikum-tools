import React from "react";
import "../Popup.css";
import "../index.css";
import Skeleton from "@mui/material/Skeleton";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import LaptopIcon from "@mui/icons-material/Laptop";
import TvIcon from "@mui/icons-material/Tv";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { weekNumber } from "weeknumber";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

interface CreateButtonProps {
  setPage: (params: any) => any;
  day: number;
  setDay: (params: any) => any;
  hideMode: boolean;
  setHideMode: (params: any) => any;
}

// pass prop "setPage" to button with typescript
const ScheduleNav = ({
  setPage,
  day,
  setDay,
  hideMode,
  setHideMode,
}: CreateButtonProps) => {

  const handleDayChange = (event: any, newDay: any) => {
    if (newDay !== null) {
      setDay(newDay);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: -2,
        marginLeft: "-12px",
        width: 355,
        height: 40,
      }}
    >
      <Paper variant="outlined" elevation={0}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Button disableElevation onClick={() => setPage(0)}>
            <ArrowBackIcon />
          </Button>
          <IconButton color={hideMode ? "error" : "default"} onClick={() => setHideMode((prev: any) => !prev)}>
            <VisibilityOffIcon />
          </IconButton>
          <ToggleButtonGroup
            value={day}
            exclusive
            onChange={handleDayChange}
            aria-label="text alignment"
            size="small"
            color="primary"
          >
            <ToggleButton value={1}>Mån</ToggleButton>
            <ToggleButton value={2}>Tis</ToggleButton>
            <ToggleButton value={3}>Ons</ToggleButton>
            <ToggleButton value={4}>Tor</ToggleButton>
            <ToggleButton value={5}>Fre</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ScheduleNav;
