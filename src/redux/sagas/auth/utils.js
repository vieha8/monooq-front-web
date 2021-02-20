import firebaseConfig from 'config/firebase';
import { call } from 'redux-saga/effects';
import { isAvailableLocalStorage } from 'helpers/storage';
import { apiEndpoint, putApiRequest } from '../../helpers/api';

const tokenCacheKey = 'firebase_token';

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

const getFirebaseAuthToken = () =>
  new Promise(async (resolve, reject) => {
    const auth = await getFirebaseAuth();
    auth()
      .currentUser.getIdToken(true)
      .then(token => resolve(token))
      .catch(err => reject(err));
  });

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

function* getToken() {
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

export { getToken, makeToken, getFirebaseAuth };
