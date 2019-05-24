import axios from 'axios';
import apiConfig from '../../config/api';
import { captureException } from '@sentry/browser';

export const apiEndpoint = {
  tokenGenerate: () => `/token/generate`,
  authFirebase: id => (id ? `/auth/firebase/${id}` : `/auth/firebase`),
  login: () => `/auth/login`,
  users: id => (id ? `/users/${id}` : `/users`),
  userSpaces: id => `/users/${id}/spaces`,
  userSpaceAccessLog: id => `users/${id}/spaces/log`,
  addUserSpaceAccessLog: (userId, spaceId) => `users/${userId}/spaces/${spaceId}`,
  spaces: id => (id ? `/spaces/${id}` : `/spaces`),
  spaceImage: (spaceId, imageId) =>
    imageId ? `/spaces/${spaceId}/image/${imageId}` : `/spaces/${spaceId}/image`,
  requests: id => (id ? `/requests/${id}` : `/requests`),
  requestsByUserId: id => `/requests/user/${id}`,
  requestsByHostUserId: id => `/requests/host/${id}`,
  payments: id => (id ? `/payments/${id}` : `/payments`),
  sendMail: () => `/mailer/send`,
  sendSMS: () => `/sms/send`,
  sales: () => `/payments/payouts`,
  backlogAddIssue: () => `/backlog/issue`,
  features: id => `spaces/features/${id}`,
  sections: () => `sections`,
  sectionsByRegionId: id => `sections/regions/${id}`,
  sectionsByPrefectureId: id => `sections/prefectures/${id}`,
};

const createApiInstance = token =>
  axios.create({
    baseURL: apiConfig().baseURI,
    timeout: 20000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Application-Header': token,
    },
  });

const responseErrorHandler = (resolve, error) => {
  const { response, message } = error;
  if (!response) {
    resolve({ status: 503, err: message });
    return;
  }

  if (response.status !== 404) {
    const { status, statusText, data, config } = response;
    const { method, url } = config;
    const err = `${method} ${url} ${status} ${statusText} : ${data.error}`;

    if (data.error !== 'Not mobile phone number') {
      // SMS送信エラーは通知させない
      captureException(new Error(err));
    }
  }

  resolve({
    status: response.status,
    err: response.data.error ? response.data.error : response.statusText,
  });
};

export const getApiRequest = (path, params, token) => {
  const api = createApiInstance(token);
  return new Promise(resolve => {
    api
      .get(path, { params })
      .then(res => {
        resolve({ ...res });
      })
      .catch(error => responseErrorHandler(resolve, error));
  });
};

export const postApiRequest = (path, body, token) => {
  const api = createApiInstance(token);
  return new Promise(resolve => {
    api
      .post(path, body)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => responseErrorHandler(resolve, error));
  });
};

export const putApiRequest = (path, body, token) => {
  const api = createApiInstance(token);
  return new Promise(resolve => {
    api
      .put(path, body)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => responseErrorHandler(resolve, error));
  });
};

export const deleteApiRequest = (path, token) => {
  const api = createApiInstance(token);
  return new Promise(resolve => {
    api
      .delete(path)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => responseErrorHandler(resolve, error));
  });
};
