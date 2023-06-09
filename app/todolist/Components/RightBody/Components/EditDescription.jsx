import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../page";

const EditDescription = () => {
  const { documentEdit , setDocumentEdit} = useContext(AppContext);
  const [description, setDescription] = useState(documentEdit.description!=""?documentEdit.description:"Description");
  
  useEffect(() => {
    setDocumentEdit({...documentEdit,description: description});
  }, [description]);

  return (
    <>
      <textarea
        className="Description"
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        value={description}
      ></textarea>
    </>
  );
};

export default EditDescription;
