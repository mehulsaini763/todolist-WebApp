import { useContext, useState, useEffect } from "react";
import "./CenterBody.css";
import DisplayAllTasks from "./Components/DisplayAllTasks";
import DisplayTodayTasks from "./Components/DisplayTodayTasks";
import DisplayListTasks from "./Components/DisplayListTasks";
import { AppContext } from "../../page";
import DisplayStickyWall from "./Components/DisplayStickyWall";
import DisplayTaggedTasks from "./Components/DisplayTaggedTasks";

const CenterBody = () => {
  const { selectedItem, menuState, sidebarState } = useContext(AppContext);
  const [width, setWidth] = useState("w-full");

  useEffect(() => {
    if (sidebarState && menuState) {
      setWidth("lg:w-2/4");
    } else if (sidebarState || menuState) {
      setWidth("lg:w-3/4");
    } else setWidth("w-full");
  }, [menuState, sidebarState]);

  return (
    <div className={`TaskBody ${width}`}>
      {selectedItem.category == "list" ? (
        <DisplayListTasks />
      ) : selectedItem.category == "Today" ? (
        <DisplayTodayTasks />
      ) : selectedItem.category == "AllTasks" ? (
        <DisplayAllTasks />
      ) : selectedItem.category == "StickyWalls" ? (
        <DisplayStickyWall />
      ) : (
        selectedItem.category == "Tag" && <DisplayTaggedTasks />
      )}
    </div>
  );
};

export default CenterBody;
