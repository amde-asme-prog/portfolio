import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // return user ? children : <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
