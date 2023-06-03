import './App.css'
import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase.js";
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';
import Sidebar from './components/Sidebar';
import Login from "./Login/Login";
import Items from "./components/Items/Items";
import Vendors from './components/Vendors/Vendors';
import Customers from "./components/Customers/Customers";
import Sales from "./components/Sales/Sales";
import Purchases from "./components/Purchases/Purchases";

export const SidebarButtonContext = createContext();

function App() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [SidebarButton, setSidebarButton] = useState("Dashboard");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, [])
  return (
    <SidebarButtonContext.Provider value={[SidebarButton, setSidebarButton]}>
      <div className="App">
        {LoggedIn ? (
          <div className="AppGlass">
          <Sidebar/>
          { (SidebarButton === "Dashboard") ? (
            <>
              <MainDash />
              <RightSide />
            </>
          ) : (SidebarButton === "Orders") ? (
            <>
              <Sales />
              <Purchases />
            </>
          ) : (SidebarButton === "Clients") ? (
            <>
              <Vendors/>
              <Customers/>
            </>
          ) : (SidebarButton === "Products") ? (
            <Items/>
          ) : (SidebarButton === "Analytics") ? (
            <></>
          ) : (
            <></>
          )}
        </div>
        ) : (
          <Login />
        )}
      </div>
    </SidebarButtonContext.Provider>
    
  );
}

export default App;
