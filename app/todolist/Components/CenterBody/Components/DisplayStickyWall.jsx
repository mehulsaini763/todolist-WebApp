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
      <h1 className="text-4xl lg:text-6xl font-black ">
        {selectedItem.category}
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto p-4 border border-neutral-300 gap-4 rounded-md">
        <AddStickyWall />
        {/* SHOW STICKY WALL */}
        {stickyWallsToShow.map((document) => (
          <div key={document.documentId}
            onClick={() => {
              toggleState(true);
              setDocumentEdit(document);
            }}
            className={`${document.colorId} aspect-square rounded-md p-4`}
          >
            <div className="h-full">
              <h2 className="font-bold text-xl text-neutral-800 ">
                {document.heading}
              </h2>
              <p className="text-neutral-800 leading-tight">{document.text}</p>
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
