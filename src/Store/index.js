import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import rootSaga from '../Saga';
import chatReducer from '../Redux/Reducer/chat.Reducer';
import callReducer from '../Redux/Reducer/call.Reducer';
import authReducer from '../Redux/Reducer/auth.Reducer';
import {LOGOUT_SUCCESS_ACTION} from '../Redux/Action/type';
import {reducer as CommonReducer} from './Common/Reducers';
import loaderReducer from '../Redux/Reducer/loader.Reducer';
import streamingReducer from '../Redux/Reducer/streaming.Reducer';
import ProfileReducer from '../Reducer/Profile/profile.reducer';
import GameReducer from '../Reducer/Game/game.reducer';
import ChatPriceReducer from '../Reducer/ChatPrice/chatPrice.reducer';
import AppReducer from '../Reducer/appReucer/app.reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const appReducer = combineReducers({
  chatReducer,
  callReducer,
  authReducer,
  loaderReducer,
  streamingReducer,
  common: CommonReducer,
  profile: ProfileReducer,
  game: GameReducer,
  chatPrice: ChatPriceReducer,
  app: AppReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS_ACTION) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
sagaMiddleware.run(rootSaga);
