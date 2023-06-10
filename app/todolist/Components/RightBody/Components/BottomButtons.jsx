import React from "react";
import { auth, db } from "@/app/firebase";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { AppContext } from "../../../page";

const BottomButtons = () => {
  const { getDocuments, documentEdit, setSidebarState } =
    useContext(AppContext);

  //UPDATE TASK
  const updateTask = async () => {
    if (documentEdit.taskName === "") {
      alert("Task Name cannot be Empty");
      return;
    } else {
      await setDoc(
        doc(
          db,
          "users",
          auth.currentUser.uid,
          "documents",
          documentEdit.documentId
        ),
        documentEdit
      );
      setSidebarState(false);
      getDocuments();
    }
  };

  // DELETE TASK
  const deleteTask = async () => {
    await deleteDoc(
      doc(
        db,
        "users",
        auth.currentUser.uid,
        "documents",
        documentEdit.documentId
      )
    );
    setSidebarState(false);
    getDocuments();
  };
  return (
    <>
      <button
        onClick={updateTask}
        className="bg-neutral-700 rounded-md p-1 w-full text-white dark:bg-neutral-300 dark:text-black" 
      >
        Save Changes
      </button>
      <button
        onClick={deleteTask}
        className="bg-neutral-200 rounded-md p-1 w-full dark:bg-neutral-800 dark:text-white"
      >
        Delete Task
      </button>
    </>
  );
};

export default BottomButtons;
