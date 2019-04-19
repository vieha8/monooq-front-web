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
};

const createApiInstance = token =>
  axios.create({
    baseURL: apiConfig().baseURI,
    timeout: 10000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Application-Header': token,
    },
  });

const responseErrorHandler = (resolve, response) => {
  if (!response) {
    resolve({ status: 503, err: 'Service Unavailable' });
    return;
  }

  if (response.status !== 404) {
    captureException(new Error(`${response.status}:${response.statusText}`));
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
      .catch(({ response }) => responseErrorHandler(resolve, response));
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
      .catch(({ response }) => responseErrorHandler(resolve, response));
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
      .catch(({ response }) => responseErrorHandler(resolve, response));
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
      .catch(({ response }) => responseErrorHandler(resolve, response));
  });
};
