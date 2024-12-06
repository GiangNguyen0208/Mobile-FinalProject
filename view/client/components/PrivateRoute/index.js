import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { useContext } from "react";
// import { useAuth } from "../../../../hooks/useAuth";

const PrivateRouter = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
