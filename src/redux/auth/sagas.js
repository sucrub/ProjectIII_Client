import { put, all, takeLatest } from "redux-saga/effects";
import apis from "../../apis";
import { setCookie } from "../../utils/cookie";
import { A_WEEK } from "../../constants";
import axiosClient from "../../apis/api";

import actions from "../actions";

function* loginSaga(data) {
  try {
    setCookie("accessToken", data.data.accessToken, A_WEEK);
    setCookie("refreshToken", data.data.refreshToken, A_WEEK);
    yield put(actions.auth.loginSuccess(data.data.accessToken));
  } catch (error) {
    yield put(actions.auth.loginFailure());
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.auth.actionTypes.LOGIN, loginSaga)]);
}
