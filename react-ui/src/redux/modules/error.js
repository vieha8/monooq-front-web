import { createActions, handleActions } from 'redux-actions';
import { put } from 'redux-saga/effects';

// Actions
const SET_ERROR = 'SET_ERROR';
const RESET_ERROR = 'RESET_ERROR';

export const errorActions = createActions(SET_ERROR, RESET_ERROR);

// Reducer
const initialState = {
  message: '',
  functionName: '',
  hasError: false,
};

export const errorReducer = handleActions(
  {
    [SET_ERROR]: (state, action) => ({
      functionName: action.payload.functionName,
      message: action.payload.message,
      hasError: true,
    }),
    [RESET_ERROR]: () => ({
      message: '',
      functionName: '',
      hasError: false,
    }),
  },
  initialState,
);

export function* handleError(action, errMessage, functionName, err, isOnlyAction) {
  if (action !== '') {
    yield put(action(errMessage || ''));
  }
  if (isOnlyAction) {
    return;
  }
  yield put(
    errorActions.setError({
      message: errMessage,
      functionName,
    }),
  );
}
