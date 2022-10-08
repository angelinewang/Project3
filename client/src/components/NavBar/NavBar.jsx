import React from "react";
import { Link, NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./NavBar.css";

const NavBar = () => {
  const { handleLogout, user } = useUser();

  let nav = user ? (
    <div>
      <NavLink to="/protected" className="NavBar-link">
        Protected Route
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <NavLink to="" className="NavBar-link" onClick={handleLogout}>
        LOG OUT
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to={`/profile/${user._id}`}>WELCOME, {user.name}</Link>
      {/* <NavLink to="/profile" className="NavBar-link">
        WELCOME, {user.name}
      </NavLink> */}
      {/* <span className="NavBar-welcome">WELCOME, {user.name}</span> */}
    </div>
  ) : (
    <div>
      <NavLink to="/login" className="NavBar-link">
        LOG IN
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <NavLink to="/signup" className="NavBar-link">
        SIGN UP
      </NavLink>
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
