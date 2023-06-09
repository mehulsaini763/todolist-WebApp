import React, { useContext, useState } from "react";
import { PlusIcon, XMarkIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { useToggle } from "../../../Hooks/useToggle";
import { auth, db } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";
import { AppContext } from "../../../page";

const AddStickyWall = () => {
  const { getStickyWalls } = useContext(AppContext);
  const [state, toggleState] = useToggle();
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [colorId, setColorId] = useState("bg-neutral-100");
  var temp = new Date();
  var date =
    temp.getDate() +
    " " +
    temp.getHours() +
    ":" +
    temp.getMinutes() +
    ":" +
    temp.getSeconds();
    
  // CREATE STICKY WALL
  const createStickyWall = async (e) => {
    if (text != "" || heading != "") {
      e.target.value = "";
      toggleState(false);
      await setDoc(
        doc(db, "users", auth.currentUser.uid, "stickyWalls", date),
        {
          category: "StickyWalls",
          heading: heading,
          text: text,
          colorId: colorId,
        }
      );
      setHeading("");
      setText("");
      setColorId("bg-neutral-100");
      getStickyWalls();
    } else {
      toggleState(false);
      alert("Empty Note Discarded");
    }
  };

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
  return (
    <>
      {/* ADD STICKY WALL */}
      <div onClick={toggleState} className="AddStickyWall">
        <PlusIcon className="m-2 w-6 h-6 md:h-10 md:w-10" />
      </div>
      {state && (
        <div className="absolute inset-0 bg-neutral-500/50 z-20">
          <div className="flex items-center h-full p-2">
            <div
              className={`${colorId} rounded-md max-w-[600px] mx-auto aspect-square w-full`}
            >
              <div className="flex justify-between bg-neutral-200 px-4 py-2 rounded-t-md">
                <div>
                  <DocumentIcon
                    onClick={createStickyWall}
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex mx-4 gap-2 overflow-auto">
                  {colors.map((color) => (
                    <div
                      onClick={() => setColorId(color)}
                      className={`${color} p-2.5 rounded-md`}
                    ></div>
                  ))}
                </div>

                <div>
                  <XMarkIcon onClick={toggleState} className="w-6 h-6" />
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2 h-full">
                <input
                  type="text"
                  className={`${colorId} text-2xl md:text-4xl text-black`}
                  placeholder="Title.."
                  onChange={(e) => setHeading(e.target.value)}
                />
                <textarea
                  className={`${colorId} w-full h-full leading-snug resize-none focus:outline-none text-black`}
                  placeholder="text.."
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

export default AddStickyWall;
