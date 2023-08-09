import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.user.currentUser?.data?.isAdmin);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
