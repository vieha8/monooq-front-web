import { createActions, handleActions } from 'redux-actions';
import { all, put, takeEvery, take, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import { authActions, getToken } from 'redux/modules/auth';
import { uiActions } from 'redux/modules/ui';
import {
  getApiRequest,
  postApiRequest,
  putApiRequest,
  deleteApiRequest,
  apiEndpoint,
} from 'redux/helpers/api';
import { uploadImage } from 'redux/helpers/firebase';
import fileType from 'helpers/file-type';
import { convertBaseUrl, convertSpaceImgUrl } from 'helpers/imgix';
import { formatAddComma } from 'helpers/string';
import Queue from 'helpers/queue';
import Path from 'config/path';
import { ErrorMessages } from 'variables';
import { isAvailableLocalStorage } from 'helpers/storage';
import { handleError } from './error';

const dummySpaceImage =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-dummy-space.png?alt=dummy&auto=format&auto=compress';

// Actions
const CLEAR_SPACE = 'CLEAR_SPACE';
const FETCH_SPACE = 'FETCH_SPACE';
const FETCH_SUCCESS_SPACE = 'FETCH_SUCCESS_SPACE';
const FETCH_FAILED_SPACE = 'FETCH_FAILED_SPACE';
const CREATE_SPACE = 'CREATE_SPACE';
const CREATE_SUCCESS_SPACE = 'CREATE_SUCCESS_SPACE';
const CREATE_FAILED_SPACE = 'CREATE_FAILED_SPACE';
const UPDATE_SPACE = 'UPDATE_SPACE';
const UPDATE_SUCCESS_SPACE = 'UPDATE_SUCCESS_SPACE';
const UPDATE_FAILED_SPACE = 'UPDATE_FAILED_SPACE';
const SET_SPACE = 'SET_SPACE';
const DELETE_SPACE = 'DELETE_SPACE';
const DELETE_FAILED_SPACE = 'DELETE_FAILED_SPACE';
const PREPARE_UPDATE_SPACE = 'PREPARE_UPDATE_SPACE';
const GET_SPACE_ACCESS_LOG = 'GET_SPACE_ACCESS_LOG';
const GET_SUCCESS_SPACE_ACCESS_LOG = 'GET_SUCCESS_SPACE_ACCESS_LOG';
const GET_FAILED_SPACE_ACCESS_LOG = 'GET_FAILED_SPACE_ACCESS_LOG';
const ADD_SPACE_ACCESS_LOG = 'ADD_SPACE_ACCESS_LOG';
const DO_SEARCH = 'DO_SEARCH';
const DO_SEARCH_MY_AREA = 'DO_SEARCH_MY_AREA';
const SUCCESS_SEARCH = 'SUCCESS_SEARCH';
const FAILED_SEARCH = 'FAILED_SEARCH';
const GET_GEOCODE = 'GET_GEOCODE';
const GET_FAILED_GEOCODE = 'GET_FAILED_GEOCODE';
const GET_SUCCESS_GEOCODE = 'GET_SUCCESS_GEOCODE';
const RESET_SEARCH = 'RESET_SEARCH';
const GET_RECOMMEND_SPACES = 'GET_RECOMMEND_SPACES';
const GET_RECOMMEND_SPACES_SUCCESS = 'GET_RECOMMEND_SPACES_SUCCESS';
const GET_RECOMMEND_SPACES_FAILED = 'GET_RECOMMEND_SPACES_FAILED';
const GET_ADDRESS_INIT = 'GET_ADDRESS_INIT';
const GET_ADDRESS = 'GET_ADDRESS';
const GET_ADDRESS_SUCCESS = 'GET_ADDRESS_SUCCESS';
const GET_ADDRESS_FAILED = 'GET_ADDRESS_FAILED';
const GET_CITIES = 'GET_CITIES';
const GET_CITIES_SUCCESS = 'GET_CITIES_SUCCESS';
const GET_CITIES_FAILED = 'GET_CITIES_FAILED';
const RESET_ADDRESS = 'RESET_ADDRESS';
const FETCH_USER_META = 'FETCH_USER_META';
const FETCH_USER_META_SUCCESS = 'FETCH_USER_META_SUCCESS';
const FETCH_USER_META_FAIL = 'FETCH_USER_META_FAIL';

export const spaceActions = createActions(
  CLEAR_SPACE,
  FETCH_SPACE,
  FETCH_SUCCESS_SPACE,
  FETCH_FAILED_SPACE,
  CREATE_SPACE,
  CREATE_SUCCESS_SPACE,
  CREATE_FAILED_SPACE,
  UPDATE_SPACE,
  UPDATE_SUCCESS_SPACE,
  UPDATE_FAILED_SPACE,
  SET_SPACE,
  DELETE_SPACE,
  DELETE_FAILED_SPACE,
  PREPARE_UPDATE_SPACE,
  GET_SPACE_ACCESS_LOG,
  GET_SUCCESS_SPACE_ACCESS_LOG,
  GET_FAILED_SPACE_ACCESS_LOG,
  ADD_SPACE_ACCESS_LOG,
  DO_SEARCH,
  DO_SEARCH_MY_AREA,
  SUCCESS_SEARCH,
  FAILED_SEARCH,
  RESET_SEARCH,
  GET_GEOCODE,
  GET_FAILED_GEOCODE,
  GET_SUCCESS_GEOCODE,
  GET_RECOMMEND_SPACES,
  GET_RECOMMEND_SPACES_SUCCESS,
  GET_RECOMMEND_SPACES_FAILED,
  GET_ADDRESS_INIT,
  GET_ADDRESS,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILED,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILED,
  RESET_ADDRESS,
  FETCH_USER_META,
  FETCH_USER_META_SUCCESS,
  FETCH_USER_META_FAIL,
);

// Reducer
const initialState = {
  isComplete: false,
  isLoading: false,
  isUserMetaFetching: false,
  space: null,
  spaces: null,
  isMore: true,
  search: {
    area: [],
    isLoading: false,
    results: [],
    maxCount: 0,
    isMore: true,
    breadcrumbs: [],
    conditions: {
      keyword: '',
      pref: '',
      cities: [],
      towns: [],
      sort: 1,
    },
    cities: [],
  },
  recommendSpaces: [],
  geo: {},
};

export const spaceReducer = handleActions(
  {
    [CLEAR_SPACE]: state => ({
      ...state,
      space: null,
      isComplete: false,
    }),
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
      isLoading: true,
      isComplete: false,
    }),
    [CREATE_SUCCESS_SPACE]: (state, action) => ({
      ...state,
      created: action.payload,
      isLoading: false,
      isComplete: true,
    }),
    [CREATE_FAILED_SPACE]: state => ({
      ...state,
      created: null,
      isLoading: false,
      isComplete: false,
    }),
    [UPDATE_SPACE]: state => ({
      ...state,
      isLoading: true,
      isComplete: false,
    }),
    [UPDATE_SUCCESS_SPACE]: state => ({
      ...state,
      isLoading: false,
      isComplete: true,
    }),
    [UPDATE_FAILED_SPACE]: state => ({
      ...state,
      isLoading: false,
      isComplete: false,
    }),
    [DELETE_FAILED_SPACE]: state => ({
      ...state,
      isLoading: false,
      isComplete: false,
    }),
    [SET_SPACE]: (state, action) => ({
      ...state,
      space: action.payload.space,
    }),
    [PREPARE_UPDATE_SPACE]: state => ({
      ...state,
      isComplete: false,
    }),
    [GET_SPACE_ACCESS_LOG]: state => ({
      ...state,
      isLoading: true,
    }),
    [GET_SUCCESS_SPACE_ACCESS_LOG]: (state, action) => ({
      ...state,
      spaces: [...state.spaces, ...action.payload],
      isLoading: false,
      isMore: action.payload.isMore,
    }),
    [GET_FAILED_SPACE_ACCESS_LOG]: state => ({
      ...state,
      isLoading: false,
    }),
    [DO_SEARCH]: state => ({
      ...state,
      search: {
        ...state.search,
        isLoading: true,
      },
    }),
    [DO_SEARCH_MY_AREA]: state => ({
      ...state,
      search: {
        ...state.search,
        isLoading: true,
      },
    }),
    [SUCCESS_SEARCH]: (state, { payload }) => ({
      ...state,
      search: {
        ...state.search,
        isLoading: false,
        results: [...state.search.results, ...payload.spaces],
        isMore: payload.isMore,
        maxCount: payload.maxCount,
        area: payload.area,
        conditions: payload.conditions,
        breadcrumbs: payload.breadcrumbs,
        cities: payload.cities,
        sort: payload.sort,
      },
    }),
    [FAILED_SEARCH]: state => ({
      ...state,
      search: {
        ...state.search,
        isLoading: false,
      },
    }),
    [RESET_SEARCH]: state => ({
      ...state,
      spaces: [],
      search: {
        ...state.search,
        results: [],
        isMore: true,
        maxCount: 0,
        cities: [],
      },
    }),
    [GET_GEOCODE]: state => ({
      ...state,
      isLoading: true,
    }),
    [GET_SUCCESS_GEOCODE]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      geocode: payload.geocode,
    }),
    [GET_FAILED_GEOCODE]: state => ({
      ...state,
      isLoading: false,
    }),
    [GET_RECOMMEND_SPACES_SUCCESS]: (state, { payload }) => ({
      ...state,
      recommendSpaces: payload,
    }),
    [GET_ADDRESS_INIT]: state => ({
      ...state,
      isLoadingAddress: false,
      errMessage: '',
    }),
    [GET_ADDRESS]: state => ({
      ...state,
      isLoadingAddress: true,
      errMessage: '',
    }),
    [GET_ADDRESS_SUCCESS]: (state, { payload: { pref, city, town, postalCode } }) => ({
      ...state,
      geo: { pref, city, town, postalCode },
      isLoadingAddress: false,
      errMessage: '',
    }),
    [GET_ADDRESS_FAILED]: (state, action) => ({
      ...state,
      isLoadingAddress: false,
      errMessage: action.payload,
    }),
    [GET_CITIES]: state => ({
      ...state,
      isLoading: true,
    }),
    [GET_CITIES_SUCCESS]: (state, { payload: { cities } }) => ({
      ...state,
      cities,
      isLoading: false,
    }),
    [GET_CITIES_FAILED]: state => ({
      ...state,
      isLoading: false,
    }),
    [RESET_ADDRESS]: (state, _) => ({
      ...state,
      geo: {},
      isLoadingAddress: false,
      errMessage: '',
    }),
    [FETCH_USER_META_SUCCESS]: (state, action) => ({
      ...state,
      space: {
        ...state.space,
        userMeta: action.payload,
      },
    }),
  },
  initialState,
);

