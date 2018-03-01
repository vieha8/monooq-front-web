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

export const getApiRequest = (path, params) => {
  const url = apiConfig().baseURI + path;
  return new Promise(resolve => {
    axios
      .get(url, { params: params })
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(({ response }) => {
        // エラーの場合こちらにくる
        // TODO 鯖落ちてた場合の処理
        resolve({ status: response.status, err: response.statusText });
      });
  });
};
