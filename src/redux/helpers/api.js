import axios from 'axios';
import apiConfig from '../../config/api';

const createAsyncConstants = constant => ({
  REQUEST: constant,
  SUCCESS: `${constant}_SUCCESS`,
  FAILED: `${constant}_FAILED`,
});

export const createRESTConstants = constant => ({
  GET: createAsyncConstants(`${constant}_GET`),
  POST: createAsyncConstants(`${constant}_POST`),
  PUT: createAsyncConstants(`${constant}_PUT`),
  DELETE: createAsyncConstants(`${constant}_DELETE`),
});

const createApiInstance = token => {
  return axios.create({
    baseURL: apiConfig().baseURI,
    timeout: 3000,
    headers: { 'x-application-header': token },
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
  resolve({ status: response.status, err: response.data.error });
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
