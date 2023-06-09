"use client";
import "./page.css";
import React, { useState, createContext } from "react";
import Separator from "./Components/Separator";
import SignInProviders from "./Components/SignInProviders";
import Buttons from "./Components/Buttons";
import InputFields from "./Components/InputFields";
import TermsConditions from "./Components/TermsConditions";

export const LoginContext = createContext();

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LoginContext.Provider value={{ email, setEmail, password, setPassword }}>
      <div className="h-screen grid content-center bg-neutral-200 sm:bg-white">
        <div className="LoginPageBody">
          
          <h1 className="text-left text-2xl pb-2 font-bold">ToDoList | LOGIN</h1>
          <InputFields />
          <Buttons />
          <Separator />
          <SignInProviders />
          <TermsConditions />

        </div>
      </div>
    </LoginContext.Provider>
  );
};

export default page;
