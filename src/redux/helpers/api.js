import axios from 'axios';
import apiConfig from '../../config/api';

export const createAsyncConstants = constant => ({
  REQUEST: constant,
  SUCCESS: `${constant}_SUCCESS`,
  FAILURE: `${constant}_FAILURE`,
});

export const createRESTConstants = constant => ({
  GET: createAsyncConstants(`${constant}_GET`),
  POST: createAsyncConstants(`${constant}_POST`),
  PUT: createAsyncConstants(`${constant}_PUT`),
  DELETE: createAsyncConstants(`${constant}_DELETE`),
});

export const getApiRequest = (path, params) => {
  const url = apiConfig().baseURI + path;
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        // エラー(200以外)の場合はこちらにくる
        reject(err);
      });
  });
};
