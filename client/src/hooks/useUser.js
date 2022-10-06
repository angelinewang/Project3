import React from "react";
import { UserContext } from "../context/UserContext";
import userService from "../utils/userService";

export default function useUser() {
  const [state, setState] = React.useContext(UserContext);

  const handleSignupOrLogin = () => {
    const freshUser = userService.getUser();
    setState((state) => ({ ...state, user: freshUser }));
  };

  const handleLogout = () => {
    userService.logout();
    setState({ ...state, user: null });
  };

  return {
    user: state.user,
    handleSignupOrLogin,
    handleLogout,
  };
}
