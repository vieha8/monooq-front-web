import { createActions, handleActions } from 'redux-actions';

// Actions
const SET_ERROR_STATE = 'SET_ERROR_STATE';

export const errorActions = createActions(SET_ERROR_STATE);

// Reducer

const initialState = {
  errors: {},
  hasError: false,
};

const { setErrorState } = errorActions;
export const errorReducer = handleActions(
  {
    [setErrorState]: (state, action) => {
      const nextState = { ...state, ...action.payload };
      let hasError = false;
      Object.keys(nextState.errors).forEach(key => {
        if (nextState.errors[key].length > 0) {
          hasError = true;
        }
      });
      nextState.hasError = hasError;
      return nextState;
    },
  },
  initialState,
);
