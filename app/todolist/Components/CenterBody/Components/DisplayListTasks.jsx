import React, { useContext } from "react";
import { AppContext } from "../../../page";
import AddTask from "./AddTask";
import Task from "./Task";

const DisplayListTasks = () => {
  const { documentsToShow, selectedItem } = useContext(AppContext);

  return (
    <>
      <h1 className="text-4xl lg:text-6xl font-black">
        {selectedItem.listName}
      </h1>
      <AddTask listName={selectedItem.listName} listId={selectedItem.listId} />
      {documentsToShow.map(
        (document) =>
          document.listId == selectedItem.listId &&
          document.taskName != "" && (
            <div key={document.taskId}>
              <Task document={document} />
            </div>
            
          )
      )}
    </>
  );
};

export default DisplayListTasks;
