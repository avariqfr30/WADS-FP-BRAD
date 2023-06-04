import './App.css';
import { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase.js';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';
import Sidebar from './components/Sidebar';
import Login from './Login/Login';
import Items from './components/Items/Items';
import Vendors from './components/Vendors/Vendors';
import Customers from './components/Customers/Customers';
import Sales from './components/Sales/Sales';
import Purchases from './components/Purchases/Purchases';

export const SidebarButtonContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebarButton, setSidebarButton] = useState('Dashboard');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <SidebarButtonContext.Provider value={[sidebarButton, setSidebarButton]}>
      <div className="App">
        {loggedIn ? (
          (sidebarButton === 'Dashboard') ? (
            <div className="AppGlass">
              <Sidebar />
              <MainDash />
              <RightSide />
            </div>
          ) : (
            sidebarButton === 'Orders' ? (
              <div className="AppGlass2">
                <Sidebar />
                <Sales />
                <Purchases />
              </div>
            ) : (
              sidebarButton === 'Clients' ? (
                <div className="AppGlass2">
                  <Sidebar />
                  <Vendors />
                  <Customers />
                </div>
              ) : (
                sidebarButton === 'Products' ? (
                  <div className="AppGlass2">
                    <Sidebar />
                    <Items />
                  </div>
                ) : null
              )
            )
          )
        ) : (
          <Login />
        )}
      </div>
    </SidebarButtonContext.Provider>
  );
}

export default App;