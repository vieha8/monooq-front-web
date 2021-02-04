import { put, call } from 'redux-saga/effects';
import ReactGA from 'react-ga';
import { isAvailableLocalStorage } from 'helpers/storage';
import { convertImgixUrl } from 'helpers/imgix';
import { uiActions } from 'redux/modules/ui';
import { handleError } from 'redux/modules/error';
import * as Sentry from '@sentry/browser';
import authActions from 'redux/actions/auth';
import { getApiRequest, postApiRequest, apiEndpoint } from 'redux/helpers/api';
import { parseUrl } from '../../../../helpers/query-string';
import { getFirebaseAuth, getToken, makeToken } from '../utils';

const checkLoginWithEmailLink = (auth, email, url) => {
  return auth
    .signInWithEmailLink(email, url)
    .then(r => r)
    .catch(e => e);
};

const setSentryConfig = user => {
  Sentry.configureScope(scope => {
    scope.setUser({
      id: user.id,
      username: user.name,
      email: user.email,
    });
  });
};

const getLoginUserFirebaseAuth = () =>
  new Promise(async (resolve, reject) => {
    const auth = await getFirebaseAuth();
    const unsub = auth().onAuthStateChanged(user => {
      unsub();
      resolve(user);
    }, reject);
  });

function* checkLogin() {
  const { query } = parseUrl(window.location.href);
  const auth = yield call(getFirebaseAuth);
  if (query.mode && query.mode === 'signIn') {
    yield call(checkLoginWithEmailLink, auth, query.email, window.location.href);
  }
  const status = { isLogin: false };
  try {
    const { currentUser } = auth();

    let firebaseUid = '';

    if (currentUser) {
      firebaseUid = currentUser.uid;
    } else {
      const user = yield call(getLoginUserFirebaseAuth);
      if (user) {
        firebaseUid = user.uid;
      }
    }

    if (firebaseUid !== '') {
      // ログイン済み
      status.isLogin = true;
      let token = yield getToken();
      const { data, err } = yield call(
        getApiRequest,
        apiEndpoint.authFirebase(firebaseUid),
        {},
        token,
      );

      if (token !== data.token) {
        token = yield makeToken();
      }

      if (err || data.id === 0) {
        yield put(authActions.checkLoginFailed({ error: err }));
        yield put(authActions.checkLoginFinished());
        yield put(authActions.logout());
        window.location.reload();
        return;
      }

      data.imageUrl = convertImgixUrl(data.imageUrl, 'w=128&auto=format&auto=compress');
      status.user = data;

      yield call(postApiRequest, apiEndpoint.login(), { UserId: data.id }, token);
      ReactGA.set({ userId: data.id });
      setSentryConfig(data);

      if (isAvailableLocalStorage()) {
        const redirectPath = localStorage.getItem('redirectPath');
        if (redirectPath) {
          yield put(uiActions.setUiState({ redirectPath }));
          localStorage.removeItem('redirectPath');
        }
      }
    }
    yield put(authActions.checkLoginSuccess(status));
    yield put(authActions.checkLoginFinished());
  } catch (err) {
    yield put(authActions.checkLoginFinished());
    yield handleError(authActions.checkLoginFailed, '', 'checkLogin', err, false);
  }
}

export default checkLogin;
