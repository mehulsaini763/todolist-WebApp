import React, { useContext, useState } from "react";
import { auth, db } from "@/app/firebase";
import { doc, addDoc, deleteDoc, collection } from "firebase/firestore";
import { useToggle } from "../../../Hooks/useToggle";
import { AppContext } from "../../../page";
import { PlusIcon, ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Tags = () => {
  const { tagsToShow, getTags,selectedItem, setSelectedItem } = useContext(AppContext);
  const [state, toggleState] = useToggle();

  const colors = [
    "bg-red-300",
    "bg-orange-300",
    "bg-yellow-300",
    "bg-lime-300",
    "bg-green-300",
    "bg-emerald-300",
    "bg-teal-300",
    "bg-blue-300",
    "bg-purple-300",
    "bg-fuchsia-300",
  ];

  // SET TAG NAME
  const [tagName, setTagName] = useState("");
  const getTagName = (e) => {
    setTagName(e.target.value != "" && e.target.value);
  };

  // CREATE TAG
  const createTag = async (e) => {
    if (e.key == "Enter" && tagName != "") {
      e.target.value = "";
      toggleState();
      await addDoc(collection(db, "users", auth.currentUser.uid, "tags"), {
        category: "Tag",
        tagName: tagName,
        colorId: colors[Math.floor(Math.random() * colors.length)],
      });
      setTagName("");
      getTags();
    }
  };

  const deleteTag = async (id) => {
    await deleteDoc(doc(db, "users", auth.currentUser.uid, "tags", id));
    if(selectedItem?.tagId==id){
      setSelectedItem({category: "AllTasks"})
    }
    getTags();
  };

  return (
    <div className="h-full">
      <h3 className="H3">TAGS</h3>
      <div className="flex flex-wrap gap-1 my-0.5">
        {tagsToShow.map((tag) => (
          <div
          key={tag.tagId}
            className={`${tag.colorId} Tag`}
            onClick={() => {
              setSelectedItem(tag);
            }}
          >
            <p className="text-sm">{tag.tagName}</p>{" "}
            <XMarkIcon
              onClick={() => deleteTag(tag.tagId)}
              className="w-3 h-3"
            />{" "}
          </div>
        ))}
        {!state ? (
          <div onClick={toggleState} className="AddTagButton">
            <PlusIcon className="Icon h-3 w-3" />
            <p className="text-sm">Add Tag</p>
          </div>
        ) : (
          <div className="AddTagButton">
            <ArrowPathIcon className="Icon w-3 h-3" />
            <input
              className="bg-neutral-200 text-sm w-14 focus:outline-none"
              autoFocus
              onBlur={toggleState}
              onChange={getTagName}
              onKeyDown={createTag}
              type="text"
            />
          </div>
        )}
      </div>
    </div>
  );
};

//ADD TAG

const AddTag = () => {
  return <></>;
};

export default Tags;