// Sagas
function* getSpace({ payload: { spaceId, isSelfOnly } }) {
  const token = yield* getToken();
  const { data: payload, status, err } = yield call(
    getApiRequest,
    apiEndpoint.spaces(spaceId),
    {},
    token,
  );

  if (err) {
    if (status === 404) {
      // yield put(push(Path.pageNotFound()));
      window.location.href = Path.pageNotFound();
      // node.jsサーバー側で404返すための処置
    } else {
      yield handleError(spaceActions.fetchFailedSpace, '', 'getSpace', err, false);
    }
    return;
  }

  if (isSelfOnly) {
    // 不正対策
    const user = yield select(state => state.auth.user);
    if (payload.userId !== user.id) {
      yield handleError(
        '',
        '',
        'getSpace(Bad Request)',
        `spaceUserID(${payload.userId})/loginUserID(${user.id})`,
        false,
      );
    }
  }

  if (!payload.images || payload.images.length === 0) {
    if (!payload.images) {
      payload.images = [];
    }
    payload.images[0] = { imageUrl: dummySpaceImage };
  }

  yield put(spaceActions.fetchUserMeta({ userId: payload.userId }));
  yield take(spaceActions.fetchUserMetaSuccess);

  yield put(spaceActions.fetchSuccessSpace(payload));
}

