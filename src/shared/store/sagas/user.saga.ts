import { put, call, takeEvery } from 'redux-saga/effects';
import { backendUserToEntityFactory } from 'shared/utils/factories';

import { UserService } from '../../services/user.service';
import { userActions } from '../reducers/user.slice';

// TODO: replace any type
export function* getUserWorker(): any {
  console.log('user fetch worker!');
  try {
    const user = yield call(() => UserService.Instance.getSelf());
    const entityUser = backendUserToEntityFactory(user);
    yield put(userActions.setLoggedUser(entityUser));
  } catch (error) {
    yield put(userActions.setLoggedUserError());
  }
}

export function* userWatcher() {
  yield takeEvery(userActions.fetchLoggedUser, getUserWorker);
}
