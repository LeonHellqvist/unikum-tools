import React from "react";
import "./Popup.css";


interface CreateButtonProps {
  setPage: (params: any) => any;
}
// pass prop "setPage" to button with typescript
const Food = ({ setPage }: CreateButtonProps) => {

  React.useEffect(() => {
    fetch("https://skolmaten.se/duveholmsskolan/rss/weeks/", {mode: "no-cors"}).then(response => {
      console.log(response.statusText);
      return response.text();
  })
  .then(data => console.log(data))
  }, []);

  return (
    <div className="App">
      
    </div>
  );
};

export default Food;
