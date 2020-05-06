import axios from 'axios';
import apiConfig from 'config/api';
import { captureException, withScope } from '@sentry/browser';
import { parseUrl, stringify } from '../../helpers/query-string';

export const apiEndpoint = {
  authFirebase: id => (id ? `/auth/firebase/${id}` : `/auth/firebase`),
  login: () => `/auth/login`,
  users: id => (id ? `/users/${id}` : `/users`),
  userSpaces: id => `/users/${id}/spaces`,
  userMeta: id => `/users/${id}/meta`,
  guestWish: id => `/users/${id}/wish`,
  getUserSpaceAccessLog: userId => `users/${userId}/spaces/log`,
  addUserSpaceAccessLog: (userId, spaceId) => `users/${userId}/spaces/${spaceId}`,
  spaces: id => (id ? `/spaces/${id}` : `/spaces`),
  spacesRecommend: id => `/spaces/${id}/recommend/sims`,
  requests: id => (id ? `/requests/${id}` : `/requests`),
  requestsByUserId: id => `/requests/user/${id}`,
  requestsByHostUserId: id => `/requests/host/${id}`,
  payments: type => (type ? `/payments/${type}` : `/payments`),
  sendMail: () => `/mailer/send`,
  sendSMS: () => `/sms/send`,
  sales: () => `/payments/payouts`,
  features: id => `spaces/features/${id}`,
  sections: () => `sections`,
  region: () => `region`,
  areaCitiesGeneral: prefCode => `spaces/area/pg${prefCode}`,
  areaCities: prefCode => `spaces/area/p${prefCode}`,
  areaTowns: cityCode => `spaces/area/c${cityCode}`,
  areaSearch: prefCode => `spaces/area/p${prefCode}/all`,
  intercom: userId => `intercom/hash/${userId}`,
  bosyu: hash => `/requests/wish/${hash}`,
};

const createApiInstance = token =>
  axios.create({
    baseURL: apiConfig().baseURL,
    timeout: 60000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Application-Header': token,
    },
  });

const responseErrorHandler = (resolve, error, path, params) => {
  const { response, message } = error;
  if (!response) {
    const err = new Error(`API Connection Error:/${path} ${message}`);
    withScope(scope => {
      if (params) {
        scope.setExtra('params', JSON.stringify(params));
      }
      captureException(err);
    });
    resolve({ status: 503, err: message });
    return;
  }

  if (response.status !== 404) {
    const { status, statusText, data, config } = response;
    const { method, url } = config;
    const err = `${method} ${url} ${status} ${statusText} : ${data.error}`;

    if (data.error !== 'Not mobile phone number' && data.error !== 'Not register phone number') {
      // SMS送信エラーは通知させない
      withScope(scope => {
        scope.setExtra('params', params);
        captureException(new Error(err));
      });
    }
  }

  resolve({
    status: response.status,
    err: response.data.error ? response.data.error : response.statusText,
  });
};

const addNoCache = path => {
  const { url, query } = parseUrl(path);
  query.nocache = new Date().getTime();
  return `${url}?${stringify(query)}`;
};

export const getApiRequest = (path, params, token) => {
  const api = createApiInstance(token);
  return new Promise(resolve => {
    api
      .get(addNoCache(path), { params })
      .then(res => {
        resolve({ ...res });
      })
      .catch(error => responseErrorHandler(resolve, error, path, params));
  });
};

export const postApiRequest = (path, body, token) => {
  const api = createApiInstance(token);
  return new Promise(resolve => {
    api
      .post(addNoCache(path), body)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => responseErrorHandler(resolve, error, path, body));
  });
};

export const putApiRequest = (path, body, token) => {
  const api = createApiInstance(token);
  return new Promise(resolve => {
    api
      .put(addNoCache(path), body)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => responseErrorHandler(resolve, error, path, body));
  });
};

export const deleteApiRequest = (path, token) => {
  const api = createApiInstance(token);
  return new Promise(resolve => {
    api
      .delete(addNoCache(path))
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => responseErrorHandler(resolve, error, path, {}));
  });
};
