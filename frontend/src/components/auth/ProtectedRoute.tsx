import { useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";

type TProtectedRouteProps = {
  children: React.ReactNode;
};
const ProtectedRoute = ({ children }: TProtectedRouteProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (!accessToken) return <Navigate to={"/login?message=login_required"} />;

  return <>{children}</>;
};

export default ProtectedRoute;
