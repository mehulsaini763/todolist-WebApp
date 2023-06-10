import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../page";
import { TrashIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { auth, db } from "@/app/firebase";
import { doc, deleteDoc, setDoc } from "firebase/firestore";

const EditStickyWall = (props) => {
  const { documentEdit, setDocumentEdit, getStickyWalls } =
    useContext(AppContext);
  const [heading, setHeading] = useState(documentEdit.heading);
  const [text, setText] = useState(documentEdit.text);
  const [colorId, setColorId] = useState(documentEdit.colorId);
  const colors = [
    "bg-red-200",
    "bg-orange-200",
    "bg-yellow-200",
    "bg-lime-200",
    "bg-green-200",
    "bg-emerald-200",
    "bg-teal-200",
    "bg-blue-200",
    "bg-purple-200",
    "bg-fuchsia-200",
  ];

  useEffect(() => {
    setDocumentEdit({
      ...documentEdit,
      heading: heading,
      text: text,
      colorId: colorId,
    });
  }, [heading, text, colorId]);

  //SAVE STICKY WALL
  const editStickyWall = async () => {
    if (heading == "" && text == "") {
      alert("Both Fields cannot be empty");
      return;
    } else {
      await setDoc(
        doc(
          db,
          "users",
          auth.currentUser.uid,
          "stickyWalls",
          documentEdit.stickyWallId
        ),
        documentEdit
      );
      props.toggleState(false);
      getStickyWalls();
    }
  };

  // DELETE LIST
  const deleteStickyWall = async (id) => {
    await deleteDoc(doc(db, "users", auth.currentUser.uid, "stickyWalls", id));
    props.toggleState(false);
    getStickyWalls();
  };

  return (
    <>
      {props.state && (
        <div className="absolute inset-0 grid place-content-center bg-neutral-500/50 z-20">
          <div
            className={`${colorId} aspect-square rounded-md overflow-hidden`}
          >
            <div className="flex justify-between bg-neutral-200 px-4 py-2 gap-4 dark:bg-neutral-800">
              <div className="flex gap-2">
                {colors.map((color) => (
                  <div
                    onClick={() => setColorId(color)}
                    className={`${color} aspect-square w-5 h-5 rounded-full border-2 border-neutral-300 dark:border-neutral-700`}
                  ></div>
                ))}
              </div>
              <div className="flex gap-2">
                <DocumentIcon onClick={editStickyWall} className="w-5 h-5 dark:text-white" />

                <TrashIcon
                  onClick={() => deleteStickyWall(documentEdit.stickyWallId)}
                  className="w-5 h-5 dark:text-white"
                />

                <XMarkIcon
                  onClick={() => props.toggleState(false)}
                  className="w-6 h-6 dark:text-white"
                />
              </div>
            </div>
            <div className="p-4 flex gap-2 flex-col h-full">
              <input
                type="text"
                className={`${colorId} text-2xl md:text-4xl`}
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
              <textarea
                className={`w-full h-full leading-snug ${colorId} resize-none focus:outline-none`}
                value={text != "" ? text : "text..."}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditStickyWall;
