import React, { useContext, useEffect } from "react";
import "./RightBody.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AppContext } from "../../page";
import BottomButtons from "./Components/BottomButtons";
import EditTaskName from "./Components/EditTaskName";
import EditDescription from "./Components/EditDescription";
import EditList from "./Components/EditList";
import EditDueDate from "./Components/EditDueDate";
import EditTags from "./Components/EditTags";
import EditSubtasks from "./Components/EditSubtasks";

const RightBody = () => {
  const { setSidebarState,setDocumentEdit } = useContext(AppContext);

  return (
    <div className="SidebarBody">
      <div className="flex items-center">
        <h2 className="H2 w-full">Task</h2>
        <XMarkIcon
          onClick={() => {setSidebarState(false);setDocumentEdit({})}}
          className="Icon w-6 h-6"
        />
      </div>
      <div className="overflow-auto h-full lg:overflow-hidden space-y-4">
        <div className="space-y-2 h-fit">
          <EditTaskName />
          <EditDescription />
        </div>
        <div className="space-y-2 h-fit text-sm">
          <EditList />
          <EditDueDate />
          <EditTags />
        </div>
        <EditSubtasks />
      </div>
      <BottomButtons />
    </div>
  );
};

export default RightBody;
