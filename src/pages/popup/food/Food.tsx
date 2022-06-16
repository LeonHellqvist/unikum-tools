import React from "react";
import "../Popup.css";
import "../index.css";
import FoodList from "./FoodList"


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
    </div>
  );
};

export default Food;
