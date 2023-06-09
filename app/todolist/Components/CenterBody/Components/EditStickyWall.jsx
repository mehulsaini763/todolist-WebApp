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
    "bg-red-300",
    "bg-orange-300",
    "bg-yellow-300",
    "bg-lime-300",
    "bg-green-300",
    "bg-emerald-300",
    "bg-teal-300",
    "bg-blue-300",
    "bg-purple-300",
    "bg-fuchsia-300",
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
    if (heading==""&&text == "") {
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
        <div className="absolute inset-0 bg-neutral-500/50 z-20">
          <div className="flex items-center h-full p-2">
            <div
              className={`${colorId} rounded-md max-w-[600px] mx-auto aspect-square rounded-md w-full`}
            >
              <div className="flex justify-between bg-neutral-200 px-4 py-2 gap-4 rounded-t-md">
                <div>
                  <DocumentIcon onClick={editStickyWall} className="w-5 h-5" />
                </div>
                <div>
                  <TrashIcon
                    onClick={() => deleteStickyWall(documentEdit.stickyWallId)}
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex mx-4 gap-2 grow overflow-auto">
                  {colors.map((color) => (
                    <div
                      onClick={() => setColorId(color)}
                      className={`${color} p-2.5 rounded-md`}
                    ></div>
                  ))}
                </div>

                <div>
                  <XMarkIcon
                    onClick={() => props.toggleState(false)}
                    className="w-6 h-6"
                  />
                </div>
              </div>
              <div className="p-2 flex gap-2 flex-col h-full">
                <input
                  type="text"
                  className={`${colorId} text-2xl md:text-4xl`}
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
                <textarea
                  className={`w-full h-full leading-snug ${colorId} resize-none focus:outline-none`}
                  value={text!=""?text:"text..."}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditStickyWall;
