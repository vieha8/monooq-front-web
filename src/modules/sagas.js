import { all } from 'redux-saga/effects';
import { authSagas } from './auth';
import { searchSagas } from './search';
import { messagesSagas } from './messages';

export default function* rootSaga() {
  yield all([...authSagas, ...searchSagas, ...messagesSagas]);
}
