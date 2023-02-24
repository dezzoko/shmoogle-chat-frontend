import createSagaMiddleware from '@redux-saga/core';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import sidebarReducer from './reducers/sidebar.slice';
import userReducer from './reducers/user.slice';
import themeReducer from './reducers/theme.slice';
import searchInputReducer from './reducers/search-input.slice';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: combineReducers({
    sidebarReducer,
    userReducer,
    themeReducer,
    searchInputReducer,
  }),
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
