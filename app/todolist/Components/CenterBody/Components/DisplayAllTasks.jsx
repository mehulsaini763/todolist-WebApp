import React, { useContext } from "react";
import AddTask from "./AddTask";
import Task from "./Task";
import { AppContext } from "../../../page";

const DisplayAllTasks = () => {
  const { documentsToShow, selectedItem } = useContext(AppContext);

  return (
    <>
      <h1 className="font-bold text-4xl lg:text-6xl">
        {selectedItem.category}
      </h1>
      <AddTask listName={""} listId={""} />
      {documentsToShow.map(
        (document) =>
          document.category == "Task" && (
            <div key={document.taskId}>
              <Task document={document} />
            </div>
            
          )
      )}
    </>
  );
};

export default DisplayAllTasks;
