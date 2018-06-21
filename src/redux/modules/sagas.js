import { all } from 'redux-saga/effects';
import { apiSagas } from './api';
import { authSagas } from './auth';
import { searchSagas } from './search';
import { messagesSagas } from './messages';
import { spaceSagas } from './space';
import { userSagas } from './user';
import { requestSagas } from './request';
import { salesSagas } from './sales';

export default function* rootSaga() {
  yield all([
    ...apiSagas,
    ...authSagas,
    ...searchSagas,
    ...messagesSagas,
    ...spaceSagas,
    ...userSagas,
    ...requestSagas,
    ...salesSagas,
  ]);
}
