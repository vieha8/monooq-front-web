import { createActions, handleActions } from 'redux-actions';

// Actions
const SET_UI_STATE = 'SET_UI_STATE';

export const uiActions = createActions(SET_UI_STATE);

// Reducer

const initialState = {
  locationText: '',
  signUpStep: 0,
  space: {
    images: [],
  },
  user: {},
  card: {
    name: 'MASYA KUDO',
    number: '4242424242424242',
    code: '111',
    expiryMonth: '1',
    expiryYear: '2019',
  },
};

const { setUiState } = uiActions;
export const uiReducer = handleActions(
  {
    [setUiState]: (state, action) => ({ ...state, ...action.payload }),
  },
  initialState,
);
