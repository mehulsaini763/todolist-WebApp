import { AppContext } from "@/app/todolist/page";
import { UserCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState, useRef } from "react";
import { db, storage } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const EditProfile = (props) => {
  const { userInfo, getUserInfo } = useContext(AppContext);
  const [editProfile, setEditProfile] = useState(userInfo);
  const inputRef = useRef(null);
  const imageRef = ref(storage, `${userInfo.uid}`);

  const saveChanges = async () => {
    if (editProfile.userName === "") {
      alert("username cannot be Empty");
      return;
    } else {
      await setDoc(doc(db, "users", userInfo.uid), editProfile);
      props.toggleState();
      getUserInfo();
    }
  };

  const setProfileImage = (e) => {
    if (editProfile.photoURL != "") deleteObject(imageRef);
    uploadBytes(imageRef, e.target.files[0]).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setEditProfile({ ...editProfile, photoURL: url });
      });
    });
    e.target.files==null;
  };

  return (
    <>
      <div className="absolute inset-0 bg-neutral-100 p-4 flex flex-col gap-2">
        <div className="text-center relative">
          {editProfile.photoURL != "" ? (
            <img
              className="Icon h-28 w-28 mx-auto rounded-full object-cover"
              src={editProfile.photoURL}
            />
          ) : (
            <UserCircleIcon className="Icon h-28 w-28 mx-auto" />
          )}
          <ArrowLeftIcon
            className="Icon h-6 w-6  absolute top-0 right-0"
            onClick={props.toggleState}
          />
        </div>
        <div className="text-center">
          <input
            className="hidden"
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e)}
          />
          <button
            onClick={() => inputRef.current.click()}
            className="SettingButton"
          >
            Change
          </button>
          <button
            className="SettingButton"
            onClick={() => setEditProfile({ ...editProfile, photoURL: "" })}
          >
            Remove
          </button>
        </div>
        <hr className="border-neutral-400" />
        <label className="block">
          <span className="text-sm">Name</span>
          <input
            className="EditTaskName"
            type="text"
            onChange={(e) =>
              setEditProfile({ ...editProfile, userName: e.target.value })
            }
            value={editProfile.userName}
          />
        </label>
        <label className="block">
          <span className="text-sm">Email</span>
          <input
          disabled
            className="EditTaskName disabled:bg-neutral-200"
            type="email"
            onChange={(e) =>
              setEditProfile({ ...editProfile, email: e.target.value })
            }
            value={editProfile.email}
          />
        </label>
        <label className="block">
          <span className="text-sm">Phone No</span>
          <input
            className="EditTaskName"
            type="number"
            onChange={(e) =>
              setEditProfile({ ...editProfile, phoneNo: e.target.value })
            }
            value={editProfile.phoneNo}
          />
        </label>
        <div className="h-full"></div>
        <button
          className="bg-neutral-800 font-semibold text-white rounded-md p-2"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default EditProfile;
