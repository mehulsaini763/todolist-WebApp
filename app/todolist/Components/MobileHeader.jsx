import React, { useContext } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { AppContext } from "../page";

const MobileHeader = () => {
    const {menuState, setMenuState} = useContext(AppContext)
  return (
    <div className="MobileHeader lg:hidden">
      <Bars3Icon
        onClick={() => setMenuState(!menuState)}
        className="absolute mx-2 w-6 h-6"
      />
      <p className="grow text-2xl font-black text-black">.todolist</p>
    </div>
  );
};

export default MobileHeader;
