import React, { useContext } from "react";
import Link from "next/link";
import {
  UserCircleIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { AppContext } from "../../page";

const LeftBodySlim = () => {
  const { setMenuState } = useContext(AppContext);
  const router = useRouter();

  const logOut = async () => {
    await signOut(auth);
    router.push("/");
  };
  return (
    <div className="hidden lg:flex flex-col justify-between h-full p-4 rounded-md bg-neutral-100">
      <div>
        <Bars3Icon
          onClick={() => setMenuState(true)}
          className="Icon w-6 h-6"
        />
      </div>
      <div className="space-y-3">
        {auth.currentUser && 
          
            auth.currentUser.photoURL ? (
              <img
                className="h-6 w-6 rounded-full"
                src={auth.currentUser.photoURL}
              />
            ) : (
              <UserCircleIcon className="Icon h-6 w-6" />
            )
          
        }
        <div className="MenuSlimItems">
          <AdjustmentsHorizontalIcon className="Icon h-6 w-6" />
        </div>

        {auth.currentUser == null ? (
          <Link href="/Login">
            <ArrowRightOnRectangleIcon className="Icon h-6 w-6" />
          </Link>
        ) : (
          <div onClick={logOut}>
            <ArrowLeftOnRectangleIcon className="Icon h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftBodySlim;
