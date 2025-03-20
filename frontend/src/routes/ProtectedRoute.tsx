import React from 'react';
import { Navigate } from 'react-router-dom';
import useAppSelector from '../store/hooks/useSelector';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: Array<"user" | "admin" | "guest">;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.user);

  const isAuthorized = (): boolean => {
    if (!isAuthenticated) return false;

    // Allow access if no specific roles are required
    if (!requiredRoles || requiredRoles.length === 0) return true;

    // Allow access if user's role is included in requiredRoles
    return requiredRoles.includes(role as "user" | "admin" | "guest");
  };

  return isAuthorized() ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
