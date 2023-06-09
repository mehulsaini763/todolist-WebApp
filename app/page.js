import Link from "next/link";
export default function Home() {
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
