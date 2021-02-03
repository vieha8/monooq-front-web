import { handleActions } from 'redux-actions';
import {
  LOGIN_EMAIL,
  LOGIN_FACEBOOK,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILED,
  CHECK_LOGIN_FINISHED,
  INIT_SIGNUP,
  SIGNUP_EMAIL,
  SIGNUP_FACEBOOK,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  INIT_PASSWORD_RESET,
  PASSWORD_RESET,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  SET_USER,
  INIT_UNSUBSCRIBE,
  UNSUBSCRIBE,
  UNSUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_FAILED,
  CHECK_REDIRECT,
  CHECK_REDIRECT_END,
  FETCH_HAS_REQUESTED_SUCCESS,
} from '../actions/auth';

// Reducer
const initialState = {
  isLogin: false,
  isChecking: false,
  isRegistering: false,
  isResetTrying: false,
  isResetSuccess: false,
  isUnsubscribeTrying: false,
  isUnsubscribeSuccess: false,
  isUnsubscribeFailed: false,
  user: {},
  error: '',
  token: null,
};

const authReducer = handleActions(
  {
    [LOGIN_EMAIL]: state => ({
      ...state,
      isChecking: true,
    }),
    [LOGIN_FACEBOOK]: state => ({
      ...state,
      isChecking: true,
    }),
    [LOGIN_SUCCESS]: state => ({
      ...state,
      isLogin: true,
      isChecking: false,
    }),
    [LOGIN_FAILED]: (state, action) => ({
      ...state,
      error: action.payload,
      isChecking: false,
    }),
    [LOGOUT]: state => ({
      ...state,
      user: {},
      token: null,
      isLogin: false,
    }),
    [CHECK_LOGIN]: state => ({
      ...state,
      isChecking: true,
    }),
    [CHECK_LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isChecking: false,
    }),
    [CHECK_LOGIN_FAILED]: (state, { payload }) => ({
      ...state,
      ...payload,
      isChecking: false,
    }),
    [CHECK_LOGIN_FINISHED]: state => state,
    [INIT_SIGNUP]: state => ({
      ...state,
      isSignupFailed: false,
      isRegistering: false,
      errorMessage: '',
    }),
    [SIGNUP_EMAIL]: state => ({
      ...state,
      isSignupFailed: false,
      isRegistering: true,
    }),
    [SIGNUP_FACEBOOK]: state => ({
      ...state,
      isSignupFailed: false,
      isRegistering: true,
    }),
    [CHECK_REDIRECT]: state => ({
      ...state,
      isChecking: true,
    }),
    [CHECK_REDIRECT_END]: state => ({
      ...state,
      isChecking: false,
    }),
    [SIGNUP_SUCCESS]: state => ({
      ...state,
      isSignupFailed: false,
      isRegistering: false,
    }),
    [SIGNUP_FAILED]: (state, action) => ({
      ...state,
      isSignupFailed: true,
      isRegistering: false,
      errorMessage: action.payload,
    }),
    [SET_USER]: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    [INIT_PASSWORD_RESET]: state => ({
      ...state,
      isResetTrying: false,
      isResetSuccess: false,
      error: '',
    }),
    [PASSWORD_RESET]: state => ({
      ...state,
      isResetTrying: true,
    }),
    [PASSWORD_RESET_SUCCESS]: state => ({
      ...state,
      isResetTrying: false,
      isResetSuccess: true,
      error: '',
    }),
    [PASSWORD_RESET_FAILED]: (state, action) => ({
      ...state,
      isResetTrying: false,
      isResetSuccess: false,
      error: action.payload,
    }),
    [INIT_UNSUBSCRIBE]: state => ({
      ...state,
      isUnsubscribeTrying: false,
      isUnsubscribeSuccess: false,
      isUnsubscribeFailed: false,
    }),
    [UNSUBSCRIBE]: state => ({
      ...state,
      isUnsubscribeTrying: true,
      isUnsubscribeSuccess: false,
      isUnsubscribeFailed: false,
    }),
    [UNSUBSCRIBE_SUCCESS]: state => ({
      ...state,
      isUnsubscribeTrying: false,
      isUnsubscribeSuccess: true,
      isUnsubscribeFailed: false,
    }),
    [UNSUBSCRIBE_FAILED]: state => ({
      ...state,
      isUnsubscribeTrying: false,
      isUnsubscribeSuccess: false,
      isUnsubscribeFailed: true,
    }),
    [FETCH_HAS_REQUESTED_SUCCESS]: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        hasRequested: action.payload.hasRequested,
      },
    }),
  },
  initialState,
);

export default authReducer;
