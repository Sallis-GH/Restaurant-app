import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button className="btn btn-cart btn-lg d-grid col-md-3 col-5 mb-4 mb-md-2 mx-auto" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;