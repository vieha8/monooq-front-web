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
