import React, { useContext, useEffect, useState } from "react";
import { useToggle } from "@/app/todolist/Hooks/useToggle";
import {
  PlusIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import UncheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import { AppContext } from "../../../page";
import { v4 as uuid } from "uuid";

const EditSubtasks = () => {
  const { documentEdit , setDocumentEdit} = useContext(AppContext);
  const [subtaskName, setSubtaskName] = useState("");
  const [subtasks, setSubtasks] = useState(documentEdit.subtasks);
  const [state, toggleState] = useToggle();

  useEffect(() => {
    setDocumentEdit({ ...documentEdit, subtasks: subtasks });
  }, [subtasks]);

  // CREATE SUBTASK
  const createSubask = (e) => {
    if (e.key == "Enter" && subtaskName != "") {
      e.target.value=""
      const subtask = {
          subtaskName: subtaskName,
          subtaskId: uuid(),
          subtaskCompleted: false,
        }
        setSubtaskName("")
        setSubtasks([...subtasks,subtask])
      }
  };

  const updateSubtask = (id,value)=>{
    setSubtasks([...subtasks.map((subtask)=>{
      if(subtask.subtaskId===id){
        return {...subtask,subtaskCompleted:value}
      }
      return subtask
    })])
  }

  const deleteSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask)=>subtask.subtaskId!=id)
    )
  }

  return (
    <div className="h-full space-y-1">
      <h2 className="H2">Subtask:</h2>
      {!state ? (
        <button className="AddSubtaskButton" onClick={toggleState}>
          <PlusIcon className="Icon mx-2 w-4 h-4" />
          <p className="text-sm">Add New Subtask</p>
        </button>
      ) : (
        <div className="AddSubtaskButton bg-neutral-200 text-sm dark:bg-neutral-800">
          <ArrowPathIcon className="Icon mx-2 w-4 h-4" />
          <input
            className="bg-neutral-200 w-full focus:outline-none dark:bg-neutral-800 dark:text-white"
            autoFocus
            onBlur={toggleState}
            onChange={(e) => setSubtaskName(e.target.value)}
            onKeyDown={createSubask}
            type="text"
          />
        </div>
      )}
      {subtasks?.map((subtask) => (
        <div className="Subtask">
          {subtask.subtaskCompleted ? (
            <CheckCircleIcon
                onClick={() => updateSubtask(subtask.subtaskId,false)}
              className="text-green-300 mx-2 w-4 h-4 "
            />
          ) : (
            <UncheckCircleIcon
                onClick={() => updateSubtask(subtask.subtaskId, true)}
              className="Icon mx-2 w-4 h-4"
            />
          )}
          <p className={`${subtask.subtaskCompleted && "line-through"} grow text-sm`}>
            {subtask.subtaskName}
          </p>
          <TrashIcon
            onClick={() => deleteSubtask(subtask.subtaskId)}
            className="mx-2 w-4 h-4 dark:text-white"
          />
        </div>
      ))}
    </div>
  );
};

export default EditSubtasks;
