import { put, call, takeEvery } from 'redux-saga/effects';

import { UserService } from '../../services/user.service';
import { userActions } from '../reducers/user.slice';

// TODO: replace any type
export function* getUserWorker(): any {
  console.log('user fetch worker!');
  try {
    const user = yield call(() => UserService.Instance.getSelf());
    yield put(userActions.setLoggedUser(user));
  } catch (error) {
    yield put(userActions.setLoggedUserError());
  }
}

export function* userWatcher() {
  yield takeEvery(userActions.fetchLoggedUser, getUserWorker);
}
