import "./LeftBody.css";
import { createContext, useContext } from "react";
// import { AppContext } from "../../page";
import MenuHeader from "./Components/MenuHeader";
import Tasks from "./Components/Tasks";
import Lists from "./Components/Lists";
import Tags from "./Components/Tags";
import MenuButtons from "./Components/MenuButtons"

export const MenuContext = createContext();

const LeftBody = () => {
  // const { menuState } = useContext(AppContext);

  return (
    <div className="MenuBody">
      <MenuHeader />
      <Tasks />
      <hr className="MenuBreakLine" />
      <Lists />
      <hr className="MenuBreakLine" />
      <Tags />
      <MenuButtons />
    </div>
  );
};

export default LeftBody;
