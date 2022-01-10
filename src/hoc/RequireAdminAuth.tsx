import { useContext } from "react";
import { Context } from "../index";

const RequireAdminAuth = ({ children }: { children: JSX.Element }) => {
  const { store } = useContext(Context);

  if (!store.isAdmin) {
    return (
      <div className="not__found">
        <span>404</span>
        <span>Not Found</span>
      </div>
    );
  }
  return children;
};

export default RequireAdminAuth;
