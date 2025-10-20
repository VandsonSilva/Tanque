import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexto/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  role?: "ADMIN" | "USER";
}

export const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;

  return <>{children}</>;
};
