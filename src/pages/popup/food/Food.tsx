import React from "react";
import "../Popup.css";
import "../index.css";
import FoodList from "./FoodList"
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";

interface CreateButtonProps {
  setPage: (params: any) => any;
}
// pass prop "setPage" to button with typescript
const Food = ({ setPage }: CreateButtonProps) => {

  const [rss, setRss] = React.useState<any>([])

  React.useEffect(() => {
    fetch("https://tools-proxy.leonhellqvist.workers.dev/?service=skolmaten&school=duveholmsskolan&offset=-2")
    .then(async response => {
      const rss = await response.json();
      setRss(rss);
    })
  }, [])

  return (
    <div className="App">
      <FoodList list={rss}/>
      <Box sx={{position: "fixed", top: 148}}>
        <Button
          disableElevation
          onClick={() => setPage(0)}
        >
          <ArrowBackIcon />
        </Button>
      </Box>
    </div>
  );
};

export default Food;
