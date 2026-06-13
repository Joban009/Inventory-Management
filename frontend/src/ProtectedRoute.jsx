import { Navigate } from "react-router-dom";

const isAuthenticated = () =>
  localStorage.getItem("isLoggedIn") === "true" &&
  Boolean(localStorage.getItem("user"));

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
