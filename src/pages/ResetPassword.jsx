import React from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import ResetPasswordContainer from "../containers/ResetPassword";
import NotFound from "../containers/NotFound";

const ResetPassword = () => {
  const { token } = useParams();
  if (token === getCookie("forgotPasswordToken"))
    return <ResetPasswordContainer token={token} />;
  return <NotFound />;
};

export default ResetPassword;
