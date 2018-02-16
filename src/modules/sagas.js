import { all } from 'redux-saga/effects';
import { authSagas } from './auth';
import { searchSagas } from './search';

export default function* rootSaga() {
  yield all([...authSagas, ...searchSagas]);
}
