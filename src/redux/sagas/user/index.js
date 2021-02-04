import { takeEvery } from 'redux-saga/effects';
import { userActions } from 'redux/modules/user';

const userSagas = [
  takeEvery(userActions.fetchUser, async function* fetchUserWrap(...args) {
    const fetchUser = await import('./generators/getUser');
    yield fetchUser.default(...args);
  }),
  takeEvery(userActions.updateUser, async function* updateUserWrap(...args) {
    const updateUser = await import('./generators/updateUser');
    yield updateUser.default(...args);
  }),
  takeEvery(userActions.fetchUserSpaces, async function* getSpacesWrap(...args) {
    const getSpaces = await import('./generators/getSpaces');
    yield getSpaces.default(...args);
  }),
];

export default userSagas;
