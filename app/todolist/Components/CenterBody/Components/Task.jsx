import React, { useContext } from "react";
import { AppContext } from "../../../page";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import UncheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import { auth, db } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";
import {v4 as uuid} from "uuid"

const Task = (props) => {
  const { getDocuments, setDocumentEdit, setSidebarState } =
    useContext(AppContext);
  const document = props.document;
  //UPDATE TASK
  const updateTask = async (value) => {
    await setDoc(
      doc(db, "users", auth.currentUser.uid, "documents", document.documentId),
      {
        ...document,
        taskCompleted: value,
      }
    );
    getDocuments();
  };

  const someFunction = async () => {

    await setDocumentEdit(document);
    await setSidebarState(false);
    await setSidebarState(true);
  };
  return (
    <>
      <div className="Task" key={uuid()}>
        {document.taskCompleted ? (
          <CheckCircleIcon
            onClick={() => updateTask(false)}
            className="text-green-300 mx-3 w-5 h-5"
          />
        ) : (
          <UncheckCircleIcon
            onClick={() => updateTask(true)}
            className="Icon mx-3 w-5 h-5"
          />
        )}
        <p
          onClick={someFunction}
          className={`${document.taskCompleted && "line-through"} grow py-1 `}
        >
          {document.taskName}
        </p>
        <ArrowRightIcon className="mx-3 w-5 h-5" />
      </div>
    </>
  );
};

export default Task;
