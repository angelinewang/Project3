import React from "react";
import { Link, NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./NavBar.css";

const NavBar = () => {
  const { handleLogout, user } = useUser();

  let nav = user ? (
    <div className="navBar-logged-in">

      <NavLink to="" className="navBar-logout" onClick={handleLogout}>
        Log out
      </NavLink>
      <Link to={`/profile/${user._id}`} className="user-name" >{user.name}</Link>
    </div>
  ) : (
    <div className="navbar-logged-out">
      <NavLink to="/login" className="navBar-login">
        Log in
      </NavLink>
      <NavLink to="/signup" className="navBar-signup">
        Sign up
      </NavLink>
    </div>
  );

  return( 
  <div className='navBar'>


  <h2> About</h2>


  <h1 className='blog'>Blog </h1>


    {nav}


    </div>
    )};

export default NavBar;
