import React, { useContext } from "react";
import Task from "./Task";
import { AppContext } from "@/app/todolist/page";
import AddTask from "./AddTask";

const DisplayTaggedTasks = () => {
  const { documentsToShow, selectedItem } = useContext(AppContext);
  return (
    <>
      <h1 className="font-bold text-4xl lg:text-6xl">
        {selectedItem.tagName}
      </h1>
      <AddTask tags={selectedItem} />
      {documentsToShow.map((document) => {
        return document.tags.map((tag) => {
          if (selectedItem.tagId == tag.tagId) {
            return <Task document={document} />;
          }
        });
      })}
    </>
  );
};

export default DisplayTaggedTasks;
