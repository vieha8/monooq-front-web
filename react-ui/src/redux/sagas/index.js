import { all } from 'redux-saga/effects';
import { authSagas } from 'redux/modules/auth';
import { searchSagas } from 'redux/modules/search';
import { messagesSagas } from 'redux/modules/messages';
import { spaceSagas } from 'redux/modules/space';
import { userSagas } from 'redux/modules/user';
import { requestSagas } from 'redux/modules/request';
import { salesSagas } from 'redux/modules/sales';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...searchSagas,
    ...messagesSagas,
    ...spaceSagas,
    ...userSagas,
    ...requestSagas,
    ...salesSagas,
  ]);
}
