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
    temp.getMonth() +
    " " +
    temp.getFullYear() +
    " " +
    temp.getHours() +
    ":" +
    temp.getMinutes() +
    ":" +
    temp.getSeconds();

  // CREATE STICKY WALL
  const createStickyWall = async (e) => {
    console.log(date);
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
  return (
    <>
      {/* ADD STICKY WALL */}
      <div onClick={toggleState} className="AddStickyWall">
        <PlusIcon className="m-2 w-6 h-6 dark:text-white" />
      </div>

      {state && (
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
                <DocumentIcon
                  onClick={createStickyWall}
                  className="w-5 h-5 dark:text-white"
                />

                <XMarkIcon
                  onClick={toggleState}
                  className="w-6 h-6 dark:text-white"
                />
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2 h-full">
              <input
                type="text"
                className={`${colorId} text-2xl md:text-4xl text-black `}
                placeholder="Title.."
                onChange={(e) => setHeading(e.target.value)}
              />
              <textarea
                className={`${colorId} w-full h-full leading-snug resize-none focus:outline-none text-black `}
                placeholder="text.."
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStickyWall;
