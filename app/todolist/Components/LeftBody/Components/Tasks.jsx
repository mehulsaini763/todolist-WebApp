import React, { useContext } from "react";
import {
  ChevronDoubleRightIcon,
  ListBulletIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { AppContext } from "@/app/todolist/page";

const Tasks = () => {
  const { selectedItem, setSelectedItem, setMenuState } =
    useContext(AppContext);
  return (
    <div className="MenuItem h-fit">
      <h3 className="H3">TASKS</h3>
      <div
        className={`${
          selectedItem.category == "AllTasks" && "SelectedItem bg-neutral-200  dark:bg-neutral-800"
        }`}
        onClick={() => {
          setSelectedItem({ category: "AllTasks" });
          window.innerWidth < 1024 && setMenuState(false);
        }}
      >
        <ChevronDoubleRightIcon className="Icon h-4 w-4" />
        <p>All Tasks</p>
      </div>
      <div
        className={`${
          selectedItem.category == "Today" && "SelectedItem bg-neutral-200 dark:bg-neutral-800"
        }`}
        onClick={() => {
          setSelectedItem({ category: "Today" });
          window.innerWidth < 1024 && setMenuState(false);
        }}
      >
        <ListBulletIcon className="Icon h-4 w-4" />
        <p>Today</p>
      </div>
      <div
        className={`${
          selectedItem.category == "StickyWall" && "SelectedItem bg-neutral-200 dark:bg-neutral-800"
        }`}
        onClick={() => {
          setSelectedItem({ category: "StickyWalls" });
          window.innerWidth < 1024 && setMenuState(false);
        }}
      >
        <PencilSquareIcon className="Icon h-4 w-4" />
        <p>Sticky Wall</p>
      </div>
    </div>
  );
};

export default Tasks;
