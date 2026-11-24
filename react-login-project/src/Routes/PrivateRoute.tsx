import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactElement;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  return sessionStorage.getItem("token") ? children : <Navigate to="/" />;
}