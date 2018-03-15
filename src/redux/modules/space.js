import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take } from 'redux-saga/effects';
import { apiActions } from './api';
import { store } from '../store/configureStore';
import { push } from 'react-router-redux';
import { uploadImage } from '../helpers/firebase';
import fileType from '../../helpers/file-type';

// Actions
const FETCH_SPACE = 'FETCH_SPACE';
const FETCH_SUCCESS_SPACE = 'FETCH_SUCCESS_SPACE';
const FETCH_FAILED_SPACE = 'FETCH_FAILED_SPACE';
const CREATE_SPACE = 'CREATE_SPACE';
const CREATE_SUCCESS_SPACE = 'CREATE_SUCCESS_SPACE';
const CREATE_FAILED_SPACE = 'CREATE_FAILED_SPACE';

export const spaceActions = createActions(
  FETCH_SPACE,
  FETCH_SUCCESS_SPACE,
  FETCH_FAILED_SPACE,
  CREATE_SPACE,
  CREATE_SUCCESS_SPACE,
  CREATE_FAILED_SPACE,
);

// Reducer
const initialState = {
  isLoading: false,
  space: null,
};

export const spaceReducer = handleActions(
  {
    [FETCH_SPACE]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_SUCCESS_SPACE]: (state, action) => ({
      ...state,
      isLoading: false,
      space: action.payload,
    }),
    [FETCH_FAILED_SPACE]: state => ({
      ...state,
      isLoading: false,
    }),
    [CREATE_SPACE]: state => ({
      ...state,
      created: null,
    }),
    [CREATE_SUCCESS_SPACE]: (state, action) => ({
      ...state,
      created: action.payload,
    }),
  },
  initialState,
);

//Sagas
function* getSpace({ payload: { spaceId } }) {
  yield put(apiActions.spaceGet({ id: spaceId }));
  const { payload } = yield take(apiActions.spaceGetSuccess);
  yield put(spaceActions.fetchSuccessSpace(payload));
}

function* createSpace({ payload: { body } }) {
  const { images } = body;
  body.images = null;

  yield put(apiActions.spacePost({ body }));
  const { payload } = yield take(apiActions.spacePostSuccess);

  if (images) {
    const spaceId = payload.ID;
    const imageUrls = yield Promise.all(
      images.map(async image => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(image);
        const ext = await new Promise(resolve => {
          fileReader.onload = () => {
            const imageType = fileType(fileReader.result);
            resolve(imageType.ext);
          };
        });
        const timeStamp = Date.now();
        const imagePath = `/img/spaces/${spaceId}/${timeStamp}.${ext}`;
        return uploadImage(imagePath, image);
      }),
    );
    payload.images = imageUrls.map(url => ({ imageUrl: url }));
    yield put(apiActions.spacePut({ id: spaceId, body: payload }));
    yield take(apiActions.spacePutSuccess);
  }
  yield put(spaceActions.createSuccessSpace(payload));
  store.dispatch(push('/space/new/completion'));
}

export const spaceSagas = [takeEvery(FETCH_SPACE, getSpace), takeEvery(CREATE_SPACE, createSpace)];
