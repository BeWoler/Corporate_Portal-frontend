import { FC, useContext } from "react";
import { Context } from "../index";

const PrivateComponent: FC = () => {
  const { store } = useContext(Context);
  return <h2>{store.user.email}</h2>;
};

export default PrivateComponent;
