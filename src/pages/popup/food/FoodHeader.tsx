import "../Popup.css";
import "../index.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

interface WeekProps {
  week: number;
}

// pass prop "setPage" to button with typescript
const FoodHeader = ({ week }: WeekProps) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: -2,
        marginLeft: "-12px",
        width: 355,
        height: 40,
      }}
    >
      <Paper sx={{ height: "100%", width: "100%" }} variant="outlined">
        <Typography
          variant="h5"
          component="div"
          sx={{ paddingTop: 0.4, textAlign: "center" }}
        >
          Vecka {week}
        </Typography>
      </Paper>
    </Box>
  );
};

export default FoodHeader;
