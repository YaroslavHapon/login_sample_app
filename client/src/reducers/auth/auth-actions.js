export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const SIGN_OUT = 'SIGN_OUT';

export function signUpRequest ({ email, password }) {
  return {
    type: SIGN_UP_REQUEST,
    payload: {
      email,
      password
    }
  }
}

export function loginRequest ({ email, password }) {
  return {
    type: SIGN_IN_REQUEST,
    payload: {
      email,
      password
    }
  }
}

export function signOut () {
  return {
    type: SIGN_OUT
  }
}