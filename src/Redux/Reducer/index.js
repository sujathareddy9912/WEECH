import {LOGOUT_SUCCESS_ACTION} from '../Action/type';
import authReducer from './auth.Reducer';
import loaderReducer from './loader.Reducer';

const appReducer = combineReducers({
  authReducer,
  loaderReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS_ACTION) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
