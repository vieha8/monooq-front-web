import axios from 'axios';
import apiConfig from '../../config/api';

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
  resolve({
    status: response.status,
    err: response.data ? response.data.error : response.statusText,
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
