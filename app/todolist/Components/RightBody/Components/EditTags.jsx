import React, { useContext, useEffect, useState } from "react";
import { useToggle } from "@/app/todolist/Hooks/useToggle";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AppContext } from "../../../page";

const EditTags = () => {
  const { tagsToShow, documentEdit, setDocumentEdit } = useContext(AppContext);
  const [tags, setTags] = useState(documentEdit.tags);
  const [state, toggleTagInput] = useToggle();

  useEffect(() => {
    setDocumentEdit({ ...documentEdit, tags: tags });
  }, [tags]);

  const addTag = (tag) => {
    let present = false;
      tags.map((oldTag)=>{
        oldTag.tagId==tag.tagId&&(present=true); 
      })
      if(!present){
        setTags([...tags,tag])
      }
  }

  const deleteTag = (id) => {
    setTags(tags.filter((tag) => tag.tagId != id));
  };

  return (
    <>
      <div className="flex items-center">
        <p className="w-1/4">Tags</p>
        <div className="flex flex-wrap col-span-3 ml-2 space-x-1">
          {tags?.map((tag) => (
            <div className={`${tag.colorId} Tag flex items-center`}>
              <p className="text-sm">{tag.tagName}</p>{" "}
              <XMarkIcon
                onClick={() => deleteTag(tag.tagId)}
                className="w-3 h-3"
              />{" "}
            </div>
          ))}
          <div onClick={toggleTagInput} className="AddTagButton">
            <PlusIcon className="Icon h-3 w-3" />
            <p className="text-xs">Add Tag</p>
          </div>
        </div>
      </div>
      {state && (
        <div className="AddTagBody">
          {tagsToShow.map((tag) => (
            <div
              onClick={()=>addTag(tag)}
              className={`${tag.colorId} Tag`}
            >
              {tag.tagName}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EditTags;
