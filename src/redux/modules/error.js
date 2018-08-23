import { createActions, handleActions } from 'redux-actions';

// Actions
const SET_ERROR = 'SET_ERROR';
const RESET_ERROR = 'RESET_ERROR';

export const errorActions = createActions(SET_ERROR, RESET_ERROR);

// Reducer
const initialState = {
  message: null,
  hasError: true,
};

export const errorReducer = handleActions(
  {
    [SET_ERROR]: (state, action) => ({
      message: action.payload,
      hasError: true,
    }),
    [RESET_ERROR]: () => ({
      message: null,
      hasError: false,
    }),
  },
  initialState,
);
