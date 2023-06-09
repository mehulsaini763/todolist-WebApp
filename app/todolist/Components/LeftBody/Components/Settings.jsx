import React, { useContext } from "react";
import { UserCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { AppContext } from "@/app/todolist/page";
import { useToggle } from "@/app/todolist/Hooks/useToggle";
import EditProfile from "./EditProfile";

const Settings = (props) => {
  const { userInfo } = useContext(AppContext);
  const [state, toggleState] = useToggle();

  return (
    <div className="absolute inset-0 flex flex-col bg-neutral-100 p-4 gap-2">
      <div className="text-center relative">
        {userInfo.photoURL != "" ? (
          <img
            className="Icon h-28 w-28 mx-auto rounded-full object-cover"
            src={userInfo.photoURL}
          />
        ) : (
          <UserCircleIcon className="Icon h-28 w-28 mx-auto" />
        )}
        <ArrowLeftIcon
          className="Icon h-6 w-6  absolute top-0 right-0"
          onClick={props.toggleState}
        />
        <p className="text-center font-bold text-xl">{userInfo.userName}</p>
      </div>
      
      <hr className="border-neutral-400" />

      <div className="py-1 px-2" onClick={toggleState}>
        Edit Profile
      </div>
      {state && <EditProfile toggleState={toggleState} />}
      <div className="py-1 px-2">Dark Mode</div>
    </div>
  );
};

export default Settings;
