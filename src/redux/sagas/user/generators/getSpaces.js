import { getToken } from 'redux/sagas/auth/generators';
import { push } from 'connected-next-router';
import { userActions } from 'redux/modules/user';
import Path from 'config/path';
import { apiEndpoint, getApiRequest } from 'redux/helpers/api';
import { convertImgixUrl } from 'helpers/imgix';
import { put, select, call } from 'redux-saga/effects';
import { handleError } from 'redux/modules/error';

const dummySpaceImage =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-dummy-space.png?alt=dummy&auto=format&auto=compress';

export default function* getSpaces(params) {
  let targetUserId = '';
  let user = '';
  const functionName = 'getSpaces';
  if (params && params.payload && params.payload.userId) {
    targetUserId = params.payload.userId;
  } else {
    user = yield select(state => state.auth.user);
    if (!user.id) {
      yield handleError(
        userActions.fetchFailedUserSpaces,
        '',
        functionName,
        'Undefined userId.',
        false,
      );
      return;
    }
  }

  const token = yield* getToken();
  const { data, status, err } = yield call(
    getApiRequest,
    apiEndpoint.userSpaces(targetUserId || user.id),
    {},
    token,
  );

  if (err) {
    if (status === 404) {
      yield put(push(Path.pageNotFound()));
    } else {
      yield handleError(userActions.fetchFailedUserSpaces, '', functionName, err, false);
    }
    return;
  }

  if (Array.isArray(data)) {
    const res = data.map(v => {
      if (v.images.length === 0) {
        v.images[0] = { imageUrl: dummySpaceImage };
      } else {
        v.images = v.images.map(image => {
          image.imageUrl = convertImgixUrl(
            image.imageUrl,
            'fit=crop&fill-color=DBDBDB&w=700&h=466&auto=format',
          );
          return image;
        });
      }
      return v;
    });
    yield put(userActions.fetchSuccessUserSpaces(res));
  } else {
    yield handleError(
      userActions.fetchFailedUserSpaces,
      '',
      functionName,
      'data is not Array.',
      false,
    );
  }
}
