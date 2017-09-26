const initialState = {
  loading: false,
  authenticated: false,
  error: null
};

import * as actions from './auth-actions'

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SIGN_UP_REQUEST:
    case actions.SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case actions.SIGN_UP_SUCCESS:
    case actions.SIGN_IN_SUCCESS:
      return { ...state, loading: false, authenticated: true };
    case actions.SIGN_UP_FAILURE:
    case actions.SIGN_IN_FAILURE:
      return { ...state, loading: false, authenticated: false, error: action.payload };
    case actions.SIGN_OUT:
      return {...state, authenticated: false };
    default:
      return state
  }
}