import React, { useContext } from "react";
import { LoginContext } from "../page";

const InputFields = () => {

    const {setEmail,setPassword} = useContext(LoginContext)

  return (
    <div>
      {/* EMAIL */}
      <label className="block text-sm">
        <span className="block text-sm">Email</span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="LoginPageInput"
          type="email"
          required
        />
      </label>

      {/* PASSWORD */}
      <label className="block text-sm">
        <span className="block text-sm">Password</span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="LoginPageInput"
          type="password"
          required
        />
      </label>
    </div>
  );
};

export default InputFields;
