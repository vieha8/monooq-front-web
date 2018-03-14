import { createActions, handleActions } from 'redux-actions';

// Actions
const SET_UI_STATE = 'SET_UI_STATE';

export const uiActions = createActions(SET_UI_STATE);

// Reducer

const initialState = {
  locationText: '',
  signUpStep: 0,
  space: {},
};

const { setUiState } = uiActions;
export const uiReducer = handleActions(
  {
    [setUiState]: (state, action) => ({ ...state, ...action.payload }),
  },
  initialState,
);
