import React, { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { AppContext } from "../../../page";


const EditDueDate = () => {
  const { documentEdit , setDocumentEdit} = useContext(AppContext);
  const [dueDate, setDueDate] = useState(documentEdit.dueDate);
  const date = new Date();

  useEffect(() => {
    setDocumentEdit({...documentEdit,dueDate: dueDate});
  }, [dueDate]);

  return (
    <div className="flex">
      <p className="w-1/3">Due Date</p>
      <div>
        <ReactDatePicker
          selected={dueDate != "" ? dueDate : date}
          dateFormat={"dd/MM/yyyy"}
          onChange={(date) => setDueDate(date)}
          className="SelectMenu"
        />
      </div>
    </div>
  );
};

export default EditDueDate;
