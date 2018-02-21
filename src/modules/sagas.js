import { all } from 'redux-saga/effects';
import { authSagas } from './auth';
import { searchSagas } from './search';
import { messagesSagas } from './messages';

export default function* rootSaga() {
  try {
    yield all([...authSagas, ...searchSagas, ...messagesSagas]);
  } catch (e) {
    // TODO error handing
    console.log(e);
  }
}
