export const actionTypes = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
};

const login = (data) => ({
  type: actionTypes.LOGIN,
  data,
});

const loginSuccess = (accessToken) => ({
  type: actionTypes.LOGIN_SUCCESS,
  accessToken,
});

const loginFailure = () => ({
  type: actionTypes.LOGIN_FAILURE,
});

export { login, loginSuccess, loginFailure };
