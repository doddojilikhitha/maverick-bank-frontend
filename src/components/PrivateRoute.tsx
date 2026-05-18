import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<Props> = ({
  children,
  allowedRoles,
}) => {
  const { isLoggedIn, user } = useAuth();

  // Wait until user loads from localStorage
  if (
    user === null &&
    localStorage.getItem("token")
  ) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Role check
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role || "")
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;