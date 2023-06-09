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
        className="bg-yellow-300 rounded-md p-1 w-full"
      >
        Save Changes
      </button>
      <button
        onClick={deleteTask}
        className="bg-neutral-200 rounded-md p-1 w-full"
      >
        Delete Task
      </button>
    </>
  );
};

export default BottomButtons;
