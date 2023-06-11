import React, { useContext, useState } from "react";
import { useToggle } from "../../../Hooks/useToggle";
import { auth, db } from "@/app/firebase";
import { addDoc, collection } from "firebase/firestore";
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { AppContext } from "../../../page";
import {v4 as uuid} from "uuid"


const AddTask = (props) => {
  const { getDocuments } = useContext(AppContext);
  const [state, toggleState] = useToggle();

  // SET TASK NAME
  const [taskName, setTaskName] = useState("");

  // CREATE TASK
  const createTask = async (e) => {
    if (e.key == "Enter"&& taskName != "") {
      e.target.value = "";
      await addDoc(collection(db,"users",auth.currentUser.uid,"documents"),{
        category: "Task",
        listName: props.listName?props.listName:"",
        listId: props.listId?props.listId:"",
        taskName: taskName,
        taskId: uuid(),
        description: "",
        dueDate: "",
        taskCompleted: false,
        tags: props.tags!=undefined?[props.tags]:[],
        subtasks: [],
        }
      );
      getDocuments();
    }
  };

  return (
    <>
      {!state ? (
        <button className="AddTaskButton" onClick={toggleState}>
          <PlusIcon className="Icon w-5 h-5" />
          <p>Add New Task</p>
        </button>
      ) : (
        <div className="TaskInput">
          <ArrowPathIcon className="Icon w-5 h-5" />
          <input
          className="dark:text-white"
            autoFocus
            onBlur={toggleState}
            onChange={(e)=>setTaskName(e.target.value)}
            onKeyDown={createTask}
            type="text"
          />
        </div>
      )}
    </>
  );
};

export default AddTask;
