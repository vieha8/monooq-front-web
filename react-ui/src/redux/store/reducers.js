import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { authReducer } from 'redux/modules/auth';
import { messagesReducer } from 'redux/modules/messages';
import { uiReducer } from 'redux/modules/ui';
import { spaceReducer } from 'redux/modules/space';
import { userReducer } from 'redux/modules/user';
import { requestReducer } from 'redux/modules/request';
import { salesReducer } from 'redux/modules/sales';
import { errorReducer } from 'redux/modules/error';
import { initReducer } from 'redux/modules/init';
import { sectionReducer } from 'redux/modules/section';

const createReducers = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    messages: messagesReducer,
    space: spaceReducer,
    user: userReducer,
    ui: uiReducer,
    request: requestReducer,
    sales: salesReducer,
    error: errorReducer,
    init: initReducer,
    section: sectionReducer,
  });

export default createReducers;
