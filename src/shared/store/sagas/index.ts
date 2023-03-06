import { all } from 'redux-saga/effects';

import { userWatcher } from './user.saga';

export default function* rootSaga() {
  yield all([userWatcher()]);
}
