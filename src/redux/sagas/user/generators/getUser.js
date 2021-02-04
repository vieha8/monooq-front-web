import { getToken } from 'redux/sagas/auth/generators';
import { put, call } from 'redux-saga/effects';
import { userActions } from 'redux/modules/user';
import { handleError } from 'redux/modules/error';
import { convertImgixUrl } from 'helpers/imgix';
import { getApiRequest, apiEndpoint } from '../../../helpers/api';

export default function* getUser({ payload: { userId } }) {
  const token = yield* getToken();
  const { data, err } = yield call(getApiRequest, apiEndpoint.users(userId), {}, token);

  if (err) {
    yield handleError(userActions.fetchFailedUser, '', 'getUser', err, false);
    return;
  }

  if (data.imageUrl) {
    data.imageUrl = convertImgixUrl(data.imageUrl, 'w=128&auto=format&auto=compress');
  }

  yield put(userActions.fetchSuccessUser(data));
}
