import React, { useContext } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { AppContext } from "../page";

const MobileHeader = () => {
    const {menuState, setMenuState} = useContext(AppContext)
  return (
    <div className="MobileHeader lg:hidden">
      <Bars3Icon
        onClick={() => setMenuState(!menuState)}
        className="absolute mx-2 w-7 h-7 dark:text-white"
      />
      <p className="grow text-3xl font-bold text-black dark:text-white">.todolist</p>
    </div>
  );
};

export default MobileHeader;
