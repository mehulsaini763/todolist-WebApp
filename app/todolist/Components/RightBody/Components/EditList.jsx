import { AppContext } from "@/app/todolist/page";
import React, { useContext, useState, useEffect } from "react";

const EditList = () => {
  const { documentsToShow, documentEdit, setDocumentEdit } =
    useContext(AppContext);
  const [listId, setListId] = useState(documentEdit.listId);
  const [listName, setListName] = useState(documentEdit.listName);

  useEffect(() => {
    setDocumentEdit({ ...documentEdit, listId: listId, listName: listName });
  }, [listId, listName]);

  return (
    <div className="flex">
      <p className="w-1/4">List</p>

      <select 
      onChange={(e)=>{
        const temp = JSON.parse(e.target.value)
        setListName(temp.listName)
        setListId(temp.listId)
      }}
      className="SelectMenu">
        {documentEdit.listName == "" && <option>None</option>}
        {documentsToShow.map(
          (document) =>
            document.category == "list" && <option value={JSON.stringify(document)}>{document.listName}</option>
        )}
      </select>
    </div>
  );
};

export default EditList;
