import React from "react";
import { Route } from "react-router-dom";
import Layout from "../containers/Layout";

const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
