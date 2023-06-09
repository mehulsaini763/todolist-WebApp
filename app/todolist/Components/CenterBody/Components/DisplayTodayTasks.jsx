import React, { useContext } from "react";
import { AppContext } from "../../../page";
import AddTask from "./AddTask";
import Task from "./Task";

const DisplayTodayTasks = () => {
  const { documentsToShow, selectedItem } = useContext(AppContext);
  const date = new Date();
  return (
    <>
      <h1 className="text-4xl lg:text-6xl font-black">
        {selectedItem.category}
      </h1>
      <AddTask listName={""} listId={""} />
      {documentsToShow.map((document) => {
        if (document.taskName != "") {
          return (
            (document.dueDate == date || document.dueDate == "") && (
              <div key={document.taskId}>
                <Task document={document} />
              </div>
            )
          );
        }
      })}
    </>
  );
};

export default DisplayTodayTasks;
