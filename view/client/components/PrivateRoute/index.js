import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { useContext, useState } from "react";
// import { useAuth } from "../../../../hooks/useAuth";

const PrivateRouter = ({ children, path}) => {
  const { isLoggedIn, isPrivate } = useContext(AuthContext);

  if (isPrivate && !isLoggedIn) {
    return <Navigate to="/login" state={state} />;
  }
  return children;
};

export default PrivateRouter;