const GEOCODE_API_KEY = 'AIzaSyAF1kxs-DsZJHW3tX3eNi88tKixy-zbGtk';

function* getGeocode({ payload: { address } }) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${GEOCODE_API_KEY}&address=${address}`;

  try {
    const { data: places, err } = yield call(
      () =>
        new Promise((resolve, reject) => {
          axios
            .get(url)
            .then(result => resolve(result))
            .catch(error => reject(error));
        }),
    );

    if (err) {
      yield handleError(spaceActions.getFailedGeocode, '', 'getGeocode', err, false);
      return;
    }

    if (places.results.length > 0) {
      yield put(
        spaceActions.getSuccessGeocode({
          geocode: places.results[0].geometry.location,
        }),
      );
    } else {
      yield handleError(
        spaceActions.getFailedGeocode,
        '',
        'getGeocode',
        'places.results is 0',
        false,
      );
    }
  } catch (err) {
    yield handleError(spaceActions.getFailedGeocode, '', 'getGeocode(exception)', err, false);
  }
}

function generateSpaceRequestParams(space) {
  const params = {};

  Object.keys(space).forEach(key => {
    const requestKey = `${key[0].toLowerCase()}${key.substr(1)}`;
    params[requestKey] = space[key];
  });

  if (params.priceFull) {
    params.priceFull = parseInt(params.priceFull, 10);
  }

  if (params.priceTatami) {
    params.priceTatami = parseInt(params.priceTatami, 10);
  }

  return params;
}

const createImageUrls = (spaceId, images) =>
  Promise.all(
    images.map(async image => {
      if (image.imageUrl) {
        if (image.imageUrl.includes('data:image/png;base64,')) {
          return '';
        }
        return convertBaseUrl(image.imageUrl);
      }
      if (image.tmpUrl) {
        return convertBaseUrl(image.tmpUrl);
      }
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
  ).catch(error => ({ error }));

function* createSpace({ payload: { body } }) {
  const params = generateSpaceRequestParams(body);
  const { images } = params;
  params.images = null;

  if (params.prefecture) {
    params.address = `${params.prefecture}${params.address}`;
  }

  const token = yield* getToken();
  const { data, err } = yield call(postApiRequest, apiEndpoint.spaces(), params, token);

  if (err) {
    yield handleError(spaceActions.createFailedSpace, '', 'createSpace', err, false);
    return;
  }

  if (images && images.length > 0) {
    const spaceId = data.id;
    const imageUrls = yield createImageUrls(spaceId, images);

    if (imageUrls.error) {
      yield handleError(
        spaceActions.createFailedSpace,
        '',
        'createSpace(imageUrls)',
        imageUrls.error,
        false,
      );
      return;
    }

    const imgs = imageUrls
      .filter(url => url !== '')
      .map(url => ({ SpaceID: spaceId, ImageUrl: url }));

    if (imgs.length > 0) {
      const { err: err2 } = yield call(
        putApiRequest,
        apiEndpoint.spaces(spaceId),
        {
          Images: imgs,
        },
        token,
      );

      if (err2) {
        yield handleError(spaceActions.fetchFailedSpace, '', 'createSpace(err2)', err2, false);
        return;
      }
    }
  }

  yield put(spaceActions.createSuccessSpace(data));
}

function* prepareUpdateSpace({ payload: spaceId }) {
  if (Object.keys(yield select(state => state.auth.user)).length === 0) {
    return;
  }

  const spaceCache = yield select(state => state.ui.space);
  if (spaceCache.id === spaceId) {
    return;
  }

  const token = yield* getToken();
  const { data: space, status, err } = yield call(
    getApiRequest,
    apiEndpoint.spaces(spaceId),
    {},
    token,
  );

  if (err) {
    if (status === 404) {
      yield put(push(Path.pageNotFound()));
    } else {
      yield handleError(spaceActions.fetchFailedSpace, '', 'prepareUpdateSpace', err, false);
    }
    return;
  }

  if (space === undefined) {
    yield handleError(
      spaceActions.fetchFailedSpace,
      '',
      'prepareUpdateSpace(space data undefined)',
      `spaceId:${spaceId}`,
      false,
    );
    return;
  }

  const user = yield select(state => state.auth.user);
  if (space.userId !== user.id) {
    yield handleError(
      '',
      '',
      'prepareUpdateSpace(Bad Request)',
      `spaceUserID(${space.userId})/loginUserID(${user.id})`,
      false,
    );
    return;
  }

  space.images = space.images.map(image => ({
    ...image,
    imageUrl: convertSpaceImgUrl(image.imageUrl, 'w=1200&h=800&fit=crop&auto=compress'),
  }));

  space.priceFull = formatAddComma(space.priceFull);
  space.priceHalf = formatAddComma(space.priceHalf);
  space.priceQuarter = formatAddComma(space.priceQuarter);

  yield put(uiActions.setUiState({ space }));
}

function* updateSpace({ payload: { spaceId, body } }) {
  const params = generateSpaceRequestParams(body);
  const { images } = params;
  params.images = null;

  delete params.id;

  if (images && images.length > 0) {
    const imageUrls = yield createImageUrls(spaceId, images);
    if (imageUrls.error) {
      yield handleError(
        spaceActions.updateFailedSpace,
        '',
        'updateSpace(imageUrls)',
        imageUrls.error,
        false,
      );
      return;
    }
    params.images = imageUrls
      .filter(url => url !== '')
      .map(url => ({ SpaceID: spaceId, ImageUrl: url }));
  }

  const token = yield* getToken();
  const { data, status, err } = yield call(
    putApiRequest,
    apiEndpoint.spaces(spaceId),
    {
      title: params.title,
      introduction: params.introduction,
      receiptType: params.receiptType,
      sizeType: params.sizeType,
      tatami: params.tatami,
      priceFull: params.priceFull,
      priceTatami: params.priceTatami,
      address: params.address,
      addressPref: params.addressPref,
      addressCity: params.addressCity,
      addressTown: params.addressTown,
      postalCode: params.postalCode,
      images: params.images,
      tags: params.tags,
      status: params.status,
    },
    token,
  );

  if (err) {
    if (status === 404) {
      yield handleError(
        spaceActions.updateFailedSpace,
        '',
        'updateSpace(404)',
        `spaceId:${spaceId}`,
        false,
      );
    } else {
      yield handleError(spaceActions.updateFailedSpace, '', 'updateSpace', err, false);
    }
    return;
  }

  yield put(spaceActions.updateSuccessSpace(data));
}

function* deleteSpace({ payload: { space } }) {
  const user = yield select(state => state.auth.user);
  if (space.userId !== user.id) {
    yield handleError(
      '',
      '',
      'deleteSpace(Bad Request)',
      `spaceUserID(${space.userId})/loginUserID(${user.id})`,
      false,
    );
    return;
  }
  const token = yield* getToken();
  const { err } = yield call(deleteApiRequest, apiEndpoint.spaces(space.id), token);
  if (err) {
    let errMessage = '';
    if (err === '進行中の取引があります') {
      errMessage = '進行中の取引があるスペースは削除できません';
    }
    yield handleError(spaceActions.deleteFailedSpace, errMessage, 'deleteSpace', err, false);
    return;
  }

  window.location.href = Path.spaces();
}

function* getSpaceAccessLog({ payload: { limit, offset } }) {
  const params = {
    limit,
    offset,
  };

  yield put(authActions.checkLogin());
  yield take(authActions.checkLoginFinished);

  const user = yield select(state => state.auth.user);
  if (!user.id) {
    // 未ログイン時の閲覧履歴

    let anonymousAccessLogSpaces = [];
    if (isAvailableLocalStorage) {
      const key = 'anonymous-access-logs';
      const json = localStorage.getItem(key);
      const anonymousAccessLogSpaceIds = json ? JSON.parse(json) : [];

      const results = yield all(
        anonymousAccessLogSpaceIds.map(id => call(getApiRequest, apiEndpoint.spaces(id), token)),
      );
      results.reverse().forEach(({ data, err }) => {
        if (!err) {
          anonymousAccessLogSpaces = [...anonymousAccessLogSpaces, data];
        }
      });
    }

    anonymousAccessLogSpaces.isMore = anonymousAccessLogSpaces.length === limit;
    yield put(spaceActions.getSuccessSpaceAccessLog(anonymousAccessLogSpaces));

    return;
  }

  const token = yield* getToken();
  const { data: payload, err } = yield call(
    getApiRequest,
    apiEndpoint.getUserSpaceAccessLog(user.id),
    params,
    token,
  );

  if (err) {
    yield handleError(spaceActions.getSpaceAccessLogFailed, '', 'getSpaceAccessLog', err, false);
    return;
  }

  payload.isMore = payload.length === limit;

  yield put(spaceActions.getSuccessSpaceAccessLog(payload));
}

function* addSpaceAccessLog({ payload: { spaceId } }) {
  yield put(authActions.checkLogin());
  yield take(authActions.checkLoginFinished);
  const user = yield select(state => state.auth.user);

  if (!user.id) {
    if (isAvailableLocalStorage) {
      const key = 'anonymous-access-logs';
      const json = localStorage.getItem(key);
      const arr = json ? JSON.parse(json) : [];
      const anonymousAccessLogQueue = new Queue(arr);
      anonymousAccessLogQueue.uniqEnqueue(parseInt(spaceId, 10));
      localStorage.setItem(key, JSON.stringify(anonymousAccessLogQueue.items));
    }

    return;
  }
  const token = yield* getToken();
  const { err } = yield call(
    postApiRequest,
    apiEndpoint.addUserSpaceAccessLog(user.id, spaceId),
    {},
    token,
  );
  if (err) {
    yield handleError('', '', 'addSpaceAccessLog', err, false);
  }
}

function* search({ payload: { limit, offset, keyword, prefCode, cities, towns, tags, sort } }) {
  const token = yield* getToken();

  const params = {
    limit,
    offset,
  };

  if (keyword) {
    params.keyword = keyword;
  }
  if (prefCode) {
    params.pref = prefCode;
  }

  if (cities && cities.length > 0) {
    params.cities = cities.join(',');
  }

  if (towns && towns.length > 0) {
    params.towns = towns.join(',');
  }

  if (tags && tags.length > 0) {
    params.tags = tags.join(',');
  }

  if (sort) {
    params.sort = sort;
  }

  const { data, err, headers } = yield call(getApiRequest, apiEndpoint.spaces(), params, token);

  if (err) {
    yield handleError(spaceActions.failedSearch, '', 'search', err, false);
    return;
  }

  const res = data.results.map(v => {
    let images = [];
    if (v.images.length === 0) {
      images = [{ imageUrl: dummySpaceImage }];
    } else {
      images = v.images.map(image => ({
        ...image,
        imageUrl: convertSpaceImgUrl(image.imageUrl, 'w=360'),
      }));
    }
    return { ...v, images };
  });

  let areaRes = [];
  let areaSearchRes = [];

  if (prefCode) {
    // TODO エラーハンドリング
    // 人気エリア取得
    let areaEndpoint = apiEndpoint.areaCities(prefCode);
    if (cities.length === 1) {
      areaEndpoint = apiEndpoint.areaTowns(cities[0]);
      const { data: area } = yield call(getApiRequest, areaEndpoint, {}, token);
      areaRes = area
        .map(v => {
          return {
            ...v,
            text: v.name,
            link: Path.spacesByTown(prefCode, cities[0], v.code),
          };
        })
        .filter(v => !towns.includes(v.code));
    } else {
      const { data: area } = yield call(getApiRequest, areaEndpoint, {}, token);
      areaRes = area.map(v => {
        return {
          ...v,
          text: v.name,
          link: Path.spacesByCity(prefCode, v.code),
        };
      });
    }

    // 絞り込み用市区町村・町域取得
    const { data: areaSearch } = yield call(
      getApiRequest,
      apiEndpoint.areaSearch(prefCode),
      {},
      token,
    );
    // TODO エラーハンドリング
    areaSearchRes = areaSearch;
  }

  const breadcrumbs = makeBreadcrumbs(data.conditions);

  const isMore = res.length === limit;
  yield put(
    spaceActions.successSearch({
      spaces: res,
      isMore,
      maxCount: parseInt(headers['content-range'], 10),
      area: areaRes,
      conditions: data.conditions,
      breadcrumbs,
      cities: areaSearchRes,
      sort: sort || 1,
    }),
  );
}

function* searchMyArea() {
  /**
   * 自分の住所都道府県を元にサジェストするため、ログインユーザー情報を取得する
   */

  let user = yield select(state => state.auth.user);

  if (!user.prefCode) {
    yield take(authActions.checkLoginSuccess);
  }

  user = yield select(state => state.auth.user);

  /**
   * ログイン情報が取得できない場合、APIを叩かない
   */

  if (!user.prefCode) {
    yield put(spaceActions.failedSearch());
    return;
  }

  const token = yield* getToken();

  const params = {
    limit: 12,
    offset: 0,
    pref: user.prefCode,
  };

  const { data, err, headers } = yield call(getApiRequest, apiEndpoint.spaces(), params, token);

  if (err) {
    yield handleError(spaceActions.failedSearch, '', 'search', err, false);
    return;
  }

  const res = data.results.map(v => {
    let images = [];
    if (v.images.length === 0) {
      images = [{ imageUrl: dummySpaceImage }];
    } else {
      images = v.images.map(image => ({
        ...image,
        imageUrl: convertSpaceImgUrl(image.imageUrl, 'w=360'),
      }));
    }
    return { ...v, images };
  });

  let areaRes = [];
  let areaSearchRes = [];

  const breadcrumbs = makeBreadcrumbs(data.conditions);

  const isMore = res.length === 12;

  yield put(
    spaceActions.successSearch({
      spaces: res,
      isMore,
      maxCount: parseInt(headers['content-range'], 10),
      area: areaRes,
      conditions: data.conditions,
      breadcrumbs,
      cities: areaSearchRes,
      sort: 1,
    }),
  );
}

const makeBreadcrumbs = ({ keyword, pref, cities, towns }) => {
  const breadcrumbs = [{ text: 'トップ', link: Path.top() }];

  if (towns && towns.length === 1) {
    breadcrumbs.push(
      {
        text: pref.name,
        link: Path.spacesByPrefecture(pref.code),
      },
      {
        text: cities[0].name,
        link: Path.spacesByCity(pref.code, cities[0].code),
      },
      {
        text: `${towns[0].name}のスペース一覧`,
      },
    );
  } else if (cities && cities.length === 1) {
    breadcrumbs.push(
      {
        text: pref.name,
        link: Path.spacesByPrefecture(pref.code),
      },
      {
        text: `${cities[0].name}のスペース一覧`,
      },
    );
  } else if (pref && pref.name) {
    breadcrumbs.push({
      text: `${pref.name}のスペース一覧`,
    });
  } else if (keyword && keyword !== '') {
    breadcrumbs.push({
      text: `スペース検索結果`,
    });
  }

  if (breadcrumbs.length === 1) {
    breadcrumbs.push({
      text: `スペース検索結果`,
    });
  }

  return breadcrumbs;
};

function* getRecommendSpaces({ payload: { spaceId } }) {
  const token = yield* getToken();
  const { data } = yield call(getApiRequest, apiEndpoint.spacesRecommend(spaceId), {}, token);

  if (!data) {
    return;
  }

  const res = data.map(v => {
    const space = v;
    if (space.images.length === 0) {
      space.images = [{ imageUrl: dummySpaceImage }];
    } else {
      space.images = space.images.map(image => ({
        ...image,
        imageUrl: convertSpaceImgUrl(image.imageUrl, 'w=600'),
      }));
    }
    return space;
  });

  yield put(spaceActions.getRecommendSpacesSuccess(res));
}

const addAddress = (fromData, toData, type) => {
  let returnData = toData;
  if (fromData.filter(v => v.types.includes(type)).length === 1) {
    returnData += fromData.filter(v => v.types.includes(type))[0].long_name;
  }
  return returnData;
};

function* getAddressByPostalCode({ payload: { postalCode } }) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${GEOCODE_API_KEY}&address=${postalCode}&language=ja`;

  try {
    const { data: places, err } = yield call(
      () =>
        new Promise((resolve, reject) => {
          axios
            .get(url)
            .then(result => resolve(result))
            .catch(error => reject(error));
        }),
    );

    if (err) {
      yield handleError(spaceActions.getAddressFailed, '', 'getAddress', err, true);
      return;
    }

    if (places && places.results.length > 0) {
      const addressComponents = places.results[0].address_components;
      let pref = '';
      let city = '';
      let town = '';
      pref = addAddress(addressComponents, pref, 'administrative_area_level_1');
      city = addAddress(addressComponents, city, 'administrative_area_level_2');
      city = addAddress(addressComponents, city, 'administrative_area_level_3');
      city = addAddress(addressComponents, city, 'administrative_area_level_4');
      city = addAddress(addressComponents, city, 'administrative_area_level_5');
      city = addAddress(addressComponents, city, 'locality');
      city = addAddress(addressComponents, city, 'sublocality_level_1');
      town = addAddress(addressComponents, town, 'sublocality_level_2');
      yield put(spaceActions.getAddressSuccess({ pref, city, town, postalCode }));
    } else {
      yield handleError(
        spaceActions.getAddressFailed,
        ErrorMessages.FailedGetAddress,
        'getAddress',
        ErrorMessages.FailedGetAddress,
        true,
      );
    }
  } catch (err) {
    yield handleError(spaceActions.getAddressFailed, '', 'getAddress(exception)', err, true);
  }
}

