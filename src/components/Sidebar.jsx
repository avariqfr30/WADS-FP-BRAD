import React, { useState, useContext, useEffect } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { SidebarButtonContext } from "../App";

const Sidebar = () => {
  const [selected, setSelected] = useContext(SidebarButtonContext);
  const [expanded, setExpanded] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email); // Assuming the email is used for identification
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = () => {
    signOut(auth);
  };

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            B<span>R</span>AD
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={
                  selected === item.heading ? "menuItem active" : "menuItem"
                }
                key={index}
                onClick={() => setSelected(item.heading)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}

          {/* Who's logged in? */}
          {currentUser && (
            <div className="currentUser">
              <span>Who's logged in?</span>
              <span className="currentUserEmail">{currentUser}</span>
            </div>
          )}

          {/* signoutIcon */}
          <div className="menuItem logoutButton">
            <UilSignOutAlt onClick={logout} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;