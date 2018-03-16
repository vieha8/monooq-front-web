import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take } from 'redux-saga/effects';
import { apiActions } from './api';
import { store } from '../store/configureStore';
import { push } from 'react-router-redux';

// Actions
const ESTIMATE = 'ESTIMATE';
const ESTIMATE_SUCCESS = 'ESTIMATE_SUCCESS';
const ESTIMATE_FAILED = 'ESTIMATE_FAILED';

export const requestActions = createActions(ESTIMATE, ESTIMATE_SUCCESS, ESTIMATE_FAILED);

// Reducer
const initialState = {};

export const requestReducer = handleActions({}, initialState);

//Sagas
function* estimate({ payload }) {
  console.log('doEstimate');
}

export const requestSagas = [takeEvery(ESTIMATE, estimate)];
