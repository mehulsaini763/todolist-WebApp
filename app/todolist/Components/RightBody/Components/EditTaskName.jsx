import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../page";

const EditTaskName = () => {
  const {  documentEdit , setDocumentEdit} = useContext(AppContext);
  const [taskName, setTaskName] = useState(documentEdit.taskName);
  
  useEffect(() => {
    setDocumentEdit({...documentEdit,taskName: taskName});
  }, [taskName]);
  
  return (
    <>
      <input
        className="EditTaskName"
        type="text"
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
      />
    </>
  );
};

export default EditTaskName;
