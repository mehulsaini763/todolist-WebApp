import { useContext } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginContext } from "../page";


const Buttons = () => {

    const {email,password} = useContext(LoginContext);
    const router = useRouter()

    const login = async () => {
      try{
        await signInWithEmailAndPassword(auth,email,password);
        router.push("/todolist")
      } catch(err){
        alert("Wrong Username or Password")
      }
    }


  return (
    <div className="flex flex-col space-y-2">
      <button onClick={login} className="LoginPageButton bg-neutral-700 text-white font-semibold">
        Login
      </button>
      <button
        onClick={()=>router.push("/Register")}
        className="LoginPageButton text-neutral-700 font-semibold"
      >
        Register
      </button>
    </div>
  );
};

export default Buttons;
