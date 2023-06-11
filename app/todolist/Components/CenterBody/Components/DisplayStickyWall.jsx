import React, { useContext } from "react";
import { AppContext } from "../../../page";
import { useToggle } from "../../../Hooks/useToggle";
import AddStickyWall from "./AddStickyWall";
import EditStickyWall from "./EditStickyWall";

const DisplayStickyWall = () => {
  const { stickyWallsToShow, setDocumentEdit, selectedItem } =
    useContext(AppContext);
  const [state, toggleState] = useToggle();

  return (
    <>
      <h1 className="font-bold text-4xl lg:text-6xl">
        {selectedItem.category}
      </h1>
      <hr className="border-none lg:my-1" />
      <div className="relative columns-2 sm:columns-3 lg:columns-4 rounded-md p-4 border border-neutral-300 h-full dark:border-neutral-700">
       <AddStickyWall />
        {/* SHOW STICKY WALL */}
        {stickyWallsToShow.map((document) => (
          <div
            key={document.documentId}
            onClick={() => {
              toggleState(true);
              setDocumentEdit(document);
            }}
            className={`${document.colorId} rounded-md  max-h-60 p-2 break-inside-avoid mb-4`}
          >
            <div className="max-h-56 overflow-hidden">
              <h2 className="font-semibold text-xl text-neutral-800">
                {document.heading}
              </h2>

              <div className="text-neutral-800 leading-tight">{document.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT STICKY WALL */}
      {state && <EditStickyWall state={state} toggleState={toggleState} />}
    </>
  );
};

export default DisplayStickyWall;
