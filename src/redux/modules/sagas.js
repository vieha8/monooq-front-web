import { all } from 'redux-saga/effects';
import { apiSagas } from './api';
import { apiSagas2 } from './api2';
import { authSagas } from './auth';
import { searchSagas } from './search';
import { messagesSagas } from './messages';
import { spaceSagas } from './space';
import { userSagas } from './user';
import { requestSagas } from './request';

export default function* rootSaga() {
  yield all([
    ...apiSagas,
    ...apiSagas2,
    ...authSagas,
    ...searchSagas,
    ...messagesSagas,
    ...spaceSagas,
    ...userSagas,
    ...requestSagas,
  ]);
}
