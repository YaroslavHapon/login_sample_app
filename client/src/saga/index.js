import { all, fork } from 'redux-saga/effects'
import { registerSaga, loginSaga, signOut } from './../saga/auth-saga'

export function* rootSaga () {
  yield all([
    fork(registerSaga),
    fork(loginSaga),
    fork(signOut)
  ])
}