import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../__style__/logoutButton.css';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="btn btn-custom mx-auto mt-3 btn-pad" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export default LogoutButton;