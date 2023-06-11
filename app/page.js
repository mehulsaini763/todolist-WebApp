"use client"
import Link from "next/link";
import { auth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();

  // AUTHENTICATION CHECK

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in.
       router.push("/todolist")
      }
    });
  }, []);
  return (
    <main>
      <div className="MainPageBody">
        <div>
          <h1 className="MainPageHeading">.todolist</h1>
        </div>
        <div className="space-y-6 text-center">
          <p className="MainPageDescription">
            Don't let your tasks go unorganized, make a to-do list today!
          </p>
          <button>
            <Link  className="GetStartedButton" href="/Login">Get Started</Link>
          </button>
        </div>
        <div></div>
      </div>
    </main>
  );
}