function* fetchUserMeta({ payload: { userId } }) {
  const token = yield* getToken();
  const { data: payload, err } = yield call(getApiRequest, apiEndpoint.userMeta(userId), {}, token);

  if (err) {
    yield handleError(spaceActions.fetchUserMetaFail, '', 'fetchUserMeta', err, true);
    return;
  }

  yield put(spaceActions.fetchUserMetaSuccess(payload));
}

function* getCities({ payload: { prefCode } }) {
  let cities = [];

  if (prefCode) {
    const token = yield* getToken();
    const areaEndpoint = apiEndpoint.areaCitiesGeneral(prefCode);
    const { data: citiesData, err } = yield call(getApiRequest, areaEndpoint, {}, token);

    if (err) {
      yield handleError(spaceActions.getCitiesFailed, '', 'getCities', err, true);
      return;
    }

    cities = citiesData;
  }

  yield put(spaceActions.getCitiesSuccess({ cities }));
}

export const spaceSagas = [
  takeEvery(FETCH_SPACE, getSpace),
  takeEvery(CREATE_SPACE, createSpace),
  takeEvery(UPDATE_SPACE, updateSpace),
  takeEvery(PREPARE_UPDATE_SPACE, prepareUpdateSpace),
  takeEvery(DELETE_SPACE, deleteSpace),
  takeEvery(GET_SPACE_ACCESS_LOG, getSpaceAccessLog),
  takeEvery(ADD_SPACE_ACCESS_LOG, addSpaceAccessLog),
  takeEvery(DO_SEARCH, search),
  takeEvery(DO_SEARCH_MY_AREA, searchMyArea),
  takeEvery(GET_GEOCODE, getGeocode),
  takeEvery(GET_RECOMMEND_SPACES, getRecommendSpaces),
  takeEvery(GET_ADDRESS, getAddressByPostalCode),
  takeEvery(GET_CITIES, getCities),
  takeEvery(FETCH_USER_META, fetchUserMeta),
];
