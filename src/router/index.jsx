import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import appRoutes from "./appRoutes";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Layout from "../containers/Layout";
import ROUTE from "../constants/route";

const PrivateApp = () => {
  const privateRoutes = appRoutes.filter((route) => route.isPrivate);
  return (
    <Layout>
      <Switch>
        {privateRoutes.map((privateRoute) => (
          <PrivateRoute
            path={privateRoute.path}
            component={privateRoute.component}
            exact
            key={privateRoute.path}
          />
        ))}
      </Switch>
    </Layout>
  );
};

const AppRouter = () => {
  const publicRoutes = appRoutes.filter((route) => !route.isPrivate);
  return (
    <BrowserRouter>
      <Switch>
        {publicRoutes.map((publicRoute) => (
          <PublicRoute
            exact
            path={publicRoute.path}
            component={publicRoute.component}
            restricted={publicRoute.restricted}
            key={publicRoute.path}
          />
        ))}
        <PrivateRoute component={PrivateApp} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
