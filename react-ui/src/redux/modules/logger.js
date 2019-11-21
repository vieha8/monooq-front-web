import { createActions, handleActions } from 'redux-actions';
import { select, takeEvery } from 'redux-saga/effects';
import { recordEvent } from '../../helpers/keen';

// Actions
const RECORD_EVENT = 'RECORD_EVENT';
export const loggerActions = createActions(RECORD_EVENT);

// Reducer
const initialState = {
  prevPath: '',
};
export const loggerReducer = handleActions(
  {
    '@@router/LOCATION_CHANGE': (state, action) => ({
      ...state,
      prevPath: action.payload.prevPath,
    }),
  },
  initialState,
);

// Sagas
function* record({ payload: { event, detail } }) {
  if (process.env.REACT_APP_ENV !== 'production') {
    // 開発環境はログ送信しない
    return;
  }

  const user = yield select(state => state.auth.user);
  const prevPath = yield select(state => state.logger.prevPath);
  const referrerUrl = prevPath === '' ? document.referrer : `https://${document.domain}${prevPath}`;

  recordEvent('important_events', {
    event,
    event_detail: detail,
    user,
    referrer: {
      url: referrerUrl,
    },
  });
}

export const loggerSagas = [takeEvery(RECORD_EVENT, record)];
