"use client";
import React, { useContext } from "react";
import Link from "next/link";
import {
  UserCircleIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/todolist/page";
import { useToggle } from "@/app/todolist/Hooks/useToggle";
import Settings from "./Settings";

const MenuButtons = () => {
  const [state, toggleState] = useToggle();
  const { userInfo } = useContext(AppContext);
  const router = useRouter();

  const logOut = async () => {
    await signOut(auth);
    router.push("/");
  };
  return (
    <div>
      {userInfo !== null && (
        <div className="MenuButtons">
          {userInfo.photoURL != "" ? (
            <img className="h-6 w-6 rounded-full" src={userInfo.photoURL} />
          ) : (
            <UserCircleIcon className="Icon h-6 w-6" />
          )}
          <p>{userInfo.userName}</p>
        </div>
      )}
      <div className="MenuButtons" onClick={toggleState}>
        <AdjustmentsHorizontalIcon className="Icon h-6 w-6" />
        <p>Settings</p>
      </div>
      {state && <Settings toggleState={toggleState}/>}
      {auth.currentUser == null ? (
        <Link className="MenuButtons" href="/Login">
          <ArrowRightOnRectangleIcon className="Icon h-6 w-6" />
          <p>LogIn</p>
        </Link>
      ) : (
        <div className="MenuButtons" onClick={logOut}>
          <ArrowLeftOnRectangleIcon className="Icon h-6 w-6" />
          <p>LogOut</p>
        </div>
      )}
    </div>
  );
};

export default MenuButtons;
