import { actionTypes } from "./actions";

export const initialState = {
  accessToken: null,
  isLoggingIn: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN: {
      return { ...state, isLoggingIn: true, accessToken: null };
    }

    case actionTypes.LOGIN_SUCCESS: {
      const { accessToken } = action;
      return { ...state, isLoggingIn: false, accessToken };
    }

    case actionTypes.LOGIN_FAILURE: {
      return { ...state, isLoggingIn: false, accessToken: null };
    }

    default:
      return state;
  }
}
