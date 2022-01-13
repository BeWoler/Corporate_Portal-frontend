import { useContext } from "react";
import { Context } from "../index";
import StatusPage from "../Pages/404/StatusPage";

const RequireAdminAuth = ({ children }: { children: JSX.Element }) => {
  const { store } = useContext(Context);

  if (!store.isAdmin) {
    return <StatusPage />;
  }
  return children;
};

export default RequireAdminAuth;
