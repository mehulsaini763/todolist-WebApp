import React, { useContext, useRef, useState } from "react";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { AppContext } from "../../../page";
import { useToggle } from "@/app/todolist/Hooks/useToggle";

const MenuHeader = () => {
  const {
    documentsToShow,
    setMenuState,
    setDocumentEdit,
    setSidebarState,
    setSelectedItem,
  } = useContext(AppContext);
  const [value, setValue] = useState("");
  const [state, toggleState] = useToggle();
  const inputRef = useRef();

  const setTask = async (document) => {
    setSelectedItem({ category: "AllTasks" });
    await setDocumentEdit(document);
    await setSidebarState(false);
    await setSidebarState(true);
    window.innerWidth>1024&& inputRef.current.value == "";
    setValue("");
    // setMenuState(false);
    toggleState(false);
  };

  return (
    <>
      <div className="flex items-center">
        <h2 className="H2 text-left w-full">.todolist</h2>
        <Bars3Icon
          onClick={() => setMenuState(false)}
          className="hidden lg:block w-6 h-6 dark:text-white"
        />
        <XMarkIcon
          onClick={() => setMenuState(false)}
          className="lg:hidden w-6 h-6 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-1 ">
        <div className="MenuInput px-2">
          <MagnifyingGlassIcon className="Icon h-6 w-6 dark:text-white" />
          <input
            ref={inputRef}
            type="text"
            className="bg-neutral-100 dark:bg-neutral-900 dark:text-white"
            onFocus={() => toggleState(true)}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
          />
        </div>
        <div>
          {state && (
            <div className="absolute bg-neutral-50 rounded-md inset-x-0 mx-4 border dark:bg-neutral-950">
              {documentsToShow.map((document) => {
                if (value.length > 0) {
                  return (
                    document.taskName.match(value) && (
                      <div
                        className="m-2 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 dark:text-white"
                        onClick={() => {
                          setTask(document);
                          window.innerWidth < 1024 && setMenuState(false);
                        }}
                      >
                        {document.taskName}
                      </div>
                    )
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuHeader;
