import { auth, db, gProvider, fProvider } from "@/app/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SignInProviders = () => {
  const router = useRouter();

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, gProvider);
    await checkUser();
    router.push("/todolist")
  };

  const loginWithFacebook = async () => {
    await signInWithPopup(auth, fProvider);
    await checkUser();
    router.push("/todolist")
  };

  const checkUser = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    } else {
      console.log("doesnt exist")
      console.log(auth)
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        userName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      });
      checkUser();
    }
  };


  return (
    <div className="flex flex-col space-y-2">
      {/* SIGNIN PROVIDER */}
      <button
        onClick={loginWithGoogle}
        className="LoginPageButton flex items-center justify-center"
      >
        <img className="h-4" src="\Google__G__Logo.png" />
        <h2 className="px-2">Continue with Google</h2>
      </button>
      <button onClick={loginWithFacebook} className="LoginPageButton flex items-center justify-center">
        <img className="h-5" src="\Facebook_logo_PNG12.png" />
        <h2>Continue with Facebook</h2>
      </button>
    </div>
  );
};

export default SignInProviders;
