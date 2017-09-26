import { put, call, take } from 'redux-saga/effects'
import Api from './../service/Api'
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './../reducers/auth/auth-actions'

export function* registerSaga() {
  while (true){
    try {
      const { payload: { email, password }} = yield take(SIGN_UP_REQUEST);
      const { token }  = yield call(Api.signUp, { email, password });
      yield call(Api.setItem, 'token', token);
      yield put({ type: SIGN_UP_SUCCESS });
    } catch (error) {
      console.log(error);
      yield put({ type: SIGN_UP_FAILURE, payload: error });
      yield call(Api.removeItem, 'token');
    }
  }
}

export function* loginSaga() {
  while (true){
    try {
      const { payload: { email, password }} = yield take(SIGN_IN_REQUEST);
      const { token }  = yield call(Api.signIn, { email, password });
      yield call(Api.setItem, 'token', token);
      yield put({ type: SIGN_IN_SUCCESS });
    } catch (error) {
      yield put({ type: SIGN_IN_FAILURE, payload: error });
      yield call(Api.removeItem, 'token');
    }
  }
}

export function* signOut() {
  while (true) {
    yield take(SIGN_IN_REQUEST);
    yield call(Api.removeItem, 'token');
  }
}

