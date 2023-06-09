"use client";
import "./page.css";
import React, { useEffect, createContext, useState } from "react";
import { auth, db } from "@/app/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import MobileHeader from "./Components/MobileHeader";
import LeftBody from "./Components/LeftBody/LeftBody";
import LeftBodySlim from "./Components/LeftBody/LeftBodySlim";
import RightBody from "./Components/RightBody/RightBody";
import CenterBody from "./Components/CenterBody/CenterBody";

export const AppContext = createContext();

const page = () => {
  const router = useRouter();

  // AUTHENTICATION CHECK

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in.
        getUserInfo();
      } else {
        // User is signed out.
        router.push("/");
      }
    });
  }, []);

 

  // STORE ALL DATA
  const [userInfo, setUserInfo] = useState(null);
  const [documentsToShow, setDocuments] = useState([]);
  const [tagsToShow, setTags] = useState([]);
  const [stickyWallsToShow, setStickyWalls] = useState([]);
  const [selectedItem, setSelectedItem] = useState({ category: "AllTasks" });
  const [selectedTask, setSelectedTask] = useState(null);
  const [documentEdit, setDocumentEdit] = useState({});
  const [menuState, setMenuState] = useState(false);
  const [sidebarState, setSidebarState] = useState(false);

  useEffect(()=>{
    if(userInfo!==null){
      getDocuments();
      getTags();
      getStickyWalls();
  }
  },[userInfo])

  const getUserInfo = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    const tempData = docSnap.data();
        setUserInfo({ ...tempData, uid: auth.currentUser.uid });
  }
  // REFRESH DATABASE
  const getDocuments = async () => {
    const documents = [];
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userInfo.uid, "documents")
      );
      querySnapshot.forEach((doc) => {
        const tempDocument = doc.data();
        const document = { ...tempDocument, documentId: doc.id };
        documents.push(document);
      });
    } catch (err) {
      console.log(err);
    }
    setDocuments(documents);
  };

  // REFRESH TAGS DATABASE
  const getTags = async () => {
    const tags = [];
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userInfo.uid, "tags")
      );
      querySnapshot.forEach((doc) => {
        const tempTag = doc.data();
        const tag = { ...tempTag, tagId: doc.id };
        tags.push(tag);
      });
    } catch (err) {
      console.log(err);
    }
    setTags(tags);
  };

  // REFRESH STICKY WALL DATABASE
  const getStickyWalls = async () => {
    const stickyWalls = [];
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userInfo.uid, "stickyWalls")
      );
      querySnapshot.forEach((doc) => {
        const tempStickyWall = doc.data();
        const stickyWall = { ...tempStickyWall, stickyWallId: doc.id };
        stickyWalls.push(stickyWall);
      });
    } catch (err) {
      console.log(err);
    }
    stickyWalls.reverse();
    setStickyWalls(stickyWalls);
  };

  return (
    <AppContext.Provider
      value={{
        userInfo,
        getUserInfo,
        documentsToShow,
        getDocuments,
        tagsToShow,
        getTags,
        stickyWallsToShow,
        getStickyWalls,
        selectedItem,
        setSelectedItem,
        selectedTask,
        setSelectedTask,
        menuState,
        setMenuState,
        setSidebarState,
        documentEdit,
        setDocumentEdit,
      }}
    >
      <div className="h-screen flex flex-col lg:p-4 lg:flex-row lg:gap-4">
        <MobileHeader />
        {menuState ? <LeftBody /> : <LeftBodySlim />}
        <CenterBody />
        {sidebarState && <RightBody />}
      </div>
    </AppContext.Provider>
  );
};

export default page;
