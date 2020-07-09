import { createActions, handleActions } from 'redux-actions';
import { all, put, takeEvery, take, call, select } from 'redux-saga/effects';
import { authActions, getToken } from 'redux/modules/auth';
import { getApiRequest, apiEndpoint } from 'redux/helpers/api';
import { isAvailableLocalStorage } from 'helpers/storage';
import { handleError } from './error';

// Actions
const FETCH_LOG = 'FETCH_LOG';
const FETCH_LOG_SUCCESS = 'FETCH_LOG_SUCCESS';
const FETCH_LOG_FAIL = 'FETCH_LOG_FAIL';

export const accessLogSpaceActions = createActions(FETCH_LOG, FETCH_LOG_SUCCESS, FETCH_LOG_FAIL);

// Reducer
const initialState = {
  spaces: [],
  isLoading: false,
  isMore: false,
};

export const accessLogSpaceReducer = handleActions(
  {
    [FETCH_LOG]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_LOG_SUCCESS]: (state, action) => ({
      ...state,
      spaces: [...state.spaces, ...action.payload.spaces],
      isLoading: false,
      isMore: action.payload.isMore,
    }),
    [FETCH_LOG_FAIL]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

// Sagas
function* getSpaceAccessLog({ payload: { limit, offset } }) {
  const params = {
    limit,
    offset,
  };

  yield put(authActions.checkLogin());
  yield take(authActions.checkLoginFinished);

  const user = yield select(state => state.auth.user);
  if (!user.id) {
    let anonymousAccessLogSpaces = [];
    if (isAvailableLocalStorage) {
      const key = 'anonymous-access-logs';
      const json = localStorage.getItem(key);
      const anonymousAccessLogSpaceIds = json ? JSON.parse(json) : [];

      const results = yield all(
        anonymousAccessLogSpaceIds.map(id => call(getApiRequest, apiEndpoint.spaces(id), token)),
      );
      results.reverse().forEach(({ data, err }) => {
        if (!err) {
          anonymousAccessLogSpaces = [...anonymousAccessLogSpaces, data];
        }
      });
    }

    yield put(
      accessLogSpaceActions.fetchLogSuccess({ spaces: anonymousAccessLogSpaces, isMore: false }),
    );

    return;
  }

  const token = yield* getToken();
  const { data: spaces, err } = yield call(
    getApiRequest,
    apiEndpoint.getUserSpaceAccessLog(user.id),
    params,
    token,
  );

  if (err) {
    yield handleError(accessLogSpaceActions.fetchLogFail, '', 'getSpaceAccessLog', err, false);
    return;
  }

  yield put(accessLogSpaceActions.fetchLogSuccess({ spaces, isMore: spaces.length === limit }));
}

export const accessLogSpaceSagas = [takeEvery(FETCH_LOG, getSpaceAccessLog)];
