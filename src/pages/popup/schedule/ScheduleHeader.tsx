import "../Popup.css";
import "../index.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';

interface WeekProps {
  week: number;
  setWeek: (params: any) => any;
}

// pass prop "setPage" to button with typescript
const ScheduleHeader = ({ week, setWeek }: WeekProps) => {

  const handleClickLeft = () => {
    if (week != 1) {
      setWeek(week - 1);
    }
  }

  const handleClickRight = () => {
    if (week != 53) {
      setWeek(week + 1);
    }
  }

  return (
    <Box sx={{position: "fixed", top: -2, marginLeft: "-12px", width: 355, height: 40}}>
      <Paper sx={{height: "100%", width: "100%"}} variant="outlined">
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <IconButton onClick={() => {handleClickLeft()}}>
          <ArrowLeftIcon />
        </IconButton>
        <Typography variant="h5" component="div" sx={{paddingTop: 0.4, textAlign: 'center'}}>
          Vecka {week}
        </Typography>
        <IconButton onClick={() => {handleClickRight()}}>
          <ArrowRightIcon />
        </IconButton>
      </Stack>
      </Paper>
    </Box>
  );
};

export default ScheduleHeader;
