import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import authSagas from 'redux/sagas/auth';
import { messagesSagas } from 'redux/modules/messages';
import { spaceSagas } from 'redux/modules/space';
import { userSagas } from 'redux/modules/user';
import { requestSagas } from 'redux/modules/request';
import { salesSagas } from 'redux/modules/sales';
import { initSagas } from 'redux/modules/init';
import { sectionSagas } from 'redux/modules/section';

export function* rootSaga() {
  yield all([
    ...authSagas,
    ...messagesSagas,
    ...spaceSagas,
    ...userSagas,
    ...requestSagas,
    ...salesSagas,
    ...initSagas,
    ...sectionSagas,
  ]);
}

const sagaMiddleware = createSagaMiddleware({
  onError(error) {
    setImmediate(() => {
      throw error;
    });
  },
});

export default sagaMiddleware;
