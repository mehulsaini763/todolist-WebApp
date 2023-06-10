import {
  TrashIcon,
  StopIcon,
  PlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { AppContext } from "../../../page";
import { auth, db } from "@/app/firebase";
import { doc, deleteDoc, addDoc, collection } from "firebase/firestore";
import { useToggle } from "@/app/todolist/Hooks/useToggle";
import { v4 as uuid } from "uuid";

const Lists = () => {
  const {
    documentsToShow,
    getDocuments,
    selectedItem,
    setSelectedItem,
    setMenuState,
  } = useContext(AppContext);
  const [state, toggleState] = useToggle();

  // SET LIST NAME
  const [listName, setListName] = useState("");

  // CREATE LIST
  const createList = async (e) => {
    if (e.key == "Enter" && listName != "") {
      e.target.value = "";
      toggleState();
      await addDoc(collection(db, "users", auth.currentUser.uid, "documents"), {
        category: "list",
        listName: listName,
        listId: uuid(),
        taskName: "",
        taskId: "",
        description: "",
        dueDate: "",
        taskCompleted: false,
        tags: [],
        subtasks: [],
      });
      setListName("");
      getDocuments();
    }
  };

  // DELETE LIST
  const deleteList = async (documentId, listId) => {
    await deleteDoc(
      doc(db, "users", auth.currentUser.uid, "documents", documentId)
    );
    selectedItem.listId == listId && setSelectedItem({ category: "AllTasks" });
    getDocuments();
  };

  return (
    <div className="MenuItem">
      <h3 className="H3">LISTS</h3>
      {documentsToShow.map((document) => {
        if (document.category == "list") {
          return (
            <div
              onClick={() => {
                setSelectedItem({
                  category: "list",
                  listName: document.listName,
                  listId: document.listId,
                });
                window.innerWidth < 1024 && setMenuState(false);
              }}
            >
              <StopIcon className="Icon h-4 w-4" />
              <p className="grow">{document.listName}</p>
              <TrashIcon
                className="Icon h-4 w-4"
                onClick={() => deleteList(document.documentId, document.listId)}
              />
            </div>
          );
        }
      })}

      {/* ADD LIST */}
      {!state ? (
        <div onClick={toggleState}>
          <PlusIcon className="Icon h-4 w-4" />
          <p>Add New List</p>
        </div>
      ) : (
        <div className="bg-neutral-200 dark:bg-neutral-800">
          <ArrowPathIcon className="Icon h-4 w-4" />
          <input
            className="bg-neutral-200 focus:outline-none dark:bg-neutral-800 dark:text-white"
            type="text"
            autoFocus
            onBlur={toggleState}
            onChange={(e) =>
              e.target.value != "" && setListName(e.target.value)
            }
            onKeyDown={createList}
          />
        </div>
      )}
    </div>
  );
};

export default Lists;
