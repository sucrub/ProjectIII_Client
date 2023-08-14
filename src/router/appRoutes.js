import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import RoleManagement from "../pages/RoleManagement";
import Home from "../pages/Home";
import ResetPassword from "../pages/ResetPassword";
import routes from "../constants/route";

const allRoutes = [
  {
    path: routes.LOGIN,
    component: Login,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.REGISTER,
    component: Register,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.FORGOT_PASSWORD,
    component: ForgotPassword,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.ROLE_MANAGEMENT,
    component: RoleManagement,
    exact: true,
    restricted: true,
    isPrivate: true,
  },
  {
    path: routes.HOME,
    component: Home,
    exact: true,
    restricted: true,
    isPrivate: true,
  },
  {
    path: routes.RESET_PASSWORD,
    component: ResetPassword,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
];

export default allRoutes;
