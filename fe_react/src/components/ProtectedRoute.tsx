import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect guest to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role authorization
  if (allowedRoles && role) {
    const isAuthorized = allowedRoles.some(r => r.toLowerCase() === role.toLowerCase());
    
    if (!isAuthorized) {
      // Redirect to default page based on role if not authorized for this specific route
      const defaultPath = role.toLowerCase() === 'user' ? '/search' : '/home';
      return <Navigate to={defaultPath} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
