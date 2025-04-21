import React, { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { userData } from "../../lib/dummyData";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  // const user = true;

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="./logo.png" alt="logo" />
          <span>HomeTrail</span>
        </a>
        <a href="/">Home</a>
        {/* <a href="/">Explore</a> */}
        <Link to="/list">Explore</Link>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <Link to="/profile" className="profImg">
              <img src={currentUser.avatar || userData.img} alt="User image" />
            </Link>
            <span className="profUserName">{currentUser.username}</span>
            <Link to="/profile" className="profBtn">
              {number > 0 && <div className="notification-dot">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign In</a>
            <a href="/register" className="signup">
              Sign Up
            </a>
          </>
        )}

        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="menu"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          {/* <a href="/">Explore</a> */}
          <Link to="/list">Explore</Link>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          {/* <a href="/">Sign in</a>
          <a href="/">SIgn up</a> */}
          {currentUser ? (
            <Link to="/profile" className="profBtn">
              {number > 0 && <div className="notification-dot">{number}</div>}
              <span>Profile</span>
            </Link>
        ) : (
          <>
            <a href="/login">Sign In</a>
            <a href="/register" className="signup">
              Sign Up
            </a>
          </>
        )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
