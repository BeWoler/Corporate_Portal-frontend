import { useContext } from "react";
import { Context } from "../index";
import { Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes/routes";

const AppRouter = () => {
  const { store } = useContext(Context);
  return store.isAuth ? (
    <Switch>
      {PrivateRoutes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Redirect to="/private" />
    </Switch>
  ) : (
    <Switch>
      {PublicRoutes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Redirect to="/login" />
    </Switch>
  );
};

export default AppRouter;
