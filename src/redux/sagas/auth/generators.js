import { put, call, select } from 'redux-saga/effects';
import { push } from 'connected-next-router';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import { ErrorMessages } from 'variables';
import Path from 'config/path';
import firebaseConfig from 'config/firebase';
import { isAvailableLocalStorage } from 'helpers/storage';
import { convertImgixUrl } from 'helpers/imgix';
import { spaceActions } from 'redux/modules/space';
import { uiActions } from '../../modules/ui';
import { handleError } from '../../modules/error';
import {
  getApiRequest,
  postApiRequest,
  deleteApiRequest,
  apiEndpoint,
  putApiRequest,
} from '../../helpers/api';
import { parseUrl } from '../../../helpers/query-string';
import authActions from '../../actions/auth';

const getFirebaseAuth = async () => {
  const firebase = await import('firebase/app').catch(() => window.location.reload());
  await import('@firebase/auth').catch(() => window.location.reload());

  try {
    firebase.default.initializeApp(firebaseConfig());
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  return firebase.default.auth;
};

const getLoginUserFirebaseAuth = () =>
  new Promise(async (resolve, reject) => {
    const auth = await getFirebaseAuth();
    const unsub = auth().onAuthStateChanged(user => {
      unsub();
      resolve(user);
    }, reject);
  });

const setSentryConfig = user => {
  Sentry.configureScope(scope => {
    scope.setUser({
      id: user.id,
      username: user.name,
      email: user.email,
    });
  });
};

const getFirebaseAuthToken = () =>
  new Promise(async (resolve, reject) => {
    const auth = await getFirebaseAuth();
    auth()
      .currentUser.getIdToken(true)
      .then(token => resolve(token))
      .catch(err => reject(err));
  });

const tokenCacheKey = 'firebase_token';

function* makeToken() {
  const auth = yield call(getFirebaseAuth);
  if (!auth().currentUser) {
    return '';
  }

  const token = yield call(getFirebaseAuthToken);
  if (!token || token === '') {
    return '';
  }

  yield call(putApiRequest, apiEndpoint.authFirebase(auth().currentUser.uid), {}, token);
  if (isAvailableLocalStorage()) {
    const limit = new Date();
    limit.setMinutes(limit.getMinutes() + 50);
    localStorage.setItem(tokenCacheKey, JSON.stringify({ token, limit }));
  }

  return token;
}

export function* getToken() {
  const auth = yield call(getFirebaseAuth);
  if (!auth().currentUser) {
    return '';
  }

  if (isAvailableLocalStorage()) {
    const cache = localStorage.getItem(tokenCacheKey);
    if (cache) {
      const { token, limit } = JSON.parse(cache);
      if (token && token !== '') {
        if (new Date().getTime() < new Date(limit).getTime()) {
          // 有効期限判定
          return token;
        }
      }
    }
  }

  return yield makeToken();
}

const checkLoginWithEmailLink = (auth, email, url) => {
  return auth
    .signInWithEmailLink(email, url)
    .then(r => r)
    .catch(e => e);
};

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

function* loginEmail({ payload: { email, password } }) {
  try {
    const auth = yield call(getFirebaseAuth);
    yield auth().signInWithEmailAndPassword(email, password);
    yield checkLogin();
    yield put(authActions.loginSuccess());
  } catch (err) {
    yield Sentry.configureScope(scope => {
      scope.setExtra('email', email);
    });

    yield handleError(authActions.loginFailed, `${err.message}`, 'loginEmail', err, true);
  }
}

function* loginFacebook() {
  try {
    const redirectPath = yield select(state => state.ui.redirectPath);
    if (redirectPath && isAvailableLocalStorage()) {
      localStorage.setItem('redirectPath', redirectPath);
    }
    const auth = yield call(getFirebaseAuth);
    const provider = new auth.FacebookAuthProvider();
    yield auth().signInWithRedirect(provider);
  } catch (err) {
    yield handleError(authActions.loginFailed, err.message, 'loginFacebook', err, true);
  }
}

function* logout() {
  yield put(push(Path.top()));
  if (isAvailableLocalStorage()) {
    localStorage.removeItem(tokenCacheKey);
  }
  const auth = yield call(getFirebaseAuth);

  yield put(spaceActions.clearSpaceAccessLog());
  yield auth().signOut();
}

function* signUpEmail({ payload: { email, password } }) {
  try {
    const auth = yield call(getFirebaseAuth);
    const result = yield auth().createUserWithEmailAndPassword(email, password);
    const firebaseUid = result.user.uid;

    const defaultImage =
      'https://monooq.imgix.net/img%2Fusers%2Fdefault%2Ficon-profile-default.svg?alt=media&auto=compress';

    let referrer = '';
    let inviteCode = '';
    if (isAvailableLocalStorage()) {
      referrer = localStorage.getItem('referrer');
      inviteCode = localStorage.getItem('invite_code');
    }

    const token = yield* getToken();
    const { data, err } = yield call(
      postApiRequest,
      apiEndpoint.users(),
      {
        Email: email,
        FirebaseUid: firebaseUid,
        ImageUrl: defaultImage,
        RefererUrl: referrer,
        InviteCode: inviteCode,
      },
      token,
    );

    if (err) {
      yield handleError(authActions.signupFailed, '', 'signUpEmail', err, false);
      return;
    }

    yield put(authActions.signupSuccess(data));
    yield put(authActions.checkLogin());
    yield put(push(Path.signUpProfile()));
  } catch (err) {
    let errMessage = '';
    let isOnlyAction = false;
    if (err.code === 'auth/email-already-in-use') {
      errMessage = ErrorMessages.FailedSignUpMailExist;
      isOnlyAction = true;
    }
    yield Sentry.configureScope(scope => {
      scope.setExtra('email', email);
    });
    yield handleError(
      authActions.signupFailed,
      errMessage,
      'signUpEmail',
      err.message,
      isOnlyAction,
    );
  }
}

function* signUpFacebook() {
  try {
    const auth = yield call(getFirebaseAuth);
    const provider = new auth.FacebookAuthProvider();
    yield auth().signInWithRedirect(provider);
  } catch (err) {
    let errMessage = '';
    let isOnlyAction = false;
    if (err.code === 'auth/account-exists-with-different-credential') {
      errMessage = ErrorMessages.FailedSignUpMailExist;
      isOnlyAction = true;
    }
    yield handleError(
      authActions.signupFailed,
      errMessage,
      'signUpFacebook',
      err.message,
      isOnlyAction,
    );
  }
}

const checkFirebaseRedirect = () =>
  new Promise(async (resolve, reject) => {
    const auth = await getFirebaseAuth();
    await auth()
      .getRedirectResult()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });

function* checkRedirect() {
  const result = yield checkFirebaseRedirect();

  if (!result.user) {
    yield put(authActions.checkRedirectEnd());
    return;
  }

  const { isNewUser } = result.additionalUserInfo;
  if (!isNewUser) {
    yield put(authActions.signupFailed(ErrorMessages.FailedSignUpMailExist));
    yield put(authActions.checkRedirectEnd());
    return;
  }
  const { displayName, email, uid, photoURL } = result.user;

  let referrer = '';
  let inviteCode = '';
  if (isAvailableLocalStorage()) {
    referrer = localStorage.getItem('referrer');
    inviteCode = localStorage.getItem('invite_code');
  }

  const token = yield* getToken();
  const { data, err } = yield call(
    postApiRequest,
    apiEndpoint.users(),
    {
      Email: email,
      FirebaseUid: uid,
      Name: displayName,
      ImageUrl: `${photoURL}?height=200`,
      RefererUrl: referrer,
      InviteCode: inviteCode,
    },
    token,
  );

  if (err) {
    yield handleError(authActions.signupFailed, '', 'signUpFacebook', err, false);
    yield put(authActions.checkRedirectEnd());
    return;
  }

  yield put(authActions.signupSuccess(data));
  yield put(authActions.checkRedirectEnd());
  yield put(push(Path.signUpProfile()));
}

function* passwordReset({ payload: { email } }) {
  const auth = yield call(getFirebaseAuth);
  try {
    yield auth().sendPasswordResetEmail(email);
    yield put(authActions.passwordResetSuccess());
  } catch (err) {
    let errMessage = '';
    let isOnlyAction = false;
    if (err.code === 'auth/user-not-found') {
      errMessage = ErrorMessages.FailedResetPassword;
      isOnlyAction = true;
    }
    yield handleError(
      authActions.passwordResetFailed,
      errMessage,
      'passwordReset',
      err.message,
      isOnlyAction,
    );
  }
}

function* unsubscribe({ payload: { reason, description } }) {
  const user = yield select(state => state.auth.user);

  const token = yield* getToken();

  const bodyUpdate = {
    deletedReason: reason,
    deletedDescription: description,
  };
  yield call(putApiRequest, apiEndpoint.users(user.id), bodyUpdate, token);

  const { err } = yield call(deleteApiRequest, apiEndpoint.users(user.id), token);
  if (err) {
    yield handleError(authActions.unsubscribeFailed, '', 'unsubscribe', err, true);
    return;
  }

  if (process.env.REACT_APP_ENV === 'production') {
    const messageBody = `退会理由:${JSON.stringify(reason)}\n詳細:${description}\n`;
    const body = {
      Subject: `【退会完了】ユーザーID:${user.id}`,
      Uid: 'DDtN7dr9r5VQKyuXRx8AcRgtPIW2', // 本番モノオク公式アカウント(info@monooq.com)
      Body: messageBody,
      Category: 'unsubscribe',
    };
    yield call(postApiRequest, apiEndpoint.sendMail(), body, token);
  }

  yield put(authActions.unsubscribeSuccess());

  if (isAvailableLocalStorage) {
    localStorage.removeItem('anonymous-access-logs');
    localStorage.removeItem('isRequestedTop');
    localStorage.removeItem('request_params');
  }
}

function* fetchHasRequested() {
  const user = yield select(state => state.auth.user);
  if (!user.id || user.isHost) {
    return;
  }
  const token = yield* getToken();
  const { data, err } = yield call(getApiRequest, apiEndpoint.hasRequested(user.id), {}, token);

  if (!err && data) {
    yield put(authActions.fetchHasRequestedSuccess({ hasRequested: data.hasRequested }));
  }
}

export default {
  checkLogin,
  loginEmail,
  loginFacebook,
  logout,
  signUpEmail,
  signUpFacebook,
  checkRedirect,
  passwordReset,
  unsubscribe,
  fetchHasRequested,
};
