"use client";
import { React, useState } from "react";
import "./page.css";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = async () => {
    name == ""
      ? alert("Name cannot be Empty")
      : email == ""
      ? alert("Email cannot be Empty")
      : password == "" && alert("password cannot be Empty");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Email already in use");
    }
    login();
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      checkUser();
      router.push("/todolist")
    } catch (err) {
      console.log(err);
    }
  };

  const checkUser = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      userName: name,
      photoURL: auth.currentUser.photoURL,
    });
  };
  return (
    <div className="h-screen grid content-center bg-neutral-200 sm:bg-white">
      <div className="RegisterPageBody">
        <h1 className="text-left text-2xl pb-2 font-bold">
          ToDoList | REGISTER
        </h1>
        <label className="block text-sm">
          <span className="block text-sm">Full Name</span>
          <input
            onChange={(e) => setName(e.target.value)}
            className="RegisterPageInput"
            type="text"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="block text-sm">Email</span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="RegisterPageInput"
            type="text"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="block text-sm">Password</span>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="RegisterPageInput"
            type="password"
            required
          />
        </label>
        <button className="RegisterPageButton" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
};

export default page;
