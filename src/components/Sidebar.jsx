import React from "react";
import logo from "../images/Vector.png";
import "../components/css/Sidebar.css";

function Sidebar() {
  return (
    <div className="listitems">
      <img src={logo} alt="logo" srcset="" />
      <li id="selected">For You</li>
      <li>Top Tracks</li>
      <li>Favourites</li>
      <li>Recently Played</li>
    </div>
  );
}

export default Sidebar;
