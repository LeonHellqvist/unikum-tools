import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { v4 as uuidv4 } from "uuid";
import Parser from 'rss-parser';
import "./Popup.css";

type CustomFeed = {foo: string};
type CustomItem = {bar: number};

interface CreateButtonProps {
  setPage: (params: any) => any;
}
// pass prop "setPage" to button with typescript
const Food = ({ setPage }: CreateButtonProps) => {
  const parser = new Parser();

  React.useEffect(() => {
    parser.parseURL("https://skolmaten.se/duveholmsskolan/rss/weeks/").then(feed => {
      console.log(feed);
    });
  }, [])


  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="App">
      
    </div>
  );
};

export default Food;
