import axios from 'axios';
import apiConfig from '../../config/api';

const createApiInstance = token => {
  return axios.create({
    baseURL: apiConfig().baseURI,
    timeout: 3000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Application-Header': token,
    },
  });
};

export const getToken = () => {
  const obj = localStorage.getItem('token');
  if (!obj) {
    return null;
  }
  const { Token } = JSON.parse(obj);
  return Token;
};

const responseErrorHandler = (resolve, response) => {
  console.error(response);
  if (!response) {
    resolve({ status: 503, err: 'Service Unavailable' });
    return;
  }
  resolve({ status: response.status, err: response.statusText });
};

export const getApiRequest = (path, params) => {
  const api = createApiInstance(getToken());
  return new Promise(resolve => {
    api
      .get(path, { params: params })
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(({ response }) => responseErrorHandler(resolve, response));
  });
};

export const postApiRequest = (path, body) => {
  const api = createApiInstance(getToken());
  return new Promise(resolve => {
    api
      .post(path, body)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(({ response }) => responseErrorHandler(resolve, response));
  });
};

export const putApiRequest = (path, body) => {
  const api = createApiInstance(getToken());
  return new Promise(resolve => {
    api
      .put(path, body)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(({ response }) => responseErrorHandler(resolve, response));
  });
};

export const deleteApiRequest = path => {
  const api = createApiInstance(getToken());
  return new Promise(resolve => {
    api
      .delete(path)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(({ response }) => responseErrorHandler(resolve, response));
  });
};
