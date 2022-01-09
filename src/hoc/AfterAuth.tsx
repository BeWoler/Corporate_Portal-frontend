import { Navigate, useLocation } from "react-router-dom";

const AfterAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  if (localStorage.getItem("token")) {
    return <Navigate to="/board" state={{ from: location.pathname }} />;
  }

  return children;
};

export default AfterAuth;
