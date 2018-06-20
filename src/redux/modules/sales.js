import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, call } from 'redux-saga/effects';

import { apiEndpoint } from './api';
import { getApiRequest } from '../helpers/api';

// Actions
const FETCH_SALES = 'FETCH_SALES';
const FETCH_SALES_SUCCESS = `${FETCH_SALES}_SUCCESS`;
const FETCH_SALES_FAILED = `${FETCH_SALES}_FAILED`;

export const salesActions = createActions(FETCH_SALES, FETCH_SALES_SUCCESS, FETCH_SALES_FAILED);

// Reducer
const initialState = {
  sales: [],
  isLoading: false,
};

export const salesReducer = handleActions(
  {
    [FETCH_SALES]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_SALES_SUCCESS]: (state, action) => ({
      ...state,
      sales: action.payload,
      isLoading: false,
    }),
    [FETCH_SALES_FAILED]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

// Sagas
function* getSales() {
  // TODO ユーザーとトークンが紐付けられてるか確認した方が良い
  const { data } = yield call(getApiRequest, apiEndpoint.sales());
  yield put(salesActions.fetchSalesSuccess(data));
  // TODO エラーハンドリング
}

export const salesSagas = [takeEvery(FETCH_SALES, getSales)];
