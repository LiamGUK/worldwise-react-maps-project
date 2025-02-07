/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      // Will check if the user is authenticated from reducer hook, if not will always redirect to homepage
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  // Just return children prop as Component will wrap on all JSX elements in App and won't need to return any JSX
  return isAuthenticated ? children : null; // Will only return JSX elements if isAuthenticated is true (won't load AppLayout component in App.jsx if false) - ensures only loads homepage if user is logged in
}

export default ProtectedRoute;
