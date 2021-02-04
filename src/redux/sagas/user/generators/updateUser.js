import { uploadImage } from 'redux/helpers/firebase';
import { getToken } from 'redux/sagas/auth/generators';
import { push } from 'connected-next-router';
import { userActions } from 'redux/modules/user';
import authActions from 'redux/actions/auth';
import { putApiRequest, apiEndpoint } from 'redux/helpers/api';
import { put, select, call } from 'redux-saga/effects';
import { ErrorMessages } from 'variables';
import { handleError } from 'redux/modules/error';
import fileType from '../../../../helpers/file-type';
import { isAvailableLocalStorage } from '../../../../helpers/storage';

export default function* updateUser({ payload: { userId, body } }) {
  if (body.imageUrl instanceof Blob) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(body.imageUrl);
    const ext = yield new Promise(resolve => {
      fileReader.onload = () => {
        const imageType = fileType(fileReader.result);
        resolve(imageType.ext);
      };
    });
    const timeStamp = Date.now();
    const imagePath = `/img/users/${userId}/profile/${timeStamp}.${ext}`;
    body.imageUrl = yield uploadImage(imagePath, body.imageUrl);
  }
  const token = yield* getToken();
  const { data, err } = yield call(putApiRequest, apiEndpoint.users(userId), body, token);

  if (err) {
    let errMessage = '';
    let isOnlyAction = false;
    if (err === 'googleapi: Error 400: EMAIL_EXISTS, invalid') {
      errMessage = ErrorMessages.FailedSignUpMailExist;
      isOnlyAction = true;
    }
    yield handleError(userActions.updateFailedUser, errMessage, 'updateUser', err, isOnlyAction);
    return;
  }

  if (isAvailableLocalStorage()) {
    localStorage.removeItem('status');
  }
  yield put(authActions.setUser(data));
  yield put(userActions.updateSuccessUser(data));

  const redirectPath = yield select(state => state.ui.redirectPath);
  if (redirectPath) {
    yield put(push(redirectPath));
  }
}
