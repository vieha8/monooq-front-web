import { all } from 'redux-saga/effects';
import { authSagas } from 'redux/modules/auth';
import { messagesSagas } from 'redux/modules/messages';
import { spaceSagas } from 'redux/modules/space';
import { userSagas } from 'redux/modules/user';
import { requestSagas } from 'redux/modules/request';
import { salesSagas } from 'redux/modules/sales';
import { initSagas } from 'redux/modules/init';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...messagesSagas,
    ...spaceSagas,
    ...userSagas,
    ...requestSagas,
    ...salesSagas,
    ...initSagas,
  ]);
}
